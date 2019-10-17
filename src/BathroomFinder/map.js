import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class BathroomMap extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            API_KEY: "AIzaSyCZ6cSChM_EVpFY_iYNeo_plSDBogPYoPY",
            API: "https://maps.googleapis.com/maps/api/js?key="+ this.API_KEY +"&callback=initMap",
            center: {
                lat: 40.7367,
                lng: -73.9899
              },
            zoom: 15,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
    }

    render() {
        return (
            <div style={{width: '100vw', height: '100vh'}}>
                <Map google={window.google} zoom={14} initialCenter={this.state.center}>
                </Map>
            </div>
        );
    }
}

BathroomMap = GoogleApiWrapper({
    apiKey: ("AIzaSyCZ6cSChM_EVpFY_iYNeo_plSDBogPYoPY")
  })(BathroomMap)