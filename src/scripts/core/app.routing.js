var mrd = (function(){
    angular.module('mrd', ["ui.router","ui.bootstrap", "ngAnimate", "ngSanitize", "chart.js"])
})();
  
angular.module('mrd').config(function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/home")
      
      $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "views/home.html",
            controller: "moviectrl",
              controllerAs: "vm"
            
        })
          .state('home.movie', {
              url: "/movie",
              templateUrl: "views/movies.html",
              controller: "moviectrl",
              controllerAs: "vm"
          })
    });

  