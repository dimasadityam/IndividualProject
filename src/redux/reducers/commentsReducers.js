const INITIAL_STATE = {
  comments: []
}

export const commentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      console.log("Data Comments Dari Action", action.payload)
      return { ...state, comments: action.payload };

    default:
      return state
  }
}