var groupsController = angular.module("SearchApp" , [])
	.controller("SearchController", function($scope, $http){
		$scope.q = "";
		$scope.results = [];
		$scope.searching = false;
		$scope.search = function() {
			$scope.searching = true;
			$http.get("http://localhost:8090/search?q="+$scope.q)
				.then(function(response) {
				    $scope.results = response.data;
				    $scope.searching = false;
					var locations = [];
				    response.data.forEach(function(res){
				    	var loc = [res._source.name, res._source.latitude ,res._source.longitude ];
				    	locations.push(loc);
					});

				    var map = new google.maps.Map(document.getElementById('map_canvas'), {
				      zoom: 10,
				      center: new google.maps.LatLng(12.9747291,77.6093752), //My Location Hard Coded. Must be taken from the geolocation
				      mapTypeId: google.maps.MapTypeId.ROADMAP
				    });

				    var infowindow = new google.maps.InfoWindow();
				   
				    var marker, i;

				    for (i = 0; i < locations.length; i++) {  
				      marker = new google.maps.Marker({
				        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				        map: map
				      });

				      google.maps.event.addListener(marker, 'click', (function(marker, i) {
				        return function() {
				          infowindow.setContent(locations[i][0]);
				          infowindow.open(map, marker);
				        }
				      })(marker, i));
				    }

			  	}, function(response) {
					$scope.searching = false;
			  	});
		}

	});

//Custom Directives
groupsController
	.directive('ngEnter', function () {
        return function (scope, elements, attrs) {
            elements.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });