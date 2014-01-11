'use strict';

function loadImages(scope, $gloriaAPI, date, timeout) {
	scope.slides = [];

	console.log("loading images");

	if (date != null) {

		$gloriaAPI.getImagesByDate(date.getFullYear(), date.getMonth() + 1, date
				.getDate(), function(imgraw) {
			if (imgraw != null && imgraw != 'null' && imgraw != '') {
				var index = 0;

				imgraw.forEach(function(element) {

					var slide = {
						image : element.jpg,
						id : element.id,
						date : element.creationDate, //new Date(element.creationDate).toUTCString(),
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
}

function CarouselCtrl($scope, $gloriaAPI, $timeout, $gloriaLocale) {
	
	$gloriaLocale.loadResource('images/lang', 'images');
	
	$scope.myInterval = 1000;
	$scope.slides = [];
	$scope.loading = false;
	$scope.date = null;

	$scope.$watch('date', function() {
		if ($scope.date != null) {
			$scope.loading = true;
			loadImages($scope, $gloriaAPI, $scope.date, $timeout);
		}
	});

	$scope.addSlide = function(slideData) {
		console.log('slide added: ' + slideData);
		$scope.slides.push(slideData);
	};

	$scope.loadCarousel = function() {
		$('#any_id').barousel({
			navType : 2,
			manualCarousel : 1,
			slideDuration : 3000,
			contentResize : 0
		});

		$scope.loading = false;
	};
}
