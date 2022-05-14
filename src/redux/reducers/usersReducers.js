
const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  fullname: "",
  bio: "",
  profilepict: "",
  likepost: [],
  id: null
}

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Data loginAction userReducers", action.payload)
      return { ...state, ...action.payload };

    case "LOGOUT":
      return INITIAL_STATE;

    default:
      return state
  }
}