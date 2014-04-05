var host = "http://test-crawler-moocs4u.appspot.com"
//var host = "http://192.168.1.5:8081";
angular.module('moocs4u', ["ngRoute","mobile-angular-ui","mobile-angular-ui.touch","mobile-angular-ui.scrollable"])
    .config(function($routeProvider) {
        $routeProvider
            .when('/about', {
                controller: 'MainCtrl',
                templateUrl: "partials/about.tpl.html"})
            .when('/platform/:platformID', {
                controller: 'PlatformCtrl',
                templateUrl: "partials/platform.tpl.html"}
            ).when('/category/:categoryID', {
                controller: 'CategoryCtrl',
                templateUrl: "partials/category.tpl.html"}
            ).when('/course/:courseID', {
                controller: 'CourseCtrl',
                templateUrl: "partials/course.tpl.html"}
            ).otherwise({
                redirectTo: '/about'
            });
        // ...
    }).config(function ( $httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }).controller('MainCtrl', function($rootScope, $scope,$http,$log){
        $scope.platforms= {};

        $http.get( host + '/api/1.0/platforms')
            .success(function(data){
                $log.info("")
                $scope.platforms = data;
                $rootScope.loading = false;
            })
            .error(function(d){
                $rootScope.loading = false;
            });

            $rootScope.$on("$routeChangeStart", function(){
                $rootScope.loading = true;
            });
            $rootScope.$on("$routeChangeEnd", function(){
                $rootScope.loading = false;
            });

        }).controller('PlatformCtrl', function($rootScope, $scope,$http,$routeParams,$window){

            $rootScope.$on("$routeChangeStart", function(){
                $rootScope.loading = true;
            });

            $scope.platform = {};
            if( $routeParams.platformID != undefined ) {
                $http.get(host + '/api/1.0/platform?id=' + $routeParams.platformID ).success(function (data) {
                    $scope.platform = data;
                    $rootScope.loading = false;
                })
            }


        }).controller('CategoryCtrl', function($rootScope, $scope,$http,$routeParams){
            $scope.category = {};
            if( $routeParams.categoryID != undefined ) {
                $http.get(host + '/api/1.0/category?id=' + $routeParams.categoryID ).success(function (data) {
                    $scope.category = data;
                    $rootScope.loading = false;
                })
            }

        }).controller('CourseCtrl', function($rootScope, $scope,$http,$routeParams){
            $scope.course = {};
            if( $routeParams.courseID != undefined ) {
                $http.get(host + '/api/1.0/course?id=' + $routeParams.courseID ).success(function (data) {
                    $scope.course = data;
                    $rootScope.loading = false;
                })
            }

        });