 (function() {
     function AlbumCtrl() {
         this.albumData = angular.copy(albumPicasso);
         this.hello = "Hello";
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();