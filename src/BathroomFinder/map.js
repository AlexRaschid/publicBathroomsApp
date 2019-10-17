import React from 'react';
import GoogleMapReact from 'google-map-react';

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
              zoom: 15
        }
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: this.state.API_KEY}}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                    
                </GoogleMapReact>

            </div>
        );
    }
}