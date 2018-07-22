import React, {Component,createRef} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"

import {action_sample, action_fetchWeather} from "../actions" 
//if define just folder, it calls folder/index.js

class ActionSenderSample extends Component{
  constructor(props){
    super(props);
    this.actionRef1 = createRef();
    this.actionRef2 = createRef();
  }
  OnSampleAction(e){
    //Be careful! Don't call action_sample itself..
    // this.props.action_sample is profer call that invoke redux action creator!
    this.props.action_sample(this.actionRef1.current.value);
  }
  OnForecastAction(e){
    this.props.action_fetchWeather(this.actionRef2.current.value);
  }
  render(){
    return (
      <div className="container-fluid">
        <p>I will send action </p>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Sample Action</span>
          </div>
          <input ref={this.actionRef1} type="text" className="form-control" placeholder="Action term ( ex> test )" aria-label="term" aria-describedby="basic-addon1"/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={e=>this.OnSampleAction(e)}>SendAction(Sample)</button>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Forecast Action</span>
          </div>
          <input ref={this.actionRef2} type="text" className="form-control" placeholder="put place name(in US).. ex> San Antonio" aria-label="term" aria-describedby="basic-addon1"/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={e=>this.OnForecastAction(e)}>SendAction(Sample)</button>
          </div>
        </div>
      </div>
    )
  }
}

//this function is for transform the data from redux into your component.
//the argument will be the state that redux will return.
//and you only receive the state you need.
function mapDispatchToProps(dispatch){ 
  return bindActionCreators({action_sample, action_fetchWeather}, dispatch);
}

export default connect(null, mapDispatchToProps)(ActionSenderSample);