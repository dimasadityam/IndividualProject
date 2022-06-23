
const INITIAL_STATE = {
  postings: [],
  likeposts: []
}

export const postingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_POSTINGS":
      console.log("Data Dari Action", action.payload)
      return { ...state, postings: action.payload };

    case "GET_LIKEPOSTS":
      console.log("Data Dari likepost Action", action.payload)
      return { ...state, likeposts: action.payload };

    default:
      return state
  }
}
// export const likepostsReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case "GET_LIKEPOSTS":
//       console.log("Data Dari likepost Action", action.payload)
//       return { ...state, likeposts: action.payload };

//     default:
//       return state
//   }
// }