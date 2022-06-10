import { combineReducers } from "redux";
import { usersReducer } from "./usersReducers";
import { postingsReducer } from "./postingsReducers";
import { commentsReducer } from "./commentsReducers"

export const globalStore = combineReducers({
  usersReducer, postingsReducer, commentsReducer
})