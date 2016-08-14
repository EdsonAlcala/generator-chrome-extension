var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var fs = require('fs');

//local modules
var utils = require('./sources/utils');
var prompts = require('./sources/prompts.js');

module.exports = yeoman.Base.extend({

  initializing: function () {
    // get package.json content
    this.pkg = require('../package.json');

  },

  prompting: function () {

    // say hello
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('Chrome Extension') + ' generator! version.' + this.pkg.version
    ));

    return this.prompt(prompts.main)
      .then(function (answers) { // prompt
        this.answers = answers;
      }.bind(this));
  },

  configuring: function () {
    // save appModule in answers
    this.answers.appModule = utils.moduleName(this.answers.appName);
  },

  writing: {

    app: function () {

      // dependencies
      this.copy('package.json', 'package.json');

      // app files
      this.copy('gulpfile.babel.js', 'gulpfile.babel.js');     

      // other files            
      this.directory('src', 'src');

      this.directory('dist', 'dist');    

      // dot files
      this.copy('babelrc', '.babelrc');
      this.copy('eslintignore', '.eslintignore');
      this.copy('eslintrc', '.eslintrc');
      this.copy('gitignore', '.gitignore');
    }
  },

  install: function () {
    //install npm, bower and save plugins/platforms
    this.installDependencies({
      npm: true
    });
  },

  end: function () {
    this.log(yosay(
      'All done! To get going run:\n' +
      chalk.green('gulp')
    ));
  }
});