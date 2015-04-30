// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter',
    [
        'ionic',
        'app.controllers',
        'app.services',
        'user.controllers',
        'st.timepicker',
        'user.services'
    ]
)
/**
 * see documentation: https://www.parse.com/apps/quickstart#parse_data/web/existing
 *
 * SET THESE VALUES IF YOU WANT TO USE PARSE, COMMENT THEM OUT TO USE THE DEFAULT
 * SERVICE
 *
 * parse constants
 */
    .value('ParseConfiguration', {
        applicationId: "UXm5of3vo5gvHTnp2LCxtrTJuDZfABFJIvdNP4CR",
        javascriptKey: "Ei9oWJukPQPnK4WLh3r5JvwaKlARRjrIMgpJxcxw"
    })
/**
 *
 */
    .config(function ($stateProvider, $urlRouterProvider) {

        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            // create account state
            .state('app-signup', {
                url: "/signup",
                templateUrl: "templates/user/signup.html",
                controller: "SignUpController"
            })
            // login state that is needed to log the user in after logout
            // or if there is no user object available
            .state('app-login', {
                url: "/login",
                templateUrl: "templates/user/login.html",
                controller: "LoginController"
            })

            // setup an abstract state for the tabs directive, check for a user
            // object here is the resolve, if there is no user then redirect the
            // user back to login state on the changeStateError
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
                resolve: {
                    user: function (UserService) {
                        var value = UserService.init();
                        return value;
                    }
                }
            })

            // Each tab has its own nav history stack:
            .state('tab.list', {
                url: '/list',
                params: {
                    forceUpdate: {value: null},
                    forceUpdate: {value: null, squash: true} 
                },
                views: {
                    'tab-list': {
                        templateUrl: 'templates/tab-list.html',
                        controller: 'ListCtrl'
                    }
                }
            })
            .state('tab.list-detail', {
                url: '/list/:itemId',
                views: {
                    'tab-list': {
                        templateUrl: 'templates/list-detail.html',
                        controller: 'ListDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('tab.update-account', {
                url: '/update-account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/update-account.html',
                        controller: 'UpdateCtrl'
                    }
                }
            })

            .state('tab.newItem', {
                url: '/new-item',
                views: {
                    'tab-list': {
                        templateUrl: 'templates/newItem.html',
                        controller: 'NewItemCtrl'
                    }
                }

            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/list');

    })
    .run(function ($ionicPlatform, $rootScope, $state, UserService) {

        UserService.init();

        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {

                debugger;

                console.log('$stateChangeError ' + error && (error.debug || error.message || error));

                // if the error is "noUser" the go to login state
                if (error && error.error === "noUser") {
                    $state.go('app-login', {});
                }
            });

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordozva.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
  .controller('ListDetailCtrl', ['$state', '$scope', 'AppService', '$timeout', '$stateParams', // <-- controller dependencies
    function($state, $scope, AppService, $timeout, $stateParams) {

        console.log($stateParams.id);
        AppService.findOneItem($stateParams.itemId).then(function(_photo) {
            $timeout(function() {
                $scope.photo = _photo;
                console.log(JSON.stringify($scope.photo, null, 2));
            }, 0);

        }, function(_error) {
            alert(JSON.stringify(_error));
        });
    }])



    
