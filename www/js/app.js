// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.tabs.style("standard");
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.zhong', {
    url: '/zhong',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-zhong.html',
        controller: 'ZhoneCtrl'
      }
    }
  })

  .state('tab.buy', {
      url: '/buy',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-buy.html',
          controller: 'BuyCtrl'
        }
      }
    })
    .state('tab.buy-detail', {
      url: '/buy/:productId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/buy-detail.html',
          controller: 'BuyDetailCtrl'
        }
      }
    })

  .state('tab.sell', {
    url: '/sell',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-sell.html',
        controller: 'SellCtrl'
      }
    }
  })

  .state('tab.me', {
      url: '/me',
      views: {
          'tab-me': {
              templateUrl: 'templates/tab-me.html',
              controller: 'MeCtrl'
          }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/zhong');

});
