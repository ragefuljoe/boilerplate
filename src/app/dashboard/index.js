angular.module( 'dashboard', [])
.config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'dashboard',
            url: '/',
            views: {
                'main': {
                    controller:'DashboardController',
                    templateUrl: 'dashboard/templates/index.tpl.html'
                }
            },
            resolve: {
            }
        });
    }
).controller( 'DashboardController', 
    function DashboardController($scope) {
        console.log('Dashboard State');
    }
);