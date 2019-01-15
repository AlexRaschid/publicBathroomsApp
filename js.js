 //Global Variables
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
         
         //Deals with manual input if geoLocation turned OFF
         if (!locationOn) {
             //Takes put from html bar
             locationString = $('#inputLocation').val();
             //Geocodes manual input
             var geocodeURL = makeGeocodeURL(locationString);
             //Adds markers/initalizs map on page
             $.get(geocodeURL, function(data) {
                 console.log(data);
                 let lat = data.results["0"].geometry.location.lat;
                 let lng = data.results["0"].geometry.location.lng;
                 initMap(lat, lng);
                 getLocation(lat, lng);
             });
             
         //Deals with geolocation
         } else {
             //variable x marks the spotl geolocation method
             var x = navigator.geolocation;
             //Calls the getCurrentPosition method 
             x.getCurrentPosition(success, failure);
             //If the geolocation is able to be reached
             function success(position) {
                 //capturing the lat and long co-ordinates of current position
                 let lat = position.coords.latitude;
                 let lng = position.coords.longitude;
                 
                 //re assigns lat/lng to variables. Solves some type of error.
                 //That wont parse
                 var geoLat = lat;
                 var geoLng = lng;
                 
                 //Adds reveals map to page
                 initMap(lat, lng);
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

         } else {
             locationOn = false;
             console.log("GeoLocation turned off");
             $("#geoOn").css("background-color", "red")


         }
     });

     //Function that retrieves the location, or more rather prints all the stores
     //Onto the google map
     function getLocation(lat, lng) {
         var bathroomURL = "https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json" +
             "?&per_page=100" + //Number of object items in restroom APi
             "&lat=" + lat +
             "&lng=" + lng;
             
         //Parses api data through and prints the numofLocations
         $.get(bathroomURL, function(data) {
             var numOfLocations = 50;
             for (var i = 0; i < numOfLocations; i++) {   
                 addicon(mapGlobal, data, i);
             }
             $("#result").html(myresult);
         })
     }
 })

 //Removes and replaces all spaces with + in the string.
 //Then will pass it through to the API Key
 function makeGeocodeURL(locationString) {
     //Splits the string into each character and seperates them with commas
     var locationStringTemp = locationString.split(' ').join('+');
     var geocodeKey = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationStringTemp + "&key=AIzaSyD1wqMJyEoUFEuvx1JffGaRgbeq1wRfngM";
     return geocodeKey;
 }



  //Function to add a bathrooom icon
   function addicon(map, URL_DATA, DATA_INDEX) {
     var marker = new google.maps.Marker({
         "position": {
             lat: URL_DATA[DATA_INDEX].latitude,
             lng: URL_DATA[DATA_INDEX].longitude
         },
         "map": map
     });



     //Adds the api api data foor different catigories, such ass Street Adress and accessible
     
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
 }



    //Function that sets the focus location of the map
    function initMap(lati, long) {
     map = new google.maps.Map(document.getElementById('map'), {
         center: {
             lat: lati,
             lng: long
         },
         zoom: 15,
         //center: uluru
     });
     
     
     
     
     //Code for making the center dot on the google map
     var infowindow = new google.maps.InfoWindow({
         content: "<h1>Current Location</h3>"
     });
     var pinColor = "41A317";
     var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
         new google.maps.Size(21, 34),
         new google.maps.Point(0, 0),
         new google.maps.Point(10, 34));
         
     //Function that adds the center marker/pin
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
 }

 //API Documentation:
 //https://www.refugerestrooms.org/api/docs/#!/restrooms/GET_version_restrooms_format
 
 //API key based on location
 //https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=40.7128%C2%B0&lng=-74.0059