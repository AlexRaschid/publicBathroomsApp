 var locationOn = false;
 var locationCount = 1;
 var locationString;
 var lat;
 var long;
 var mapGlobal
 var currentInfoWindow;

 var mapurl = "https://api.mapbox.com/v4/mapbox.dark/" +
     long + "," + lat + "," +
     "10/600x600.png?access_token=pk.eyJ1IjoiZG9kZ2VyNDg3IiwiYSI6ImNpeXcxY2xraDAwZHUyd21wam00NWc5NXIifQ.VNP3UdlAUjSJVz3_FrBkEQ";


 $(document).ready(function() {




     $('#button').on('click', function(event) {
         //If location is turned off, then manualInput is ran first
         //If location is on, then manual input wont be used.
         if (!locationOn) {

             //TODO: make string input converted into longitude and latitude
             locationString = $('#inputLocation').val();
             var geocodeURL = makeGeocodeURL(locationString);


             $.get(geocodeURL, function(data) {
                 console.log(data);
                 console.log("Latitude: " + data.results["0"].geometry.location.lat);
                 console.log("Longitude: " + data.results["0"].geometry.location.lng);

                 let lat = data.results["0"].geometry.location.lat;
                 let lng = data.results["0"].geometry.location.lng;

                 initMap(lat, lng);
                 getLocation(lat, lng);



             });




         }
         else {
             //variable x marks the spotl geolocation method
             var x = navigator.geolocation;


             //Calls the getCurrentPosition method 
             x.getCurrentPosition(success, failure);

             //If the geolocation is able to be reached
             function success(position) {
                 //
                 let lat = position.coords.latitude;
                 let lng = position.coords.longitude;

                 console.log("Lat = " + lat);
                 console.log("Long hello= " + lng);
                 console.log("After hello");
                 var geoLat = lat;
                 var geoLng = lng;
                 console.log("After lat and lng set to new vars");
                 console.log("b4 initMap");
                 initMap(lat, lng);
                 console.log("after initMap");
                 getLocation(geoLat, geoLng);

             }



             //A function for if the geolocation cannot be grabbed
             function failure() {
                 console.log("The current co-ordenates are unavailable");
             }
         }


     });



     //Toggles on and off the location
     $('#buttonGeo').on('click', function(event) {
         locationCount++;
         if (locationCount % 2 == 0) {
             locationOn = true;
             console.log("GeoLocation turned on");
             $("#geoOn").css("background-color", "green")

         }
         else {
             locationOn = false;
             console.log("GeoLocation turned off");
             $("#geoOn").css("background-color", "red")


         }
     });

     //gets locaiton

     function getLocation(lat, lng) {

         var bathroomURL = "https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json" +
             "?&per_page=100" + //Number of object items in restroom APi
             "&lat=" + lat +
             "&lng=" + lng;

         console.log("Making RefugeRestroom request with params:", lat, lng);


         $.get(bathroomURL, function(data) {
             console.log(data);


             var myresult = "";
             $("#myresult").html(" ");


             var numOfLocations = 50;
             for (var i = 0; i < numOfLocations; i++) {
                 //TODO add map around here
                 myresult += "<li>------------------------------</li>";
                 myresult += "<li class='resultItem'>NAME: " + data[i].name + "</li>";
                 myresult += "<li class='resultItem'>STREET: " + data[i].street + "</li>";
                 myresult += "<li class='resultItem'>ACCESSIBLE: " + data[i].accessible + "</li>";
                 addicon(mapGlobal, data, i);


             }
             $("#result").html(myresult);



         })


     }





 })

 //Removes and replaces all spaces with + in the string.
 //Then will pass it through to the API Key
 //v

 // content_copy


 function makeGeocodeURL(locationString) {

     //Splits the string into each character and seperates them with commas
     //Using a for eac
     let locationStringTemp = locationString.split(' ').join('+');


     let geocodeKey = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationStringTemp + "&key=AIzaSyD1wqMJyEoUFEuvx1JffGaRgbeq1wRfngM";


     return geocodeKey;

 }

















    

 function addicon(map, URL_DATA, DATA_INDEX) {

     var marker = new google.maps.Marker({
         "position": {
             lat: URL_DATA[DATA_INDEX].latitude,
             lng: URL_DATA[DATA_INDEX].longitude
         },
         "map": map
     });
     //var contentString = "<li class='resultItem'>NAME: " + URL_DATA[DATA_INDEX].name + "</li>"

     var infowindow = new google.maps.InfoWindow({
         content: "<li class='resultItem'><b>Store Name</b>: " + URL_DATA[DATA_INDEX].name + "</li>" +
             "<li class='resultItem'><b>Street Adress</b>: " + URL_DATA[DATA_INDEX].street + "</li>" +
             "<li class='resultItem'><b>Is it accessible?</b>: " + URL_DATA[DATA_INDEX].accessible + "</li>" +
             "<li class='resultItem'><b>User Direction</b>: " + URL_DATA[DATA_INDEX].directions + "</li>" +
             "<li class='resultItem'><b>User Comment</b>: " + URL_DATA[DATA_INDEX].comment + "</li>"
     });
     marker.addListener('click', function() {
         
         // close the previously opened window
         if (currentInfoWindow) {
             currentInfoWindow.close();
         }
         
         // save this info window in an external variable
         currentInfoWindow = infowindow;
         
         // Open the window for this marker.
         infowindow.open(map, marker);
         
     });
     
     
         //  google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
    //      return function() {
    //          closeLastOpenedInfoWindo();
    //          infowindow.setContent(content);
    //          infowindow.open(map, marker);
    //          lastOpenedInfoWindow = infowindow;
    //      };
    //  })(marker, makrerdata[i], infowindow));



    //  function closeLastOpenedInfoWindo() {
    //      if (lastOpenedInfoWindow) {
    //          lastOpenedInfoWindow.close();
    //      }
    //  }

 }





 function initMap(lati, long) {
     // var uluru = {
     //     lat: lati,
     //     lng: long
     // };

     map = new google.maps.Map(document.getElementById('map'), {
         center: {
             lat: lati,
             lng: long
         },
         zoom: 15,
         //center: uluru
     });
     // var contentString = ;
     var infowindow = new google.maps.InfoWindow({
         content: "<h1>Current Location</h3>"
     });





     var pinColor = "41A317";
     var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
         new google.maps.Size(21, 34),
         new google.maps.Point(0, 0),
         new google.maps.Point(10, 34));


     console.log("Marker attempts");
     var marker = new google.maps.Marker({
         "position": {
             lat: lati,
             lng: long
         },
         "map": map,
         "icon": pinImage
     });
     marker.addListener('click', function() {
         infowindow.open(map, marker);
     });

     mapGlobal = map;




     // addicon(map, 40.750, -73.993, 'penn station');
     // addicon(map, 40.754, -73.990, 'harlem');
 }

 // infoWindow = new google.maps.InfoWindow; //static infoWindow for all your markers
 // google.maps.event.addDomListener(window, 'load', function() {
 //   //create your markers here
 //   google.maps.event.addListener(marker, 'click', function() {
 //               infoWindow.open(map1, marker); //take care with case-sensitiveness
 //           });
 // });
























 //API Documentation:
 //https://www.refugerestrooms.org/api/docs/#!/restrooms/GET_version_restrooms_format
 //API key based on location
 //https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=40.7128%C2%B0&lng=-74.0059
 // Mapbox API:
 // https://www.mapbox.com/api-documentation/?language=JavaScript#static
 