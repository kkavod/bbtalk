'use strict';

var myStepDefinitionsWrapper = function() {
    var chai = require('chai');

    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);

    var expect = chai.expect;

    this.Given(/^I am on the "([^"]*)" page$/, function(arg1, callback) {
        browser.get(arg1);
        callback();
    });

    this.Then(/^the title should equal "([^"]*)"$/, function(arg1, callback) {
        expect(browser.getTitle()).to.eventually.equal(arg1).and.notify(callback);
    });
};

module.exports = myStepDefinitionsWrapper;
