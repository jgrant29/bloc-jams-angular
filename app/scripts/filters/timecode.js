(function() {
     function timecode() {
         return function(seconds) {
             var seconds = buzz.toTimer( seconds )
                long = true;
             return seconds;
         };
     }

     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();