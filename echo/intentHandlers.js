/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

'use strict';
var textHelper = require('./node_modules/textHelper'),
    storage = require('./node_modules/storage');

var registerIntentHandlers = function (intentHandlers, skillContext) {
	
	intentHandlers.CreateOutfit = function (intent, session, response) {
		console.log(intent.slots[0].name.value);
		var newOutfitName = textHelper.getOutfitName(intent.slots.name.value);
		var reprompt = textHelper.nextHelp;
		if(!newOutfitName){
			response.ask('This outfit already exists in the closet. What would you like to do with it?', reprompt);
			return;
		}
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
    
	intentHandlers.AddTop = function (intent, session, response, outfitCreator){
		console.log(intent);
		var newTopName = textHelper.getTopName(intent.slots.name.value);
		var reprompt = textHelper.nextHelp;
		if(!newTopName){
			response.ask('This top already exists for the outfit. What else would you like to add or do?', reprompt);
			return;
		}
		storage.loadCloset(session, function (currentCloset) {
			currentCloset.data.outfit.outfitCreator["top"]= intent.slots.name.value;
			response.ask('Top added. What else would you like to add or do?', reprompt);
			
			currentCloset.save(function () {
				if (reprompt) {
					response.ask('What else would you like to do to your closet?', reprompt);
				} else {
					response.tell('What else would you like to do to your closet?');
				}
			});
		});
	};
	
	intentHandlers.AddBottom = function (intent, session, response, outfitCreator){
		console.log(intent);
		var newBottomName = textHelper.getBottomName(intent.slots.name.value);
		var reprompt = textHelper.nextHelp;
		if(!newBottomName){
			response.ask('This bottom already exists for the outfit. What else would you like to add or do?', reprompt);
			return;
		}
		storage.loadCloset(session, function (currentCloset) {
			currentCloset.data.outfit.outfitCreator.bottom = intent.slots.name.value;
			response.ask('Bottom added. What else would you like to add or do?', reprompt);
			
			currentCloset.save(function () {
				if (reprompt) {
					response.ask('What else would you like to do to your closet?', reprompt);
				} else {
					response.tell('What else would you like to do to your closet?');
				}
			});
		});
	};
	
	intentHandlers.AddJacket = function (intent, session, response, outfitCreator){
		console.log(intent);
		var newJacketName = textHelper.getJacketName(intent.slots.name.value);
		var reprompt = textHelper.nextHelp;
		if(!newJacketName){
			response.ask('This jacket already exists for the outfit. What else would you like to add or do?', reprompt);
			return;
		}
		storage.loadCloset(session, function (currentCloset) {
			currentCloset.data.outfit.outfitCreator.jacket = intent.slots.name.value;
			response.ask('Jacket added. What else would you like to add or do?', reprompt);
			
			currentCloset.save(function () {
				if (reprompt) {
					response.ask('What else would you like to do to your closet?', reprompt);
				} else {
					response.tell('What else would you like to do to your closet?');
				}
			});
		});
	};

    intentHandlers.ResetCloset = function (intent, session, response) {
        storage.newCloset(session).save(function () {
            response.ask('Closet has been reset. ', 'How else would you like to interact?');
        });
    };
	
	intentHandlers.RemoveOutfit = function (intent, session, response) {
		//removes an outfit
		storage.loadCloset(session, function (currentCloset) {
			var reprompt = textHelper.nextHelp;
			response.ask('What outfit would you like to remove? ', reprompt);	
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