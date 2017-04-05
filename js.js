$(document).ready(function() {
    var locationOn = false;
    var inputFieldUsed = false;
    var locationCount = 1;
    var locationString;
    var lat;
    var long;
    var mapurl = "https://api.mapbox.com/v4/mapbox.dark/" +
                long + "," + lat + "," +
                "10/600x600.png?access_token=pk.eyJ1IjoiZG9kZ2VyNDg3IiwiYSI6ImNpeXcxY2xraDAwZHUyd21wam00NWc5NXIifQ.VNP3UdlAUjSJVz3_FrBkEQ";
    
                

                
    $('#button').on('click', function(event) {
        if( true ){

            //TODO: make string input converted into longitude and latitude
             locationString = $('#inputLocation').val();
             var locationLatLong = geocode(locationString);
             
             
            $.get(locationLatLong, function(data){
                console.log(data);
                console.log("Longitude: " + data);
                 
                
                
            });
            
             
             
             

            
        }if(locationOn && !inputFieldUsed){
            //variable x marks the spotl geolocation method
            var x = navigator.geolocation;
    
    
            //Calls the getCurrentPosition method 
            x.getCurrentPosition(success, failure);
    
            //If the geolocation is able to be reached
            function success(position) {
                //
                lat = position.coords.latitude;
                long = position.coords.longitude;
                
                console.log("Lat = " + lat);
                console.log("Long = " + long);
                
                var geoLat = lat;
                var geoLong = long;
                
                getLocation(geoLat,geoLong);
                
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
    
    function getLocation(lat,long){
         
         var URL = "https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json" +
            "?lat=" + lat +
            "&lng=" + long;
         
         
         $.get(URL, function(data) {


            var myresult = "";
            $("#myresult").html(" ");
            
            for (var i = 0; i < 10; i++) {
                //TODO add map around here
                myresult += "<li>------------------------------</li>";
                myresult += "<li class='resultItem'>NAME: " + data[i].name + "</li>";
                myresult += "<li class='resultItem'>STREET: " + data[i].street + "</li>";
                myresult += "<li class='resultItem'>ACCESSIBLE: " + data[i].accessible + "</li>";

                //updateMap(lat,long, 15);


            }
            $("#result").html(myresult);



        })
        
        
    }
    
    
    
    
    
})    
    
    //Removes and replaces all spaces with + in the string.
    //Then will pass it through to the API Key
    //v

// content_copy


function geocode(locationString){
    
    //Splits the string into each character and seperates them with commas
    //Using a for eac
    let locationStringTemp = locationString.replace(' ', '+');
           
       
    let geocodeKey = "https://maps.googleapis.com/maps/api/geocode/json?address="+ locationStringTemp +"=AIzaSyD1wqMJyEoUFEuvx1JffGaRgbeq1wRfngM"
       
           
    return geocodeKey;       
           
}
   

    

var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.8448, lng: -73.8648},
          zoom: 8
        });
      }



//API Documentation:
//https://www.refugerestrooms.org/api/docs/#!/restrooms/GET_version_restrooms_format
//API key based on location
//https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=40.7128%C2%B0&lng=-74.0059
// Mapbox API:
// https://www.mapbox.com/api-documentation/?language=JavaScript#static