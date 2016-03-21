 (function() {
      function CollectionCtrl(Fixtures) {
      this.albums = Fixtures.getCollection(22);
     }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();
