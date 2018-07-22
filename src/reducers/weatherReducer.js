import {FETCH_WEATHER} from "../actions";

export default function(state={}, action){
  // be sure, this state is not the same state that the components have.
  // when axios or fetch returns the result, it comes to here..
  // this state will be returned to the components as props.

  console.log("payload for "+action.type);
  console.log(action.payload);

  switch(action.type)
  {
    case FETCH_WEATHER:
    {
      if(action.payload) return action.payload; //this action doesn't use past states.
      else return state; //if no result, return current state.
    }
    default:
      return state;
    }
}
