import React, {Component,createRef} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"

import {action_sample, action_fetchWeather} from "../actions" 
//if define just folder, it calls folder/index.js

class ActionSenderReduxReceiverSample extends Component{
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

  makeList(terms){
    console.log(terms);

    if(terms && terms.length){
      let i=0;
      return terms.map((x)=>(<li key={"key_"+(++i)} className="card-body">{x}</li>));
    }else{
      return <li className="card-body"><pre>{JSON.stringify(terms)}</pre></li>
    }
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
        <div className="card">
          <div className="card-body">
          <p>I received the value from Redux from Sample &amp; Weather Action!</p>
          <pre>{JSON.stringify(this.props.sample)}</pre>
          </div>
          <ul>
            {this.makeList(this.props.sample)}
          </ul>
        </div>
        <div className="card">
          <div className="card-body">
          <p>I received the value from Redux from Weather Action!</p>
          <pre>{JSON.stringify(this.props.weather)}</pre>
          </div>
          <ul>
            {this.makeList(this.props.weather)}
          </ul>
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

//this function will hand all states into props.
function mapStateToProp(state){ 
  //{sample} is abbreviation of funcName(state){\n const sample = state.sample ...
  // all argument is wrapped with {sample: XXX}
  return state;
}

//connect both sender and receiver
export default connect(mapStateToProp, mapDispatchToProps)(ActionSenderReduxReceiverSample);