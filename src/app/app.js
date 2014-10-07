angular.module( 'kitdash', [
	'kitdash.dashboard',
	'ui.router',
	'ui.bootstrap',
	'ui.bootstrap.tpls'
])

.run( ['$state', function($state) {
    console.log('go'); 
    $state.go("dashboard");
}]);