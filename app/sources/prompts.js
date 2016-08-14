var validator = require('./validators');

module.exports = {
    main: [
        {
            type: 'input',
            name: 'appName',
            message: 'Enter a name for your project.\n',
            validate: validator.validateAppName,
            default: this.appname, // Default to current folder name
            when: function () {
                // Show this prompt only if appName is not already set
                return !this.appName;
            }.bind(this)
        },        
        //description
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description for your project.\n',
            validate: validator.validateDescription
        },
        //author name
        {
            type: 'input',
            name: 'userName',
            message: 'Enter the author\'s name.\n',
            validate: validator.validateUsername            
        }
    ]
};