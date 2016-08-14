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
      'Welcome to the amazing ' + chalk.red('ES6-Gulp-Angular') + ' generator! version.' + this.pkg.version
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
      this.copy('webpack.config.js', 'webpack.config.js');
      this.copy('webpack.dev.config.js', 'webpack.dev.config.js');
      this.copy('webpack.dist.config.js', 'webpack.dist.config.js');

      // other files            
      this.directory('src', 'src');
      //this.directory('generator', 'generator');
      this.directory('www', 'www');

      // Copy all generator files      
      this.generadorFolder = 'generator/component';
      this.mkdir(this.generadorFolder);
      this.fs.copy(
        this.templatePath(this.generadorFolder + '/*.*'),
        this.generadorFolder
      );

      // dot files
      this.copy('babelrc', '.babelrc');
      this.copy('bowerrc', '.bowerrc');
      this.copy('eslintignore', '.eslintignore');
      this.copy('eslintrc', '.eslintrc');
      this.copy('gitignore', '.gitignore');
    }
  },

  install: function () {
    // install npm, bower and save plugins/platforms
    // this.installDependencies({
    //   npm: true
    // });
  },

  end: function () {
    this.log(yosay(
      'All done! To get going run:\n' +
      chalk.green('gulp')
    ));
  }
});