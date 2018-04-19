'use strict';
indexApp.controller('indexCtrl',['$scope',function($scope){
	console.log('我是首页控制器');
	$scope.user = {
		id: '01',
		name: 'job',
		age: 12
	};
	$scope.test = function(){
		var id = $scope.user.id
		$scope.test2(id)
	}
	$scope.test2 = function(id){
		console.log('===============');
		console.log(id)
	}
	$scope.test();
}]);