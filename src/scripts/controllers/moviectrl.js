function moviectrl($scope, $rootScope, $timeout, dataservice, $q){
    // $scope.$watch('selectedRating', function (newValue, oldValue) {
    //     $scope.selectedRating = newValue;
    // });
    debugger;
    $scope.selectedRating = undefined;
    
    $scope.movieslist = [];
    

    $scope.getMoviesList = function () {
        var deferred = $q.defer();
            dataservice.getMoviesList().then(function (result) {
                $scope.movieslist = result;
                $scope.oldMoviesList = result;
                $scope.Ratingclk();
                console.log($scope.movieslist);
                deferred.resolve(result);
            }, function (error) {
                alert("error while getting data");
            });    
            return deferred.promise;   
       
        }
     
        $scope.updatMoviesList = function(movies){
            var deferred = $q.defer();
            
            
            dataservice.setMoviesList(movies).then(function (result) {
                $scope.getMoviesList().then(function(result){
                    deferred.resolve(result);
                });
                
            }, function (error) {
                alert("error while getting data");
            });
            return deferred.promise;
        }
    
    $scope.clearFilter = function(){
        $scope.movieslist = $scope.newMoviesList;
        $scope.selectedRating = undefined;
    }
 
    $scope.Ratingclk = function ()
    {
        var moviesList = $scope.movieslist;

        var totalMoviesRate0 = 0;
        var totalMoviesRate1 = 0;
        var totalMoviesRate2 = 0;
        var totalMoviesRate3 = 0;
        var totalMoviesRate4 = 0;
        var totalMoviesRate5 = 0;

        $scope.labels = ['Rating 0', 'Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'];
        $scope.series = ['Total Movies'];

        for (var i = 0; i < moviesList.length; i++) {
            var selectedMovie = moviesList[i];
            if (selectedMovie.rating === '0' || selectedMovie.rating === 0) {
                totalMoviesRate0++;
            } else if (selectedMovie.rating === '1' || selectedMovie.rating === 1) {
                totalMoviesRate1++;
            } else if (selectedMovie.rating === '2' || selectedMovie.rating === 2) {
                totalMoviesRate2++;
            } else if (selectedMovie.rating === '3' || selectedMovie.rating === 3) {
                totalMoviesRate3++;
            } else if (selectedMovie.rating === '4' || selectedMovie.rating === 4) {
                totalMoviesRate4++;
            } else {
                totalMoviesRate5++;
            }

        }


        $scope.data = [
            [totalMoviesRate0, totalMoviesRate1, totalMoviesRate2, totalMoviesRate3, totalMoviesRate4, totalMoviesRate5]

        ];
       
        $scope.newMoviesList= $scope.movieslist;
        
    }
       

        $scope.onChartClick = function (points, evt) {            
            var index = points[0]._index;           
            
            
            $scope.selectedRating = index.toString();
            
            //return $scope.movieslist
            // $scope.updatedMoviesList();
            $scope.getMoviesList();
            // console.log($scope.selectedRating);
        };
        $scope.UpdateBar = function () {  
            $scope.updatMoviesList($scope.movieslist).then(function (result) {
                return $scope.data;
            }, function (error) {
                alert("error while getting data");
            });
        }
    
    $scope.RatingClick = function()
    {       
        // ratingFilter($scope, $rootScope);
        
        $scope.check();
        return $scope;        
    }

    $scope.getMoviesList();
   

    $scope.flipped = false;

    $scope.flip = function() {
        $scope.flipped = !$scope.flipped;
    };

    $scope.sortOrder = "title";
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
};


angular.module('mrd').controller('moviectrl',moviectrl);

function ratingFilter() {
    
    return function (items, rating) {
        
        var newItems = [];
        if (rating === undefined) {
            newItems = items;
        }
        else {
            for (var i = 0; i < items.length; i++) {
                if (items[i].rating === rating) {
                    newItems.push(items[i]);
                }
            };
        }
        
        return newItems;
    }
};

angular.module('mrd').filter('ratingFilter', ratingFilter);