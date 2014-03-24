var host = "http://test-crawler-moocs4u.appspot.com"
//var host = "http://127.0.0.1:8081";
angular.module('moocs4u', ["ngRoute","mobile-angular-ui","mobile-angular-ui.touch","mobile-angular-ui.scrollable"])
    .config(function($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: "partials/about.tpl.html"})
            .when('/platform/:platformID', {
                controller: 'PlatformCtrl',
                templateUrl: "partials/platform.tpl.html"}
            ).when('/category/:categoryID', {
                controller: 'CategoryCtrl',
                templateUrl: "partials/category.tpl.html"}
            ).otherwise({
                redirectTo: '/about'
            });
        // ...
    }).config(function ( $httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }).controller('MainCtrl', function($rootScope, $scope,$http){
        $scope.platforms= {};
        $http.get( host + '/api/1.0/platforms')
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
    }).controller('PlatformCtrl', function($rootScope, $scope,$http,$routeParams){
        $scope.platform = {};
        if( $routeParams.platformID != undefined ) {
            $http.get(host + '/api/1.0/platform?id=' + $routeParams.platformID ).success(function (data) {
                $scope.platform = data;
            })
        }

    }).controller('CategoryCtrl', function($rootScope, $scope,$http,$routeParams){
        $scope.category = {};
        if( $routeParams.categoryID != undefined ) {
            $http.get(host + '/api/1.0/category?id=' + $routeParams.categoryID ).success(function (data) {
                $scope.category = data;
            })
        }

    });