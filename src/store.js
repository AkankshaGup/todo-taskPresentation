import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {TaskReducer} from "./taskReducer.js"

export default createStore(TaskReducer, applyMiddleware(thunk));