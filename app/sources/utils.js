'use strict';

var strings = require('./strings');

module.exports = {
    /**
     * transforms user input into a useful modulename for angular
     * @param  {String} userInput arbitrary user input
     * @return {String}           angular-friendly module name
     */
    moduleName: function (userInput) {
        return strings.textToCamel(userInput);
    }  
};