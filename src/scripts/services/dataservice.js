angular.module('mrd').factory('dataservice',
    function($rootScope, $http, $q){
        var moviesList = [];
        var getMoviesList = function(){
            var deferred = $q.defer();
            if(moviesList.length==0) {
                
                $http.get('data/movies.json')
                .success(function(result){
                    moviesList = result;
                    deferred.resolve(result)
                })
                .error(function(data){
                    deferred.reject(data)
                });
                return deferred.promise;
            } else{
                $http.get('data/movies.json')
                .success(function(result){

                    deferred.resolve(moviesList)
                })
                .error(function(data){
                    deferred.reject(data)
                });
                return deferred.promise;
            }
            
        }

        var setMoviesList = function(movies){
            var deferred = $q.defer();
            moviesList = movies;
            deferred.resolve(moviesList)
            return deferred.promise;
        }

        return {
            getMoviesList : getMoviesList,
            setMoviesList: setMoviesList
        }
    })