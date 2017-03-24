angular.module('app.controllers', ['ngCordova','720kb.datepicker',])

.controller('accueilCtrl', ['$scope', '$stateParams', '$http', 'CustomFactory', 'BlankService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, CustomFactory, BlankService) {
		console.log("coucou");
		BlankService.sendMessage();
		$http({
  	method: 'GET',
  	url: 'http://NANTES-0156.sii.fr:4444/' + 'getAllEvent'
	}).then(function successCallback(response) {
		$scope.ListEvent = response.data.ArrayList;

		$scope.passEvent = function (event){
			CustomFactory.saveEvent(event);
		}
		console.log( $scope.ListEvent);
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs");
		console.log(response);
		});

}])

.controller('rechercheCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('carteCtrl', ['$scope', '$stateParams', '$http','$compile','CustomFactory','$window',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $compile,CustomFactory,$window) {

	$scope.addMarker = function (pos, texte, numero){
		var mark = new google.maps.Marker({position:pos});
		mark.setMap($scope.map);
		var infoEvent = new google.maps.InfoWindow({
			content: "<div style=\"display:inline-block\"><img src=\"img/logo.png\"style=\"display:inline;width:50px;height:50px;\"></div>" +
					"<div style=\"display:inline-block\"><p>" + texte + " Le " + numero + "</p><p>***</p></div>"
		});
		mark.addListener('click', function(){
			infoEvent.open($scope.map, mark);
		})
	}

	$scope.getDetailsEvent = function(event){
		CustomFactory.saveEvent(event);
		$window.location.href="/#/side-menu21/page13"
	}

	$http({
		method: 'GET',
		url: 'http://NANTES-0156.sii.fr:4444/' + 'getAllEvent'
	}).then(function successCallback(response) {
		$scope.ListEvent = response.data.ArrayList;

		var options = {timeout: 10000, enableHighAccuracy: true};
		var latLng = new google.maps.LatLng(47.2112216, -1.5570168);
		var mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
		var infowindow = new google.maps.InfoWindow();
		google.maps.event.addListener($scope.map, 'click', function(evt) {
	    evt.stop()
	    console.log(evt.placeId);
			if (evt.placeId != null){
	    infowindow.setContent(evt.placeId+"<button type='button'>Creer un évenement</button>");
	    infowindow.setPosition(evt.latLng);
	    infowindow.open($scope.map);
		}
	  });

		var service = new google.maps.places.PlacesService($scope.map);

		$scope.addMarker = function (place,marker,i){
			marker.addListener('click', function() {
				var contentPlace = '<div style=\"display:inline-block\"><img src=\"'+ place.icon+' \"style=\"display:inline;width:50px;height:50px;\"></div> <div style=\"display:inline-block\"><p><b>'+ place.name + '</b></p> <p>'+ place.address_components[0].short_name + " " + place.address_components[1].short_name + " " + place.address_components[2].short_name +' </p> </div> <br/> <p> ------------------------------------------------------------------------------------------------ </p>';
				var contentEvent = '<div style=\"display:inline-block\"><img src=\"http://www.peniche-marcounet.fr/wp-content/uploads/2016/03/afterwork-sympa.jpg\"style=\"display:inline;width:50px;height:50px;\"><div ui-sref=\"menu.detailsEvent()\" style=\"display:inline-block\"><p><b>'+ $scope.ListEvent[i-1].Name +'</b></p> <p>'+ $scope.ListEvent[i-1].Description +'</p> <p>'+ 'Du ' + $scope.ListEvent[i-1].Datestart + ' au ' + $scope.ListEvent[i-1].Dateend +'</p> <button type="button" onclick="getDetailsEvent('+ $scope.ListEvent[i-1] +')">Voir l evenement</button></div>';
				var compileEvent = $compile(contentEvent)($scope);
				infowindow.setContent(contentPlace + contentEvent);
				infowindow.open(map, this);
			});
		}
		for ( var identDorian=0; identDorian<$scope.ListEvent.length; identDorian++){
			service.getDetails({
				 placeId: $scope.ListEvent[identDorian].Placeid
			 }, function(place, status) {
				 if (status === google.maps.places.PlacesServiceStatus.OK) {
					 var marker = new google.maps.Marker({
						 map: $scope.map,
						 position: place.geometry.location
					 });
					 console.log(identDorian);
					 $scope.addMarker(place,marker,identDorian);
				 }
			 });
		}
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs dans la map!")
	});

}])

