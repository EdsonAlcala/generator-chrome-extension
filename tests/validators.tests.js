var validator = require('../app/sources/validators');
var assert = require('yeoman-assert');

describe('validators', function () {
    it('should validate appName', function () {
        var appName = 'EdsonAlcala';
        var isValid = validator.validateUsername(appName);
        assert.equal(isValid, true);
    });

    it('should validate appId', function () {
        var appId = 'com.project.loqsea';
        var isValid = validator.validateAppId(appId);
        assert.equal(isValid, true);
    });

    it('should validate app description', function () {
        var description = 'description';
        var isValid = validator.validateDescription(description);
        assert.equal(isValid, true);
    });

    it('should validate userName', function () {
        var userName = 'EdsonAlcala';
        var isValid = validator.validateUsername(userName);
        assert.equal(isValid, true);
    });
});
