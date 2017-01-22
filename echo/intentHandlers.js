/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

'use strict';
var http = require('http');
var textHelper = require('./textHelper'),
    storage = require('./storage');

var registerIntentHandlers = function (intentHandlers, skillContext) {
	
	intentHandlers.Suggestion = function (intent, session, response) {
		http.get("http://hackucsc2017.herokuapp.com/addSample/1", function(rc) {
			console.log(rc.req);
			console.log(rc.statusCode);
		});
	};
	
	
	intentHandlers.CreateOutfit = function (intent, session, response) {
		var newOutfitName = intent.slots[0].value;
		var reprompt = textHelper.nextHelp;

		storage.loadCloset(session, function (currentCloset) {
			currentCloset.data.outfits.newOutfitName = {};
			response.ask('Outfit has been created and added to closet. How would you like to modify this outfit?', reprompt);
			
			currentCloset.save(function () {
				if (reprompt) {
					response.ask('What else would you like to do to your closet?', reprompt);
				} else {
					response.tell('What else would you like to do to your closet?');
				}
			});
			return str_intent;
		});
    };
	
	var outfitCreator = intentHandlers.CreateOutfit;
    
	intentHandlers.AddClothes = function (intent, session, response, outfitCreator){
		http.get("http://hackucsc2017.herokuapp.com/addSample/1", function(rc) {
			
			var newClothes = [intent.slots[0].value, intent.slots[1].value, intent.slots[2].value];
			var reprompt = textHelper.nextHelp;
			
			storage.loadCloset(session, function (currentCloset) {
				currentCloset.data.outfit.outfitCreator["top"] = newClothes;
				response.ask('Clothes added to outfit. What else would you like to add or do?', reprompt);
				
				currentCloset.save(function () {
					if (reprompt) {
						response.ask('What else would you like to do to your closet?', reprompt);
					} else {
						response.tell('What else would you like to do to your closet?');
					}
				});
			});
		});
	};

    intentHandlers.ResetCloset = function (intent, session, response) {
        storage.newCloset(session).save(function () {
            response.ask('Closet has been reset. ', 'How else would you like to interact?');
        });
    };
	
	intentHandlers.DeleteOutfit = function (intent, session, response) {
		storage.loadCloset(session, function (currentCloset) {
			var reprompt = textHelper.nextHelp;
			if(currentCloset.data.outfits.hasOwnProperty(intent.slots.name.value)){
				var str_intent = intent.slots.name.value;
				delete currentCloset.data.outfits.str_intent;
				response.ask('Removed outfit. What else would you like to do?', reprompt);
			}
			else{
				response.ask('Outfit does not exist. Please enter a valid outfit or do somehing else.', reprompt);
			}
			
			currentCloset.save(function () {
				if (reprompt) {
					response.ask('What else would you like to do to your closet?', reprompt);
				} else {
					response.tell('What else would you like to do to your closet?');
				}
			});
		});
	};
	
	intentHandlers.CloseCloset = function (intent, session, response) {
		storage.loadCloset(session, function (currentCloset) {
			response.tell('closet is now closed.');
		});
	};
		

    intentHandlers['AMAZON.HelpIntent'] = function (intent, session, response) {
        var speechOutput = textHelper.completeHelp;
        if (skillContext.needMoreHelp) {
            response.ask(textHelper.completeHelp + ' So, how can I help?', 'How can I help?');
        } else {
            response.tell(textHelper.completeHelp);
        }
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can start customizing your outfit.');
        } else {
            response.tell('');
        }
    };
};
exports.register = registerIntentHandlers;