.controller('footEnSalleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  //sum to test jasmine/karma
  $scope.sum = function() {
   $scope.z = $scope.x + $scope.y;
  };

}])

.controller('afterworkCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('dejTechCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('mesVenementsCtrl', ['$scope', '$stateParams', '$cordovaDatePicker',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaDatePicker) {

}])

.controller('crErUnVenementCtrl', ['$scope', '$stateParams','$window', '$cordovaDatePicker', '$http','CustomFactory','ConnectedUserService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $cordovaDatePicker, $http, CustomFactory, ConnectedUserService) {
	console.log("Creation d'un evenement");
	$scope.saveEvent = function(){
		var send = true;

		if(document.getElementById("selectedDate").value == ""){
			$scope.erreurDate = ": Date invalide"
			send= false;
		}else{
			$scope.erreurDate = ""
		}
		if(document.getElementById("horaireDebut").value == ""){
			$scope.erreurHoraireDebut = ": Heure invalide";
			send = false;
		}else{
			$scope.erreurHoraireDebut = "";
		}
		if(document.getElementById("horaireFin").value == ""){
			$scope.erreurHoraireFin = ": Heure invalide";
			send = false;
		}else{
			$scope.erreurHoraireFin = "";
		}
		if(document.getElementById("lieu").value == ""){
			$scope.erreurLieu = ": Lieu invalide";
			send = false;
		}else {
			$scope.erreurLieu = ""
		}

		if (send){
			var ownerToSend = ConnectedUserService.getConnectedUser();
			console.log(ownerToSend);
			$http({
				method: 'POST',
				url: 'http://localhost:4444/saveEvent',
				data: {
					Name: document.getElementById("nomEvenement").value,
					Datestart: document.getElementById("selectedDate").value + " " + document.getElementById("horaireDebut").value,
					Dateend: document.getElementById("selectedDate").value + " " + document.getElementById("horaireFin").value,
					Placeid: document.getElementById("lieu").value,
					Description: document.getElementById("description").value,
					Image: document.getElementById("image").value,
					Iscanceled: 0,
					Owner: ownerToSend
				}
			}).then(function successCallback(response) {
				console.log("message send");
				console.log(response.data.Event);
				CustomFactory.saveEvent(response.data.Event);
				$window.location.href = 'menu.detailsEvent';
			}, function erroCallabck(response) {
				console.log(response);
				console.log("Envoi formulaire creation d'evenement: Il y a eu des erreurs!");
			});
		}

	}

}])


.controller('suggestionCtrl', ['$scope', '$stateParams','$http','ConnectedUserService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, ConnectedUserService) {
  $http({
    method: 'GET',
    url: 'http://NANTES-0156.sii.fr:4444/' + '/getPerson?id=1'
  }).then(function successCallback(response) {
		ConnectedUserService.setConnectedUser(response.data.Person);
  }, function erroCallabck(response) {
    console.log("Il y a eu des erreurs!")
  });

}])

.controller('evaluerEvenementCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('detailsEventCtrl', ['$scope', '$stateParams', '$http','CustomFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, CustomFactory) {

	var event = CustomFactory.getEvent();
	$scope.getCommentMargin = function(owner){
		if (owner == null){
			return "0%";
		}else {
			return "5%";
		}
	}
	$scope.detailsParticipant = function(){
		var div = document.getElementById("participantDiv");
		if (div.style.display == 'none'){
			div.style.display = 'block';
		}else{
			div.style.display = 'none';
		}
	}
	$scope.TitleEvent = event.Name;
	$scope.sourceImgEvent = "img/defaultImage.jpg";
	$scope.descriptionEvent = event.Description;
	$scope.dateStartEvent = event.Datestart;

	$http({
		method: 'GET',
		url: 'http://NANTES-0156.sii.fr:4444/' + 'getCommentByEvent?id=' + $stateParams.id
	}).then(function successCallback(response) {
		$scope.ListComment = response.data;
	}, function erroCallabck(response) {
		console.log("Il y a eu des erreurs!")
	});

	$http({
		method: 'GET',
		url: 'http://localhost:4444/getAllParticipantById?id=' + $stateParams.id
	}).then(function successCallback(response) {
		$scope.ListParticipant = response.data;
		$scope.nbParticipants = $scope.ListParticipant.length;
	}, function erroCallabck(response) {
		console.log("Participant: Il y a eu des erreurs!")
	});
	/*console.log($stateParams.event)
	console.log($stateParams.event.Name)*/
}])
