import  useReducer  from "./dataReducer";
import pageReducer from './pageReducer';
import { combineReducers } from "redux";

export default combineReducers({
    useReducer,
    pageReducer
})
