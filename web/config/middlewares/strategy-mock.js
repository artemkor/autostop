'use strict';

var passport = require('passport'),
    util = require('util');

function StrategyMock(options, verify) {
    console.log('Create instance of strategy.');
    options = options || {};
    this.name = 'mock';
    this.verify = verify;
}

util.inherits(StrategyMock, passport.Strategy);

StrategyMock.prototype.authenticate = function authenticate(req) {
    console.log('authentication...');

    var self = this;
    var userId = req.get('userId');
    this.verify(userId, function (err, user) {
        if (err) {
            self.fail(err);
        } else {
            self.success(user);
        }
    });
}

module.exports = StrategyMock;