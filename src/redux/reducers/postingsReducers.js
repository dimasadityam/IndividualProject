
const INITIAL_STATE = {
  postings: []
}

export const postingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_POSTINGS":
      console.log("Data Dari Action", action.payload)
      return { ...state, postings: action.payload };

    default:
      return state
  }
}