REACT 앱에 REDUX 추가하는 과정을 다시 적어봤습니다.

[원문](http://wootra.blogspot.com/2018/07/reactredux-starting-with-redux.html)

# Overview about Redux
Let's say we have very many components to handle. And at some point, we need to share some values. Maybe it has to be asynchronously. How can we do this all?
Using Redux modules can be a good solution.

Redux runs like this process:
1. Call an Action Creator
2. (Internally) Action Creator defines a request for an asynchronous function and triggers the redux event handler
3. (Internally) Redux will run the action request then register callbacks for the response.
4. (Internally) When the callback is called, Redux middleware receives the response and returns to each reducer.
5. a reducer gets a current state and action-response as arguments and returns a new state belonging to the reducer.
6. (Internally) Each component bound to the redux gets states which are combined from all reducers.
7. (Optional) Component will change or filter the state into the format that the component will use in the props. If don't, all states will be included in props.

So much? Don't worry. You just need to make these 3 parts.

1) action creator and action invoker
2) Provider
3) reducer and reduce consumer

Let's go step-by-step.

## 1. install Redux packages
Before adding the code, let's install this packages:

react-redux : connect react structure with redux. it will change react component's props.
redux : it will distribute data into all components that connected to redux
redux-promise : it will manage async functions and send the result to the payload object of the action argument in a reducer.
axios : useful modules for async/sync web request.

run below script to install them.

$ npm i --save react-redux redux redux-promise axios

## 2. Action Creators
Actions are what we begin sharing states or request for data from the web service. Let's see this:
/src/actions/index.js
```
#!javascript
import axios from 'axios'; // used for async communication. run npm i --save axios

export const SAMPLE_ACTION = "SAMPLE_ACTION";
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function sampleAction(term){
  return {
    type : SAMPLE_ACTION,
    payload : {value: term}
  };
}

const URL_ROOT = 'https://api.openweathermap.org/data/2.5/forecast';
//const API_KEY = 'https://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&appid=0f617627d1dc7ec8658c716ea5dc34a9'

const API_KEY = '0f617627d1dc7ec8658c716ea5dc34a9';

export function fetchWeather(term)
{
  const url = `${URL_ROOT}?q=${term},us&appid=${API_KEY}`;
  const req = axios.get(url);

  console.log("action: request:", req);

  return {
    type: 'FETCH_WEATHER',
    payload: req
  };
```

I added 2 action creators. sampleAction for sharing a value, and fetchWeather for a web request. Let's see how we can call the action.

## 3. Action Invoker
Let's say we have a input box class like this:

/src/components/TestInput.js
```
#!javascript
import React, {Component} from "react";

class TestInput extends Component{
  constructor(props)
  {
    super(props);
    this.state=
    {
      title: (this.props.title ? this.props.title : "TestInputTitle")
    };
    this.onChange = this.onChange.bind(this);
    this.timer = null;
  }
  onChange(e)
  {
    this.setState({title:e.target.value});
  }
  render(){
    return (
      <div>
      <div>{this.state.title}</div>
      <input onChange={this.onChange} value={this.state.title}/>
      </div>
    );
  }
}

export default TestInput;
```

Let's add what we need one by one.

To call sampleAction, import "sampleAction" action creator,
To connect the component, import "connect" function,
To bind this component as an action invoker, import "bindActionCreator" function.

```
#!javascript
import {sampleAction} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"

We are going to export wrapped component to register this component as an action invoker, so change this line
export default TestInput;

like this:
function mapDispatchToProps(dispatch){
  return bindActionCreators({sampleAction}, dispatch);
}

export default connect(null, mapDispatchToProps)(TestInput);
```

it means I will register this class as an action invoker.
From now on, I can call sampleAction action creator with using this.props.sampleAction.

this.props.sampleAction(value);

Note that you cannot call sampleAction directly. If you do, It won't trigger redux so reducer consumer classes won't react by calling the action creator.
I assume that the when the action creator is connected to the redux, it will run a function like this:
```
#!javascript
function connect(actionFunc){
  function wrapper(...args){
    actionFunc(...args);
    start_request_handlers(); //maybe... haha
  }
  items_to_register.set(actionFunc.name, wrapper);// it will change props
}
```

That's it!

this is the full code of an action invoker component.

/src/components/TestInput.js
```
#!javascript
import React, {Component} from "react";
import {sampleAction} from "../actions/index";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"

class TestInput extends Component{
  constructor(props)
  {
    super(props);
    this.state=
    {
      id: (this.props.id ? this.props.id : "TestInput"),
      title: (this.props.title ? this.props.title : "TestInputTitle")
    };
    this.onChange = this.onChange.bind(this);
    this.timer = null;
  }
  onChange(e){
    this.setState({title:e.target.value});
    const value = e.target.value;
    const timeout = ()=>{
      if(this.timer) clearInterval(this.timer);
      this.timer = setInterval(
        ()=>{
          console.log("test");
          this.props.sampleAction(value);
          clearInterval(this.timer);
          this.timer = null;
          return true;
        }
        ,500
      );
    }
    timeout();
  }
  render(){
    return (
      <div>
      <div id={this.state.id}>{this.state.title}</div>
      <input onChange={this.onChange} value={this.state.title}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({sampleAction}, dispatch);
}

export default connect(null, mapDispatchToProps)(TestInput);
```

## 4. Provider
Let's make provider now.

