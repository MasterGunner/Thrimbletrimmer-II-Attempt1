var app = angular.module('EditorApp', ['ngRoute','ngMaterial']);

app.config(function ($routeProvider)
{
  	$routeProvider
//    	.when('/', {
//      	controller: 'HomeController',
//      	templateUrl: 'views/home.html'
//    })
    	.when('/video/:id', {
      	controller: 'EditorController',
      	templateUrl: 'views/Editor.html'
    })
    .otherwise({
      redirectTo: '/video/0'
    });
});

//http://capriccio.applejack.me:1337/Thrimbletrimmer.html?Video=014016Smashcuttoableachedwhitesk

app.config(function($mdThemingProvider) {
    //$mdThemingProvider.theme('default').accentPalette('purple').dark();
});