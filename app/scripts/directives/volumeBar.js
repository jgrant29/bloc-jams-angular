(function() {
  function volumeBar() {
    return {
      templateUrl: '/templates/directives/volume_bar.html',
      replace: true,
      restrict: 'E'
    };
  }

  .angular('blocJams')
  .directive('volumeBar', volumeBar);
})();