import React,{Component} from "react";
import Map from "../Components/Map";

export default class MapTest extends Component{
  constructor(props){
    super(props);
    this.state = {
      mapInfo:{
        lat: 36.51,
        lng: 140.00000,
        width: document.width+"px",
        height: "300px",/* don't use document.height */
        zoom: 22, /*1~22 */
      }
    };
    console.log("height:"+document.width);
    this.OnBtnClick = this.OnBtnClick.bind(this);
  }
  OnBtnClick(e, lat,lng){
    e.preventDefault();
    this.setState({mapInfo:{lat:lat, lng:lng}});
    console.log(this.state.mapInfo);
  }
  render(){
    return (
      <div>
        <Map info={this.state.mapInfo} ></Map>
        <input type="button" className="btn btn-dark" onClick={e=>this.OnBtnClick(e, 36.5,42.0)} vlaue="36.5,42.0"></input>
        <button className="btn btn-dark" onClick={e=>this.OnBtnClick(e, 37.5,42.0)}>37.5,42.0</button>
      </div>
    );
  }
}