var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var fs = require('fs');
var mkdirp = require('mkdirp');
var packageConfig = require('./sources/package-config.js');
var manifestConfig = require('./sources/manifest-config.js');
 
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

      // prepare package.json
      var packageJSON = packageConfig.packageJSON;
     
      // add other properties
      packageJSON.name = utils.appPackageName(this.answers.appName);      
      packageJSON.private = true;
      
      // dependencies
      this.write('package.json', JSON.stringify(packageJSON, null, 2));

      //prepare  manifest.json
      var manifestJSON = manifestConfig.manifestJSON;

      // add other properties
      manifestJSON.name = utils.appPackageName(this.answers.appName);   
      manifestJSON.short_name = utils.appPackageName(this.answers.appName); 
      manifestJSON.description = this.answers.description; 
      manifestJSON.author = this.answers.userName; 

       this.write('src/manifest.json', JSON.stringify(manifestJSON, null, 2));

      // app files
      this.copy('gulpfile.babel.js', 'gulpfile.babel.js');

      // other files            
      this.directory('src', 'src');

      // dot files
      this.copy('babelrc', '.babelrc');
      this.copy('eslintignore', '.eslintignore');
      this.copy('eslintrc', '.eslintrc');
      this.copy('gitignore', '.gitignore');

      //create empty folders
      mkdirp.sync('dist');
      mkdirp.sync('dist/js');
      mkdirp.sync('dist/css');
      mkdirp.sync('dist/fonts');
      mkdirp.sync('dist/img');
      mkdirp.sync('dist/pages');

      //create empty folders
      mkdirp.sync('src/css');
      mkdirp.sync('src/fonts');  
      mkdirp.sync('src/pages');  
    }
  },

  install: function () {
    //install npm, bower and save plugins/platforms
    this.installDependencies({
      npm: true,
      bower: false
    });
  },

  end: function () {
    this.log(yosay(
      'All done! To get going run:\n' +
      chalk.green('gulp')
    ));
  }
});