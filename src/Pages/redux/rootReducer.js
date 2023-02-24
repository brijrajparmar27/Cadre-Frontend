import { combineReducers } from "redux";
import logindataslice from "./logindataslice"
import projectdatareducer from'./projectDataSlice';


const RootReducers = combineReducers({
    logindataslice,
    projectdatareducer
});

export default RootReducers;
