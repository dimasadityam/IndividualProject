const INITIAL_STATE = {
  gallery: []
}

export const galleryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_GALLERY":
      console.log("DAPAT DATA GALLERY REDUCER", action.payload)
      return { ...state, gallery: action.payload };

    default:
      return state;
  }
}