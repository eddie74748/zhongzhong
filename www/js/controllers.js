angular.module('starter.controllers', [])

.controller('ZhoneCtrl', function($scope) {
    $scope.onSlideClicked = function(slideIndex)
    {

    }

    $scope.topPhotos = [{
        "url": "http://zcr7.ncfstatic.com/attachment/201506/08/10/5574f9b47cd34o_600x450.jpg"
    },{
        "url": "http://zcr6.ncfstatic.com/attachment/201504/30/16/6ec406e1e8d19a648cc743a32659981754o_600x450.jpg"
    },{
        "url": "http://zcr5.ncfstatic.com/attachment/201505/22/16/78cc35d716ee3f0dc4af7460484c581a78o_600x450.jpg"
    },{
        "url": "http://zcr7.ncfstatic.com/attachment/201506/08/10/5574f9b47cd34o_600x450.jpg"
    },{
        "url": "http://zcr5.ncfstatic.com/attachment/201505/22/16/78cc35d716ee3f0dc4af7460484c581a78o_600x450.jpg"
    },{
        "url": "http://zcr6.ncfstatic.com/attachment/201504/30/16/6ec406e1e8d19a648cc743a32659981754o_600x450.jpg"
    },{
        "url": "http://zcr7.ncfstatic.com/attachment/201506/08/10/5574f9b47cd34o_600x450.jpg"
    },{
        "url": "http://zcr7.ncfstatic.com/attachment/201506/08/10/5574f9b47cd34o_600x450.jpg"
    }];
})

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

    $scope.doRefresh = function()
    {
        $http.get('/new-products')
            .success(function(newProducts) {
                $scope.products = newProducts;
            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.loadMore = function() {
        $http.get('/more-products').success(function(products) {
            appendProducts(products);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.moreDataCanBeLoaded = function() {
        return true;
    };

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
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
