angular.module('starter.controllers', [])

.controller('ZhoneCtrl', function($scope) {})

.controller('BuyCtrl', function($scope, Products) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.products = Products.all();
  $scope.remove = function(product) {
      Products.remove(product);
  }
})

.controller('BuyDetailCtrl', function($scope, $stateParams, Products) {
  $scope.product = Products.get($stateParams.productId);
})

.controller('SellCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MeCtrl', function($scope) {
    $scope.me = {
        account: "ltloveandroid"
    };
});
