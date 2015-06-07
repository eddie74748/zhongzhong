angular.module('starter.services', [])

.factory('Products', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var products = [{
    id: 0,
    name: '诱人草莓',
    lastText: 'You on your way?',
    face: 'http://pic16.nipic.com/20110824/2839526_150423311860_2.jpg'
  }, {
    id: 1,
    name: '黄桃？',
    lastText: 'Hey, it\'s me',
    face: 'http://img3.imgtn.bdimg.com/it/u=2257182059,1098161722&fm=21&gp=0.jpg'
  },{
    id: 2,
    name: '青柠檬？？',
    lastText: 'I should buy a boat',
    face: 'http://img5.imgtn.bdimg.com/it/u=2254149823,2917968794&fm=21&gp=0.jpg'
  }, {
    id: 3,
    name: '水蜜桃',
    lastText: 'Look at my mukluks!',
    face: 'http://pic1a.nipic.com/2009-02-26/2009226184436663_2.jpg'
  }, {
    id: 4,
    name: '西瓜',
    lastText: 'This is wicked good ice cream.',
    face: 'http://pic1a.nipic.com/2009-03-02/20093213362077_2.jpg'
  }];

  return {
    all: function() {
      return products;
    },
    remove: function(product) {
        products.splice(products.indexOf(product), 1);
    },
    get: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    }
  };
});
