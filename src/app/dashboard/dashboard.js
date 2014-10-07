
angular.module( 'kitdash.dashboard', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'dashboard', {
    // abstract: true,
    url: '/dashboard',
    views: {
      "main": {
        controller: 'DashboardCtrl',
        templateUrl: 'dashboard/templates/dashboard.tpl.html'
      }
    },

    data:{ pageTitle: 'dashboard' }
  })

  ;//end states

}) //end config


.controller( 'DashboardCtrl', function DashboardController( $rootScope, $scope ) {
  
})//end dashboardctrl


;