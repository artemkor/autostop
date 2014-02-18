'use strict';

angular.module('autostop', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'ui.route',
    'ui.select2',
    'autostop.system',
    'autostop.articles',
    'autostop.users',
    'autostop.locations',
    'autostop.routes',
    'autostop.trips'
]);

angular.module('autostop.system', []);
angular.module('autostop.articles', []);
angular.module('autostop.users', []);
angular.module('autostop.locations', []);
angular.module('autostop.routes', []);
angular.module('autostop.trips', []);
