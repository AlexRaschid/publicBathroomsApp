$(document).ready(function() {
    var locationOn = false;
    var locationCount = 1;
    var locationString;
    var lat;
    var long;
    var mapurl = "https://api.mapbox.com/v4/mapbox.dark/" +
                long + "," + lat + "," +
                "10/600x600.png?access_token=pk.eyJ1IjoiZG9kZ2VyNDg3IiwiYSI6ImNpeXcxY2xraDAwZHUyd21wam00NWc5NXIifQ.VNP3UdlAUjSJVz3_FrBkEQ";
    
                

                
    $('#button').on('click', function(event) {
        if(locationOn){
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
                
                getGeoLocation(geoLat,geoLong);
                
            }
            

    
            //A function for if the geolocation cannot be grabbed
            function failure() {
                console.log("The current co-ordenates are unavailable");
            }
        }else{
            //TODO: make string input converted into longitude and latitude
             locationString = $('#inputLocation').val();
             lat = locationString.substring(0, locationString.indexOf(' '));
             long = locationString.substring(locationString.indexOf(' ') + 1, locationString.length - 1);
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
    
    function getGeoLocation(lat,long){
         
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
                updateMap(lat,long, 15);


            }
            $("#result").html(myresult);



        })
        
        
    }
    
    
    
    
    
})    
    
    
    




function updateMap(lat, long, zoom){
   
    $("#map").attr("src", "https://api.mapbox.com/v4/mapbox.dark/0,0,3/600x600.png?access_token=pk.eyJ1IjoiZG9kZ2VyNDg3IiwiYSI6ImNpeXcxY2xraDAwZHUyd21wam00NWc5NXIifQ.VNP3UdlAUjSJVz3_FrBkEQ")
    
        var url = "https://api.mapbox.com/v4/mapbox.dark/" + long + "," + lat + "," + zoom + "/600x600.png?access_token=pk.eyJ1IjoiZG9kZ2VyNDg3IiwiYSI6ImNpeXcxY2xraDAwZHUyd21wam00NWc5NXIifQ.VNP3UdlAUjSJVz3_FrBkEQ"
    
        $("#map").attr("src", url);
}




//API Documentation:
//https://www.refugerestrooms.org/api/docs/#!/restrooms/GET_version_restrooms_format
//API key based on location
//https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=40.7128%C2%B0&lng=-74.0059
// Mapbox API:
// https://www.mapbox.com/api-documentation/?language=JavaScript#static