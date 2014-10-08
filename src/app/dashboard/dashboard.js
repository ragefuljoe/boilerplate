
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
 $scope.rowCollection = [
        {'zone' : 'Americas', 'country': 'USA', 'ten_curr':2.55, 'ten_one':2.46, 'ten_six':2.70, 'inf_curr':1.5, 'inf_5y':1.2, 'as_of':'08/31/14'},
        {'zone' : 'Americas', 'country': 'Canada', 'ten_curr':2.09, 'ten_one':2.12, 'ten_six':2.46, 'inf_curr':2.1, 'inf_5y':1.3, 'as_of':'08/31/14'},
        {'zone' : 'Americas', 'country': 'Brazil', 'ten_curr':4.07, 'ten_one':3.92, 'ten_six':4.58, 'inf_curr':6.5, 'inf_5y':5.5, 'as_of':'08/31/14'},
        {'zone' : 'Americas', 'country': 'Mexico', 'ten_curr':3.43, 'ten_one':3.31, 'ten_six':3.71, 'inf_curr':4.2, 'inf_5y':4.0, 'as_of':'08/31/14'},
        {'zone' : 'UK EuroZone', 'country': 'UK', 'ten_curr':2.34, 'ten_one':2.46, 'ten_six':2.66, 'inf_curr':1.5, 'inf_5y':2.9, 'as_of':'08/31/14'},
        {'zone' : 'UK EuroZone', 'country': 'France', 'ten_curr':1.28, 'ten_one':1.26, 'ten_six':2.04, 'inf_curr':0.5, 'inf_5y':1.4, 'as_of':'08/31/14'},
        {'zone' : 'UK EuroZone', 'country': 'Germany', 'ten_curr':0.92, 'ten_one':0.93, 'ten_six':1.54, 'inf_curr':0.8, 'inf_5y':1.4, 'as_of':'08/31/14'},
        {'zone' : 'UK EuroZone', 'country': 'Italy', 'ten_curr':2.36, 'ten_one':2.25, 'ten_six':3.19, 'inf_curr':-0.2, 'inf_5y':1.7, 'as_of':'08/31/14'},
        {'zone' : 'UK EuroZone', 'country': 'Spain', 'ten_curr':2.15, 'ten_one':2.04, 'ten_six':3.18, 'inf_curr':-0.5, 'inf_5y':1.6, 'as_of':'08/31/14'}
  ];
  console.log($scope.rowCollection);
 // $scope.rowCollection : [
 //        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
 //        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
 //        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
 //    ];
 //  }

})//end dashboardctrl


;