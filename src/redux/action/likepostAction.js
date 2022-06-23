import axios from "axios"
import { API_URL } from "../../helper"

export const getLikepostsAction = (data) => {
  console.log("DATA DARI LIKEPOSTSSACTION", data)
  return {
    type: "GET_LIKEPOSTS",
    payload: data
  }
}

export const getLikePostings = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      // console.log("TOKENN POSTING", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/postings/filter`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        // let res = await axios.get(`${API_URL}/postings/`)
        // res.data.forEach()
        // console.log("res.data", res.data)
        if (res.data) {
          // console.log("RES DATA POSTINGS", res.data)
          dispatch(getLikepostsAction(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}