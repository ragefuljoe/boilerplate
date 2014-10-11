angular.module( 'kitdash', [
	'kitdash.dashboard',
	'ui.router',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
	'smart-table',
	// 'nvd3ChartDirectives'
	'nvd3'

])

.run( ['$state', function($state) {
    console.log('go'); 
    $state.go("dashboard");
}]);