import {SAMPLE_ACTION} from "../actions";

export default function(state=[], action){
  // be sure, this state is not the same state that the components have.
  // when axios or fetch returns the result, it comes to here..
  // this state will be returned to the components as props.

  console.log("payload for "+action.type);
  console.log(action.payload);

  switch(action.type)
  {
    case SAMPLE_ACTION:
    {
      //make new state that you will use..
      let newState = [action.payload.value, ...state];
      return newState.splice(0,5);
    }
    default:
      return state;
    }
}
