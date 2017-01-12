// AN: we will create global variables that hold the state of our car selection

// <script src="https://www.gstatic.com/firebasejs/3.6.4/firebase.js"></script>

  // Initialize Firebase
			var config = {
			    apiKey: "AIzaSyA_qt-rn2gQiz-97PEOpYvcaqwnu34j6Lo",
			    authDomain: "buycar-88cbd.firebaseapp.com",
			    databaseURL: "https://buycar-88cbd.firebaseio.com",
			    storageBucket: "buycar-88cbd.appspot.com",
			    messagingSenderId: "185230057366"
			};
firebase.initializeApp(config);


var myVehicleSelection = {
	choice: '',
	price: 0
};

var myColorSelection = {
	choice: '',
	price: 0
};

var myPackageSelection = {
	choice: '',
	price: 0
};

$('body').on('click', '.vehicle-option', function() {
	var vehiclePrice = $(this).data('price');
	var vehicleChoice = $(this).data('option');
	$('.vehicle-display').attr('src', './assets/' + vehicleChoice +'.jpg');
	//console.log(vehicleImages);
    myVehicleSelection.price = vehiclePrice;
    myVehicleSelection.choice = vehicleChoice;
	displayCost();
});

$('body').on('click', '.color-option', function() {
	var colorPrice = $(this).data('price');
	var colorChoice = $(this).data('option');
    //myColorSelection = $(this).html(colorChoice + ': $' + colorPrice);
	myColorSelection.price = colorPrice;
    myColorSelection.choice = colorChoice;
    displayCost();

	//console.log(colorChoice + ': $' + colorChoice);
	// AN: Inside this click handler, update the "myColorOption" variable
});

$('body').on('click', '.package-option', function() {
	var packagePrice = $(this).data('price');
	var packageChoice = $(this).data('option');
    //myPackageSelection = $(this).html(packageChoice + ': $' + packagePrice);
    myPackageSelection.price = packagePrice;
    myPackageSelection.choice = packageChoice;
	//console.log(packageChoice + ': $' + packageChoice);
	displayCost();
});

$('.navigation').on('click', 'li', function() {
	$('.navigation li').removeClass('active');
	$(this).addClass('active');
	//$("li[data-tab]").attr();
    // $(this).attr('data-tab');

});

var vehicleOptions = [
	{choice: 'cadenza', price: 35000},
	{choice: 'forte'  , price: 20000},
    {choice: 'optima' ,	price: 29050},
    {choice: 'sedona' ,	price: 38650},
    {choice: 'soul'	  , price: 42200}
];

var colorOptions = [	
	{choice: 'black' ,	price: 50},
	{choice: 'white' ,	price: 100},
	{choice: 'silver' ,	price: 250}
];

var packageOptions = [
	{choice: 'Rear Camera', price: 150},
	{choice: 'LED Positioning Light', price: 150},
	{choice: 'Rear Camera and LED Positioning Light', price: 200}
];

var shoppingCart = {
    apple: {color: 'green', price: 1.09},
    avacado: {size: 'medium', price: 1.50},
    cereal: {brand: 'Cheerios', price: 3.25}
} 

var carSelection = {
	vehicle: {choice: 'Not Selected', price: 0},
	color: {choice: 'Not Selected', price: 0},
	package: {choice: 'Not Selected', price: 0},
	
}

$('#showme').on('click', function() {
	$('#home').hide();
	$('#showroom').show();
});

$('#save_my_car').on('click', function() {
		var carName;
		var optionName;
		var price;
		$('.summary-option-ul').find('li').map(function(i,n) {
			console.log('i',i,'n',n);
			optionName = $(n).find('strong');
			console.log('optionname:', optionName[0].innerHTML);
			carName = $(n).find('span');
			console.log('carname:', carName[0].innerHTML);
			

			var pattern = /\$(\d+)/;
			price = pattern.exec(n.innerHTML);
			console.log('price:',price[1]);
			var carObject = {'carname': carName[0].innerHTML, 'optionname': optionName[0].innerHTML, 'price': price[1]};
			var buycarReference = database.ref('car_settings');
 			buycarReference.push({
 				a_test: carObject
 			});

			//var getMyData = $(this).text();
        	//console.log(JSON.stringify(getMyData));
        	// var carObject = '{"Vehicle":"" , "Color":"" , "package":""}';
        	// var result = $.parseJSON(carObject);
        	// console.log(carObject);
//         	var resultJSON = '{"FirstName":"John","LastName":"Doe","Email":"johndoe@johndoe.com","Phone":"123 dead drive"}';
// var result = $.parseJSON(resultJSON);
// $.each(result, function(k, v) {
//     //display the key and value pair
//     alert(k + ' is ' + v);
	    });
	    
   //  		var buycarReference = database.ref('car_settings');
 		// 	buycarReference.push({
 		// 	a_test: getMyData
 		// 	})
 		// })
});