Open /src/index.js file and Add these lines on top of the file.
```
#!javascript
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import ReduxPromise from "redux-promise";
import reducers from "./reducers";
```
Add one line more for your reducers.
we will make /reducers folder and index.js file in it to handle reducers later.
```
#!javascript
import reducers from "./reducers";
```
And Change the basic render function call from this,
```
#!javascript
ReactDOM.render( <App /> , document.getElementById('root'));
```
to this:
```
#!javascript
ReactDOM.render(
  <Provider store={applyMiddleware(ReduxPromise)(createStore)(reducers)}>
    <App />
  </Provider>
  , document.getElementById('root'));
```
It provide the reducers(we will make it) as a store for the App component including its child components using ReduxPromise as a middleware.

of course, there is div tag with id='root' in public/index.html.

```
#!html
<div id="root"></div>
```

The full src/index.js file will look like this:
```
#!javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import ReduxPromise from "redux-promise";
import reducers from "./reducers";

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={applyMiddleware(ReduxPromise)(createStore)(reducers)}>
    <App />
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
```

## 5. Reducers
We made 2 actions. So we need two reducers. So we will make the entry point reducer file first.
```
/src/reducers/index.js
#!javascript
import {combineReducers} from "redux";
import sampleReducer from "./sampleReducer";
import weatherReducer from "./weatherReducer";

export default combineReducers({
  sample: sampleReducer,
  weather: weatherReducer
});
```

each reducer (sampleReducer, weatherReducer) is registered with different names, So, the state belonging to each reducer will be wrapped with the name like:

from sampleReducer -> {sample: XXX}
from weatherReducer -> {weather: XXX}

When redux finish running all reducers, it will combine the return values like this:

{sample: XXX, weather: XXX}

Let's see real code of reducers:

sampleReducer.js
```
#!javascript
import {SAMPLE_ACTION} from "../actions";

export default function(state=[], action){
  switch(action.type)
  {
    case SAMPLE_ACTION:
    {
      var newState = [action.payload.value, ...state]; //insert new value at the front
      return newState.splice(0,5); //remain only 5 in the list.
    }
    default:
      return state;
    }
}
```

weatherReducer.js
```
#!javascript
import {WEATHER_ACTION} from "../actions";

export default function(state={}, action){
  switch(action.type)
  {
    case WEATHER_ACTION:
    {
      return action.payload; //return payload if it is WEATHER_ACTION
    }
    default:
      return state; //return current state if it is not WEATHER ACTION.
    }
}
```
Can you see each reducer's init value of state is different?
sampleReducer will return array, and weatherReducer will return an object. And the same state now returning will come in next time again. So, you have to keep the form of input argument and return value same.

When these reducers finish working, the redux will combine all results from reducers and hand it to reducer consumers.

{ sample : [...] , weather : {...} }

Again, the reducer is combined with names. Look the name carefully.

/src/reducers/index.js
```
#!javascript
import {combineReducers} from "redux";
import sampleReducer from "./sampleReducer";
import weatherReducer from "./weatherReducer";

export default combineReducers({
  sample: sampleReducer,
  weather: weatherReducer
});
```


## 6. Reducer Consumer Components
Let's say we have App.js file.

src/App.js
```
#!javascript
import React, { Component } from 'react';

import logo from './logo.svg';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        App file
      </div>
    );
  }
}

export default App;
```
Let's add connect function on top of the file.
```
#!javascript
import {connect} from "react-redux";
```
And change this of bottom of the file from this,

export default App;

to this:
```
#!javascript
function mapStateToProp({sample}){
  console.log(sample);
  return {sample};
}

export default connect(mapStateToProp)(App);
```
Can you see {sample} on the argument and {sample} on the return?
On the argument, it means you only extract {sample: ...} part from the argument object and assign into sample value. {sample} on the return, it means {sample: sample}.

In the other word, it is same meaning of this.
```
#!javascript
function mapStateToProp(anonymus){
  let sample = anonymous.sample;
  console.log(sample);
  return {sample:sample};
}

export default connect(mapStateToProp)(App);
```
Can you see we just connect mapStateToProp function with App class?
From now on, we can use the "sample" state in the class through props property:
this.props.sample

The process looks like this:

redux -> {sample:[...], weather:{...}} -> mapStateProp -> {sample:{...}} (filtering)
-> {App instance}.props.sample:{...} -> anywhere in the class

Even though the mapStateToProp function receive all the states from reducers, we can filter only some of the filters by returning with other format.

For example, if we make the function like this, we will use sample AND weather too.
```
#!javascript
function mapStateToProp({sample,weather}){
  return {sample, weather};
}
```
Note: the name in the props is defined depending on what you return.
If you make the function like this, the props will have a1 instead of sample.
```
#!javascript
function mapStateToProp({sample}){
  return {a1:sample};
}
```

Let's change render function to use this sample array.
```
#!javascript
render() {
  let key=0;
  return (
    <div>
      <ul>
       {this.props.sample.map(x=><li key={"key_"+(++key)}>{x}</li>)}
      </ul>
    </div>
  );
}
```
this is the full source of src/App.js
```
#!javascript
import React, { Component } from 'react';
import {connect} from "react-redux";

import logo from './logo.svg';
import './App.css';
import TestInput from "./components/TestInput";

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    let key=0;
    return (
      <div>
        <ul>
         {terms.map(x=><li key={"key_"+(++key)}>{x}</li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProp({sample}){
  console.log(sample);
  return {sample};
}

export default connect(mapStateToProp)(App);
```
Conclusion
To use redux well, I think the code has to be well-structured following the conventional rule. Because all redux consumer share all states, and if you don't filter them on each redux consumer components, it can be a burden for the computing time.
Let's think if one reducer's return value is always changed, and the others are not. It can occur slow down all the page performance.

So, We need to be careful when we create redux consumer, and filtering must be essential.