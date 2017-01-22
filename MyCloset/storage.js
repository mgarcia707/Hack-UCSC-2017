/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

'use strict';
var AWS = require("aws-sdk");

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    /*
     * The Closet class stores all closet states for the user
     */
    function Closet(session, data) {
        if (data) {
            this.data = data;
        } else {
            this.data = {
                outfits: {}
            };
        }
        this._session = session;
    }

    Closet.prototype = {
        save: function (callback) {
            //save the closet states in the session,
            //so next time we can save a read from dynamoDB
            this._session.attributes.currentCloset = this.data;
            dynamodb.putItem({
                TableName: 'VirtualClosetData',
                Item: {
                    CustomerId: {
                        S: this._session.user.userId
                    },
                    Data: {
                        S: JSON.stringify(this.data)
                    }
                }
            }, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                if (callback) {
                    callback();
                }
            });
        }
    };

    return {
        loadCloset: function (session, callback) {
            if (session.attributes.currentCloset) {
                console.log('get closet from session=' + session.attributes.currentCloset);
                callback(new Closet(session, session.attributes.currentCloset));
                return;
            }
            dynamodb.getItem({
                TableName: 'VirtualClosetData',
                Key: {
                    CustomerId: {
                        S: session.user.userId
                    }
                }
            }, function (err, data) {
                var currentCloset;
                if (err) {
                    console.log(err, err.stack);
                    currentCloset = new Closet(session);
                    session.attributes.currentCloset = currentCloset.data;
                    callback(currentCloset);
                } else if (data.Item === undefined) {
                    currentCloset = new Closet(session);
                    session.attributes.currentCloset = currentCloset.data;
                    callback(currentCloset);
                } else {
                    console.log('get closet from dynamodb=' + data.Item.Data.S);
                    currentCloset = new Closet(session, JSON.parse(data.Item.Data.S));
                    session.attributes.currentCloset = currentCloset.data;
                    callback(currentCloset);
                }
            });
        },
        newCloset: function (session) {
            return new Closet(session);
        }
    };
})();
module.exports = storage;