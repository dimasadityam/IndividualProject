import { combineReducers } from "redux";
import { usersReducer } from "./usersReducers";

export const globalStore = combineReducers({
  usersReducer
})