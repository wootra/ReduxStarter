import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapTest from './Samples/MapTest';
import ActionSenderSample from './Samples/ActionSenderSample';
import ReduxReceiverSample from './Samples/ReduxReceiverSample';
import ReduxReceiverSample2 from './Samples/ReduxReceiverSample2';
import ActionSenderReduxReceiverSample from './Samples/ActionSenderReduxReceiverSample';

class App extends Component {
  constructor(){
    super();
    this.state = {
      customers:[]
    };
    this.loadData = this.loadData.bind(this);
  }
  componentDidMount(){
    try{
      fetch('/api/customers')
      .then((res)=>{ 
          console.log(res);
          return res
        }
        , (e)=>console.log(e))
      .then(res=>res.json()
        , (e)=>console.log(e))
      .then(customers=>this.setState({customers})
        , (e)=>console.log(e));
    }catch(e){
      console.log("error when receiveing...");
    }
  }

  loadData(id){
    try{
      fetch(`/api/customers/${id}`)
      .then((res)=>{ console.log(res);
                    return res}, e=>console.log(e))
      .then(res=>res.json(), e=>console.log(e))
      .then(customers=>this.setState({customers}), e=>console.log(e));
    }catch(e){
      console.log("error when receiveing...");
    }
  }
  render() {
    let num=0;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <ul>
            {
                this.state.customers.map? 
                this.state.customers.map( (i) => 
                  <li key={"key_p_"+(++num)}>{(i.firstName + " " + i.lastName)}</li>)
                : ""
            }
          </ul>
          <button onClick={e=>this.loadData('all')}>All</button>
          <button onClick={e=>this.loadData('1')}>1</button>
          <button onClick={e=>this.loadData('2')}>2</button>
          <button onClick={e=>this.loadData('3')}>3</button>
          <button onClick={e=>this.loadData('4')}>4</button>
        </div>
        <div className="card">
          <div className="card-body">
            <MapTest></MapTest>
          </div>
          <div className="card-body">
           <ActionSenderSample></ActionSenderSample>
          </div>
          <div className="card-body">
            <ReduxReceiverSample></ReduxReceiverSample>
          </div>
          <div className="card-body">
           <ReduxReceiverSample2></ReduxReceiverSample2>
          </div>
          <div className="card-body">
           <ActionSenderReduxReceiverSample></ActionSenderReduxReceiverSample>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;

