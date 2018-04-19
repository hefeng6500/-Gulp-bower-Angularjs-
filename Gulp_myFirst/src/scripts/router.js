'use strict';

indexApp.config(["$httpProvider","$stateProvider","$urlRouterProvider",
	function($httpProvider,$stateProvider,$urlRouterProvider){
		$httpProvider.defaults.headers
		.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		
		$stateProvider
			.state('index',{
				url: '/index',
				templateUrl: 'views/index.html',
				controller: 'indexCtrl'
			})
			.state('first',{
				url: '/first',
				templateUrl: 'views/first.html',
				controller: 'firstCtrl'
			})
			.state('second',{
				url: '/second',
				templateUrl: 'views/second.html',
				controller: 'secondCtrl'
			})
			.state('info',{
				url: '/info',
				templateUrl: 'views/info.html',
				controller: 'infoCtrl'
			})
			
			$urlRouterProvider.otherwise('index');		//未找到指定的路由地址，重定向到home页
			
	}])





			

	
