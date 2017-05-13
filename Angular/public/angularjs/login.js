//loading the 'login' angularJS module

var login = angular.module('login', ['ui.router','ngRoute','ngResource']);

//to store session data
login.config(function($stateProvider, $urlRouterProvider, $locationProvider,$routeProvider) {
		$locationProvider.html5Mode(true);
		$stateProvider.state('index',{
			url : '/',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar.html'
	            },
	            'content': {
	                templateUrl : 'templates/login.html',
	            },
			}
		});
		$urlRouterProvider.otherwise('/');
});
//defining the login controller
login.controller('login', function($scope,$http,$state,$window) {
	$scope.register_valid=true;
	$scope.register_invalid=true;
	$scope.login_valid=true;
	$scope.login_invalid=true;
	
	$scope.register = function() {
		$http({
			method : "POST",
			url : '/registeruser',
			data : {
				"first_name" : $scope.first_name,
				"last_name" : $scope.last_name,
				"role":$scope.role,
				"email":$scope.email,
				"password" : $scope.password,
			}
		}).success(function(data) {
			if (data.statusCode == 405) {
				$scope.register_invalid = false;
				$scope.register_valid = true;
			}
			else{
				$scope.register_invalid = true;
				$scope.register_valid = false;
			} 
		}).error(function(error) {
			$scope.register_invalid = false;
			$scope.register_valid = true;
		});
	};
	
	
	
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"username" : $scope.username,
				"password" : $scope.password,
				"role":$scope.role
			}
		}).success(function(data) {
			console.log(data);
			if (data.statusCode == 200) {
				$scope.login_invalid = true;
				$scope.login_valid = false;
			}
			else{
				$scope.login_invalid = false;
				$scope.login_valid = true;
			} 
		}).error(function(error) {
			$scope.login_invalid = false;
			$scope.login_valid = true;
		});
	};
});