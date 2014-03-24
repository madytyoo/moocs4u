angular.module('moocs4u', ["ngRoute","mobile-angular-ui","mobile-angular-ui.touch","mobile-angular-ui.scrollable"])
    .config(function($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: "partials/about.tpl.html"})
            .when('/coursera', {
                templateUrl: "partials/coursera.tpl.html"}
            ).otherwise({
                redirectTo: '/about'
            });
        // ...
    }).config(function ( $httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }).controller('MainController', function($rootScope, $scope,$http){
        $scope.platforms= {};
        $http.get('http://test-crawler-moocs4u.appspot.com/api/1.0/platforms')
            .success(function(data){
                $scope.platforms = data;
                console.log( "yay" );
            })
            .error(function(d){ console.log( "nope" ); });




        $rootScope.$on("$routeChangeStart", function(){
            $rootScope.loading = true;
        });

        $rootScope.$on("$routeChangeSuccess", function(){
            $rootScope.loading = false;
        });
    })