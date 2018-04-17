
// $stateProvider: 管理状态定义、当前状态和状态转换
// $urlRouterProvider: 管理了一套路由规则列表来处理当$location发生变化时如何跳转
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('home',{	//首页
			url: '/home',
			templateUrl: 'view/home.html',
			controller: 'homeCtrl'
		})
		
		$urlRouterProvider.otherwise('home');		//未找到指定的路由地址，重定向到home页
}]);
