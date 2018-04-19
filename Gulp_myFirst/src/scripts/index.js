/**
 * 
 * 
 * 
 * **/
'use strict';

var indexApp = angular.module('indexApp', ['ng','ui.router']);

indexApp.run(['$state',function($state){
	$state.go('index')
}])
indexApp.controller('mainCtrl',['$scope',function($scope){
	
	
}]);

