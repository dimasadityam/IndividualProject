import { combineReducers } from "redux";
import { usersReducer } from "./usersReducers";
import { postingsReducer } from "./postingsReducers";

export const globalStore = combineReducers({
  usersReducer, postingsReducer
})