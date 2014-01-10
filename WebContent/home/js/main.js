function loadRandomImages(scope, GloriaAPI, count, timeout) {
	scope.slides = [];

	console.log("loading images");

	GloriaAPI.getRandomImages(count, function(imgraw) {
		if (imgraw != null && imgraw != 'null' && imgraw != '') {
			var index = 0;

			imgraw.forEach(function(element) {

				var slide = {
					image : element.jpg,
					id : element.id,
					date : element.creationDate,
					rt : element.rt
				};

				if (index == 0) {
					slide.active = true;
				} else {
					slide.active = false;
				}

				scope.addSlide(slide);

				index++;
			});
		}

		scope.timer = timeout(scope.loadCarousel, 500);

	}, function(data, status) {
		console.log('error', data, status);
		scope.loading = false;
	}, function() {
		scope.$emit('unauthorized');
	});
}

function MainImagesCtrl($scope, GloriaAPI, $timeout, $gloriaLocale) {
	$gloriaLocale.loadResource('home/lang', 'home');
	
	$scope.myInterval = 1000;
	$scope.slides = [];
	$scope.loading = false;
	$scope.date = null;

	$scope.loading = true;
	loadRandomImages($scope, GloriaAPI, 20, $timeout);

	$scope.addSlide = function(slideData) {
		console.log('slide added: ' + slideData);
		$scope.slides.push(slideData);
	};

	$scope.loadCarousel = function() {
		$('#main_carousel').barousel({
			navType : 2,
			manualCarousel : 0,
			slideDuration : 3000,
			contentResize : 0
		});

		$scope.loading = false;
	};
}