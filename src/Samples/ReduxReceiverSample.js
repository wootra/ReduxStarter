import React, {Component} from "react";
import {connect} from "react-redux";

class ReduxReceiverSample extends Component{
  constructor(props){
    super(props);
    this.state = {sample_result:[]};
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
        <p>I received the value from Redux from Sample Action!</p>
        <pre>{JSON.stringify(this.props.sample)}</pre>
        </div>
        <ul>
          {this.makeList(this.props.sample)}
        </ul>
      </div>
    )
  }
}

//this function is for transform the data from redux into your component.
//the argument will be the state that redux will return.
//and you only receive the state you need.
function mapStateToProp({sample}){ 
  //{sample} is abbreviation of funcName(state){\n const sample = state.sample ...
  // but it doesn't make state. just make sure, sample is really what you need.
  // in 
  
  if(sample){
    console.log(sample);
    return {sample}; 
  }else{
    return null;
  }
  //{sample} abbreviation of {sample:sample}
  // from now on, you can use this.props.sample
  // because you returned the form as {sample: XXX}
}

export default connect(mapStateToProp)(ReduxReceiverSample);