$(document).ready(function() {
    var locationOn = false;
    var locationCount = 1;
    var locationString;
    var lat;
    var long;
    var map;
    var mapurl = "https://api.mapbox.com/v4/mapbox.dark/" +
                long + "," + lat + "," +
                "10/600x600.png?access_token=pk.eyJ1IjoiZG9kZ2VyNDg3IiwiYSI6ImNpeXcxY2xraDAwZHUyd21wam00NWc5NXIifQ.VNP3UdlAUjSJVz3_FrBkEQ";
                

                
    $('#button').on('click', function(event) {
        //If location is turned off, then manualInput is ran first
        //If location is on, then manual input wont be used.
        if( !locationOn ){

            //TODO: make string input converted into longitude and latitude
             locationString = $('#inputLocation').val();
             var geocodeURL = makeGeocodeURL(locationString);
             
             
            $.get(geocodeURL, function(data){
                console.log(data);
                console.log("Latitude: " + data.results["0"].geometry.location.lat);
                console.log("Longitude: " + data.results["0"].geometry.location.lng);
                
                let lat = data.results["0"].geometry.location.lat;
                let lng = data.results["0"].geometry.location.lng;
                
                initMap(lat, lng);
                getLocation(lat,lng);
 
                
                
            });
             
             

            
        }else{
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
                console.log("Long = " + lng);
                
                let geoLat = lat;
                let geoLng = lng;
                
                initMap(lat, lng);
                getLocation(geoLat,geoLng);
                
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
        if(locationCount % 2 == 0){
            locationOn = true;
            console.log("GeoLocation turned on");
            $("#geoOn").css("background-color", "green")
            
        }else{
            locationOn = false;
            console.log("GeoLocation turned off");
            $("#geoOn").css("background-color", "red")


        }
    });
    
    //gets locaiton
    
    function getLocation(lat,lng){
         
         var bathroomURL = "https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json" +
            "?lat=" + lat +
            "&lng=" + lng;
         
         
         $.get(bathroomURL, function(data) {
            
            
            var myresult = "";
            $("#myresult").html(" ");
            
            for (var i = 0; i < 10; i++) {
                //TODO add map around here
                myresult += "<li>------------------------------</li>";
                myresult += "<li class='resultItem'>NAME: " + data[i].name + "</li>";
                myresult += "<li class='resultItem'>STREET: " + data[i].street + "</li>";
                myresult += "<li class='resultItem'>ACCESSIBLE: " + data[i].accessible + "</li>";
                addicon(map, data, i, lat, lng);


            }
            $("#result").html(myresult);



        })
        
        
    }
    
    
    
    
    
})    
    
    //Removes and replaces all spaces with + in the string.
    //Then will pass it through to the API Key
    //v

// content_copy


function makeGeocodeURL(locationString){
    
    //Splits the string into each character and seperates them with commas
    //Using a for eac
    let locationStringTemp = locationString.split(' ').join('+');
           
       
    let geocodeKey = "https://maps.googleapis.com/maps/api/geocode/json?address="+ locationStringTemp +"&key=AIzaSyD1wqMJyEoUFEuvx1JffGaRgbeq1wRfngM";
       
           
    return geocodeKey;       
           
}

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      

function addicon(map,URL_DATA, DATA_INDEX, lati, long) {
    var marker = new google.maps.Marker({
        "position": {
            lat: lati,
            lng: long
        },
        "map": map
    });
    //var contentString = "<li class='resultItem'>NAME: " + URL_DATA[DATA_INDEX].name + "</li>"
    
    
    
    var infowindow = new google.maps.InfoWindow({
        content: "<li class='resultItem'>NAME: " + URL_DATA[DATA_INDEX].name + "</li>"
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
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
    var marker = new google.maps.Marker({
        position: {
            lat: lati,
            lng: long
        },
        map: map
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    // addicon(map, 40.750, -73.993, 'penn station');
    // addicon(map, 40.754, -73.990, 'harlem');
}     
     
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      



//API Documentation:
//https://www.refugerestrooms.org/api/docs/#!/restrooms/GET_version_restrooms_format
//API key based on location
//https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=40.7128%C2%B0&lng=-74.0059
// Mapbox API:
// https://www.mapbox.com/api-documentation/?language=JavaScript#static