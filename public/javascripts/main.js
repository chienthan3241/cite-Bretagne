(function(angular) {
    'use strict';
    var app = angular.module('app', []);
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ]);
    
})(window.angular);