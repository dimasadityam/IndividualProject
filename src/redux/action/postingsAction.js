import axios from "axios"
import { API_URL } from "../../helper"


export const getPostingsAction = (data) => {
  console.log("data POSTINGS dari component UI", data)
  return {
    type: "GET_POSTINGS",
    payload: data
  }
}

export const getLikepostsAction = (data) => {
  console.log("DATA DARI LIKEPOSTSSACTION", data)
  return {
    type: "GET_LIKEPOSTS",
    payload: data
  }
}

export const getPostings = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      console.log("TOKENN POSTING", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/postings/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        // let res = await axios.get(`${API_URL}/postings/`)
        // res.data.forEach()
        // console.log("res.data", res.data)
        console.log("DATA POSTING", res.data)
        if (res.data) {
          // console.log("RES DATA POSTINGS", res.data)
          dispatch(getPostingsAction(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getFilterPostings = () => {
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
          dispatch(getPostingsAction(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getLikePostings = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      // console.log("TOKENN POSTING", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/postings/likes`, {
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