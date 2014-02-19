'use strict';

var uuid = require('node-uuid'),
    _ = require('underscore');

var ServiceHelper = function (server) {
    this.user = {
        getCreateData: function (source) {
            return _.extend({
                name: 'Name',
                username: 'Username' + uuid.v1(),
                email: 'Email@host.com' + uuid.v1(),
                password: 'Password',
                phone: 'cell +7 966 123-4567'
            }, source);
        },
        getUpdateData: function () {
            return {
                name: 'Username' + uuid.v1(),
                email: 'Email@host.com' + uuid.v1()
            };
        },
        create: function (done) {
            var createData = this.getCreateData();

            server.post('/api/users')
                .send(createData)
                .expect(200)
                .end(function (err, res) {
                    var user = res.body;
                    done(err, user);
                });
        }
    };

    this.location = {
        getCreateData: function (source) {
            return _.extend({
                title: 'Location'
            }, source);
        },
        create: function (userId, done) {
            var createData = this.getCreateData();
            server.post('/api/locations')
                .set('userId', userId)
                .send(createData)
                .expect(200)
                .end(function (err, res) {
                    done(err, res.body);
                });
        }
    };

    this.route = {
        getCreateData: function (source) {
            return _.extend({
                title: 'Title'
            }, source);
        },
        getUpdateData: function (source) {
            return _.extend({
                title: 'Title' + uuid.v1()
            }, source);
        },
        create: function (userId, locationId, done) {
            var createData = this.getCreateData({
                origin: locationId,
                destination: locationId
            });

            server.post('/api/routes')
                .set('userId', userId)
                .send(createData)
                .expect(200)
                .end(function (err, res) {
                    done(err, res.body);
                });
        }
    };

    this.trip = {
        getCreateData: function (defaults) {
            return _.defaults({
                start: new Date(),
                route: defaults.route
            }, defaults);
        },
        getUpdateData: function () {
            return {
                start: new Date()
            };
        },
        create: function (userId, defaults, done) {
            var createData = this.getCreateData(defaults);

            server.post('/api/trips')
                .set('userId', userId)
                .send(createData)
                .end(function (err, res) {
                    done(err, res.body);
                });
        }
    };
};

module.exports = function (server) {
    return new ServiceHelper(server);
};