//var resultJSON = {console.log(JSON.stringify(getMyData)};


//By using jquery json parser

// var obj = $.parseJSON('{"name": "", "skills": "", "jobtitel": "Entwickler", "res_linkedin": "GwebSearch"}');
// alert(obj['jobtitel']);

// //By using javasript json parser
// var t = JSON.parse('{"name": "", "skills": "", "jobtitel": "Entwickler", "res_linkedin": "GwebSearch"}');
// alert(t['jobtitel'])

		//console.log("our function", this);
		// var data = getMyDataFromDOM();
		// console.log(JSON.stringify(data));
		// console.log(myVehicleSelection);
 		// console.log(myColorSelection);
 		// console.log(myPackageSelection);

function getData() {
	database.ref('car_settings').on('value', function (results) {
		var allData = results.val();
		var car_settings = [];
		for (var i in allData) {
			var context = {
				a_test: allData[i].a_test
			}
		}

	});
}

$('li').on('click', function() {
  var name = $(this).data('tab');
  //var yourChoice;
  
  
  
  switch(name) {
    case 'vehicle':
      displayVehicleOptions();
      //console.log(displayVehicleOptions);
      break;
    case 'color':
      displayColorOptions();
      //console.log(yourChoice;
      break;
    case 'package':
      displayPackageOptions();
      break;
    case 'summary':
      displaySummary();
    default:
      yourChoice = [];
      //console.log(yourChoice);
  }
});

function displayVehicleOptions() {
	var source = $('#vehicle-options-template').html();
	var template = Handlebars.compile(source);

	var newListItemHTML = '';
	for(var i = 0; i < vehicleOptions.length; i++) {
		var currentVehicle = vehicleOptions[i];
		var currentVehicleData = {
			feature: currentVehicle.choice,
			price: currentVehicle.price
		};
		var currentVehicleHTML = template(currentVehicleData);
		newListItemHTML += currentVehicleHTML;
	}
	$('#options-display').html(newListItemHTML);
}

function displayColorOptions() {
	var source = $('#color-options-template').html();
	var template = Handlebars.compile(source);

	var newListItemHTML = '';
	for(var i = 0; i < colorOptions.length; i++) {
		var currentColor = colorOptions[i];
		var currentColorData = {
			feature: currentColor.choice,
			price: currentColor.price
		};
		var currentColorHTML = template(currentColorData);
		newListItemHTML += currentColorHTML;
	}
	$('#options-display').html(newListItemHTML);
}

function displayPackageOptions() {
	var source = $('#package-options-template').html();
	var template = Handlebars.compile(source);

	var newListItemHTML = '';
	for(var i = 0; i < packageOptions.length; i++) {
		var currentPackage = packageOptions[i];
		var currentPackageData = {
			feature: currentPackage.choice,
			price: currentPackage.price
		};
		var currentPackageHTML = template(currentPackageData);
		newListItemHTML += currentPackageHTML;
	}
	$('#options-display').html(newListItemHTML);
}

function displaySummary() {
	var source = $('#summary-options-template').html();
	var template = Handlebars.compile(source);
	var newListItemHTML = '';
	var currentSelectionData = {
			vehicle: myVehicleSelection,
			color: myColorSelection,
			package: myPackageSelection
			
	};
	var currentSelectionHTML = template(currentSelectionData);
		newListItemHTML += currentSelectionHTML;
	$('#options-display').html(newListItemHTML);
}	


function displayCost() {
    var total = myVehicleSelection.price + myColorSelection.price + 
    myPackageSelection.price;


    //console.log(total);
    //console.log(myColorSelection.price);
    // console.log(myPackageSelection.price);
    //$('myVehicelSelection').val()

    $('.cost-display').html(total);

}

displayVehicleOptions();

// initialize the configuration of map
// MG: I wanted to use the Google map API and make a call to get nearby car dealers. Code below 
// works for a single marker. I used it in Unit 9 for the map. But I added code to get the
// request for nearby markers and it's not working. No biggie on this one though.
// 


var map;
var infowindow;

      function initMap() {
      	var pyrmont = {lat: 37.791705, lng: -122.422672};
      	map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 13
        });
        
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 5000,
          type: ['car_dealer']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }
	  function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
var database = firebase.database();



