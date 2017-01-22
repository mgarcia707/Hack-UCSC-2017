/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/


'use strict';	
var textHelper = (function () {
    var outfitNameBlacklist = {
        outfit: 1,
        outfits: 1
    };
	
	var topNameBlacklist = {
        atop: 1,
        tops: 1
    };
	
	var bottomNameBlacklist = {
        bottom: 1,
        bottoms: 1
    };
	
	var jacketNameBlacklist = {
        jacket: 1,
        jackets: 1
    };

    return {
        completeHelp: 'Here\'s some things you can say,'
        + ' add a top, bottom, and/or jacket.'
        + ' remove a top, bottom, and/or jacket.'
        + ' select a top, bottom, and/or jacket.'
        + ' ask "what am I wearing?"'
		+ ' or close closet',
        nextHelp: 'You can add a new piece of clothing, remove a piece of clothing, select a piece of clothing, or say help. What would you like?',
	
		getOutfitName: function (recognizedOutfitName) {
            if (!recognizedOutfitName) {
                return undefined;
            }
            var newName = recognizedOutfitName;

            if (outfitNameBlacklist[newName]) {
                //if the name is on our blacklist, it must be mis-recognition
                return undefined;
            }
            return newName;
        },
		
		getTopName: function (recognizedTopName) {
            if (!recognizedTopName) {
                return undefined;
            }
            var newName = recognizedTopName;

            if (topNameBlacklist[newName]) {
                //if the name is on our blacklist, it must be mis-recognition
                return undefined;
            }
            return newName;
        },
		
		getBottomName: function (recognizedBottomName) {
            if (!recognizedBottomName) {
                return undefined;
            }
            var newName = recognizedBottomName;

            if (bottomNameBlacklist[newName]) {
                //if the name is on our blacklist, it must be mis-recognition
                return undefined;
            }
            return newName;
        },
		
		getJacketName: function (recognizedJacketName) {
            if (!recognizedJacketName) {
                return undefined;
            }
            var newName = recognizedJacketName;

            if (jacketNameBlacklist[newName]) {
                //if the name is on our blacklist, it must be mis-recognition
                return undefined;
            }
            return newName;
        }
	};
})();
module.exports = textHelper;