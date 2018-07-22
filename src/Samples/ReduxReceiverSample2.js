import React, {Component} from "react";
import {connect} from "react-redux";

class ReduxReceiverSample2 extends Component{
  constructor(props){
    super(props);
    this.state = {weather:{}};
  }

  
  static getDerivedStateFromProps(props, state){
    if(props.weather){
      return {...state, weather: props.weather};
    }else{
      return state; //if props.sample is null, remain current state.
    }
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
      <div className="card">
        <div className="card-body">
        <p>I received the value from Redux from Weather Action!</p>
        <pre>{JSON.stringify(this.state.weather)}</pre>
        </div>
        <ul>
          {this.makeList(this.state.weather)}
        </ul>
      </div>
    )
  }
}

//this function is for transform the data from redux into your component.
//the argument will be the state that redux will return.
//and you only receive the state you need.
function mapStateToProp({weather}){ 
  //{sample} is abbreviation of funcName(state){ const sample = state.sample
  // but it doesn't make state. just make sure, sample is really what you need.
  // in 
  if(weather){
    console.log(weather);
    return {weather}; 
  }else{
    return null;
  }
  
  //{sample} abbreviation of {sample:sample}
  // from now on, you can use this.props.sample
  // because you returned the form as {sample: XXX}
}

export default connect(mapStateToProp)(ReduxReceiverSample2);