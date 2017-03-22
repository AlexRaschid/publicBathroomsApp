$(document).ready(function(){
    //In key, client_id, client_secret, and version(YYYYMMDD) are all pameters. New parameter should me + & 

    $('button').on('click', function(event) {

        
        
        
        
        
       // navigator.geolocation.getCurrentPosition(function(position) {
    //        do_something(position.coords.latitude, position.coords.longitude);
     //   });
        

        var location = $('#inputLocation').val();
        var lat = location.substring(0, location.indexOf(' '));
        var long = location.substring(location.indexOf(' ')+ 1, location.length - 1 );
       
        var URL = "https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json" +
        "?lat="+ lat +
        "&lng="+ long;


        // "?lat=40.7358630"+
        // "&lng=-73.9910830";





        $.get(URL, function(data) {
            
            var myresult = "";
            for (var i = 0; i < 10; i++) {
                myresult += "<li>------------------------------</li>";
                myresult += "<li>NAME: " + data[i].name + "</li>";
                myresult += "<li>STREET: " + data[i].street + "</li>";


            }
            $("#result").html(myresult);
            
            
            
        })
    });

    
})






        //API Documentation:
        //https://www.refugerestrooms.org/api/docs/#!/restrooms/GET_version_restrooms_format
        //API key based on location
        //https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=40.7128%C2%B0&lng=-74.0059
        //HTML Geolocation:
        //
        
        
        