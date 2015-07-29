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

.controller('SellCtrl', function($scope, $ionicActionSheet, $timeout) {
  $scope.settings = {
    enableFriends: true
  };

    // Triggered on a button click, or some other target
    $scope.show = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<b>Share</b> This' },
                { text: 'Move' }
            ],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 2000);
    };
})

.controller('MapCtrl', function($scope){

})

.controller('MeCtrl', function($scope, $ionicLoading, $cordovaActionSheet, $cordovaImagePicker, $cordovaFileTransfer, $cordovaCamera) {
    $scope.me = {
        account: "ltloveandroid"
    };

    var options = {
        title: '上传头像',
        buttonLabels: ['相册', '相机'],
        addCancelButtonWithLabel: '取消',
        androidEnableCancelButton: true,
        winphoneEnableCancelButton: true
    };
    $scope.upLoadImg = function() {
        alert("upLoadImg");
        console.log("uploadImg");
        $cordovaActionSheet.show(options)
            .then(function(btnIndex) {
                switch (btnIndex) {
                    case 1:
                        $scope.pickImg();
                        break;
                    case 2:
                        $scope.cameraImg();
                        break;
                    default:
                        break;
                }
            });
    };

    $scope.pickImg = function() {
        var options = {
            maximumImagesCount: 1,
            width: 800,
            height: 800,
            quality: 80
        };
        var server = "http://192.168.0.1";//ApiEndpoint.url + '/Account/ModifyAvatar?_ajax_=1&ue=' + Userinfo.l.ue;
        var trustHosts = true
        var option = {};

        $cordovaImagePicker.getPictures(options)
            .then(function(results) {
                $cordovaFileTransfer.upload(server, results[0], option, true)
                    .then(function(result) {
                        alert('上传成功');
                        $scope.avaImg = results[0];
                    }, function(err) {
                        alert('上传失败，请重试');
                    }, function(progress) {
                        $ionicLoading.show({
                            template: "正在上传..." + Math.round((progress.loaded / progress.total) * 100) + '%'
                        });
                        if (Math.round((progress.loaded / progress.total) * 100) >= 99) {
                            $ionicLoading.hide();
                        }
                    });
            }, function(error) {
                // alert('出错');
            });
    };

    $scope.cameraImg = function() {
        var server = "http://192.168.0.1";//ApiEndpoint.url + '/Account/ModifyAvatar?_ajax_=1&ue=' + Userinfo.l.ue;
        var trustHosts = true
        var option = {};
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $cordovaFileTransfer.upload(server, "data:image/jpeg;base64," + imageData, option, true)
                .then(function(result) {
                    alert('上传成功');
                    $scope.doRefresh();
                }, function(err) {
                    alert('上传失败，请重试');
                }, function(progress) {
                    $ionicLoading.show({
                        template: "正在上传..." + Math.round((progress.loaded / progress.total) * 100) + '%'
                    });
                    if (Math.round((progress.loaded / progress.total) * 100) >= 99) {
                        $ionicLoading.hide();
                    };
                });
        }, function(err) {
            // alert('出错');
        });
    };
})
;
