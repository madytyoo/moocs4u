angular.module('moocs4u', ["ngRoute","mobile-angular-ui","mobile-angular-ui.touch","mobile-angular-ui.scrollable"])
    .config(function($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: "partials/about.tpl.html"}
            ).otherwise({
                redirectTo: '/about'
            });
        // ...
    }).controller('MainController', function($rootScope, $scope){

        $rootScope.$on("$routeChangeStart", function(){
            $rootScope.loading = true;
        });

        $rootScope.$on("$routeChangeSuccess", function(){
            $rootScope.loading = false;
        });
    })