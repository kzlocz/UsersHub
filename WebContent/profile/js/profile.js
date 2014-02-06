function ProfileController($scope, $gloriaAPI, $timeout, $gloriaLocale) {
	
	$scope.ready = false;
	
	$gloriaLocale.loadResource('profile/lang', 'profile', function() {
		$scope.ready = true;
	});
}