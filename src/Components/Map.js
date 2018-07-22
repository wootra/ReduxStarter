import React,{Component} from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD0fLXqX1Xodcz5QhzNQVSLaPijckxd8ug&v=3.exp&libraries=geometry,drawing,places&language=ko",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: '100%', width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={props.zoom} defaultCenter={{ lat: props.info.lat, lng: props.info.lng }}>
    <Marker position={{ lat: props.info.lat, lng: props.info.lng }} />
  </GoogleMap>
));

export default class Map extends Component{
  render(){
    let wid = this.props.info.width ? this.props.info.width : "100px";
    let hig = this.props.info.height ? this.props.info.height : "200px";
    let zoom = this.props.info.zoom ? this.props.info.zoom : 8;
    let props = {...this.props, zoom:zoom};
    return (
    <div style={{width:wid, height:hig}}>
      <MyMapComponent {...props}/>
    </div>)
  }
}
