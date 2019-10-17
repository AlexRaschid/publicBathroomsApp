import React from 'react';

export class BathroomMap extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            API_KEY: "AIzaSyCZ6cSChM_EVpFY_iYNeo_plSDBogPYoPY",
            API: "https://maps.googleapis.com/maps/api/js?key="+ this.API_KEY +"&callback=initMap"
        }
    }

    componentDidMount(){
        this.loadMap();
    }


    loadMap = () =>{
        this.loadScript("https://maps.googleapis.com/maps/api/js?key="+ this.state.API_KEY +"&callback=initMap");
        window.initMap = this.initMap;
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map_canvas', {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        }));

        //return map;
    }

    loadScript(url){
        const index = window.document.getElementsByTagName("script")[0];
        const script = window.document.createElement("script");
        script.src = url;
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        index.parentNode.insertBefore(script, index);
        
    }
    /*
        <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
        </script>
    */



    render() {
        return (
           <main> <div id="map_canvas"></div></main>
        );
    }
}