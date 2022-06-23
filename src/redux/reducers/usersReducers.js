
const INITIAL_STATE = {
  users: []
}

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Data loginAction userReducers", action.payload)
      return { ...state, ...action.payload };

    case "FORGOT_SUCCESS":
      console.log("DATA FORGOT ACTION users reducers", action.payload)
      return { ...state, ...action.payload };

    case "GET_USERS":
      console.log("Data Dari Action", action.payload)
      return { ...state, users: action.payload };

    case "UPDATE_PROFILE":
      return { ...state, users: action.payload }
    case "LOGOUT":
      return INITIAL_STATE;

    default:
      return state
  }
}