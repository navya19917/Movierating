angular.module('mrd')
  .directive('flipper', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/flipper.html',
      transclude: {
        front: 'front',
        back: 'back'
      },
      scope: {
        flipped: '=',
        flipAlong: '@'
      }
    };
  });


// angular.module('mrd').directive("flipper", function() {
//     return {
//       restrict: "E",
//       template: "<div class='flipper' ng-transclude ng-class='{ flipped: flipped }'></div>",
//       transclude: true,
//       scope: {
//         flipped: "="
//       }
//     };
//   });
  
//   angular.module('mrd').directive("front", function() {
//     return {
//       restrict: "E",
//       template: "<div class='front tile' ng-transclude></div>",
//       transclude: true
//     };
//   });
  
//   angular.module('mrd').directive("back", function() {
//     return {
//       restrict: "E",
//       template: "<div class='back tile' ng-transclude></div>",
//       transclude: true
//     }
//   });