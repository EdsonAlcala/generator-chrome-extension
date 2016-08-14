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
    },
            /**
   * transforms user input from text to snake-case
   * @param  {String} userInput free text
   * @return {String}           snake-case string
   */
  appPackageName: function (userInput) {
    var string = strings.textToCamel(userInput);
    string = strings.camelToSnake(string);
    return string;
  }     
};