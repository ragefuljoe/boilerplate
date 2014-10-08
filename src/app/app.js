angular.module( 'kitdash', [
	'kitdash.dashboard',
	'ui.router',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
	'smart-table'

])

.run( ['$state', function($state) {
    console.log('go'); 
    $state.go("dashboard");
}]);