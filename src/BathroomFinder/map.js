import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=20&offset=0&lat=40.7367&lng=-73.9899



export class BathroomMap extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            refugeAPI: "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=20&offset=0&lat=40.7367&lng=-73.9899",
            gmapsAPI: "https://maps.googleapis.com/maps/api/js?key="+ this.API_KEY +"&callback=initMap",
            center: {
                lat: 40.7367,
                lng: -73.9899
              },
            zoom: 15,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            infoWindowOpen: false,
        }

        this.handleToggleOpen = this.handleToggleOpen.bind(this);
    }

    handleToggleOpen = () => {
        console.log("Marker Clicked");
        this.setState({
           infoWindowOpen: !this.state.infoWindowOpen,
        });
    }

    render() {
        return (
            
                <Map google={window.google} zoom={14} initialCenter={this.state.center}>
                    <Marker onClick={this.handleToggleOpen}
                        name={'Current location'} />
                    <InfoWindow open={this.state.infoWindowOpen} onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>Marker Info Placeholder</h1>
                        </div>
                    </InfoWindow>
                </Map>
            
        );
    }
}

BathroomMap = GoogleApiWrapper({
    apiKey: ("AIzaSyCZ6cSChM_EVpFY_iYNeo_plSDBogPYoPY")
  })(BathroomMap)