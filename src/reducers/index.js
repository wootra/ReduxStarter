import {combineReducers} from "redux";
import sampleReducer from "./sampleReducer";
import weatherReducer from "./weatherReducer";

// all recuders has to be combined here.
// if you added a reducer, add it in combine reducer objects.
const combine_reducer_objects={
  sample: sampleReducer 
  ,weather: weatherReducer
  //add more here..
};
export default combineReducers(combine_reducer_objects);