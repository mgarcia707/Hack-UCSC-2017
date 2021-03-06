/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/


'use strict';	
var textHelper = (function () {

    return {
        completeHelp: 'Here\'s some things you can say,'
        + ' add a top, bottom, and/or jacket.'
        + ' remove a top, bottom, and/or jacket.'
        + ' select a top, bottom, and/or jacket.'
        + ' ask "what am I wearing?"'
		+ ' or close closet',
        nextHelp: 'You can add a new piece of clothing, remove a piece of clothing, select a piece of clothing, or say help. What would you like?'
	};
})();
module.exports = textHelper;