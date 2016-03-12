var app = angular.module('UIApp', ['ngRoute']);

app.config(['$routeProvider',
     function($routeProvider) {
       $routeProvider.
         when('/', {
             templateUrl: 'app/views/conditionBuilder.html',
             controller: 'conditionBuilderController'
         }).
         otherwise({
             redirectTo: '/'
          });
 }]);