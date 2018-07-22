// add network request here.
// when action is invoked, it will occur this process..
// action->middleware->reducers->component connect(props)
import axios from 'axios';

//the action can be anything, but use same text with the name by convention.
export const SAMPLE_ACTION = "SAMPLE_ACTION"; 
export const FETCH_WEATHER = "FETCH_WEATHER";

export function action_sample(term){
  //go to reducer to handle this..
  return {
    type : SAMPLE_ACTION,
    payload : {value: term} //this is just for test. it returns terms directly.
  };
}

//fetch weather action sample..
const FORECAST_URL_ROOT = 'https://api.openweathermap.org/data/2.5/forecast';
const FORECAST_API_KEY = '0f617627d1dc7ec8658c716ea5dc34a9';
//term has to be location. refer https://openweathermap.org/
//ex> https://api.openweathermap.org/data/2.5/forecast?q=san%20antonio,us&appid=0f617627d1dc7ec8658c716ea5dc34a9
// appid can be yours.
export function action_fetchWeather(term)
{
  const url = `${FORECAST_URL_ROOT}?q=${term},us&appid=${FORECAST_API_KEY}`;
  const req = axios.get(url);

  console.log("action: request:", req);
  
  // go to reducer to handle this..
  return {
    type: 'FETCH_WEATHER',
    payload: req
  };
}