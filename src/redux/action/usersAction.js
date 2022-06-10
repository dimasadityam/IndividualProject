import axios from "axios"
import { API_URL } from "../../helper"

export const loginAction = (data) => {
  console.log("data users loginAction", data)
  return {
    type: "LOGIN_SUCCESS",
    payload: data
  }
}

export const updateProfileAction = (data) => {
  return {
    type: "UPDATE_PROFILE",
    payload: data
  }
}

export const logoutAction = (data) => {
  localStorage.removeItem("tokenIdUser")
  return {
    type: "LOGOUT"
  }
}

export const getUsersAction = (data) => {
  console.log("getUsersAction", data)
  return {
    type: "GET_USERS",
    payload: data
  }
}

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      console.log("token", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/users?idUser=${token}`)
        // memeriksa adanya data user atau tidak
        if (res.data.length == 1) {
          //
          localStorage.setItem("tokenIdUser", res.data[0].idUser)
          dispatch(loginAction(res.data[0]))
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const loginUser = (inFormEmail, inFormPassword) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${API_URL}/users?email=${inFormEmail}&password=${inFormPassword}`)
      if (res.data.length == 1) {
        localStorage.setItem("tokenIdUser", res.data[0])
        dispatch(loginAction(res.data[0]))
      }
    } catch (error) {
      console.log(error)
    }
  }
}