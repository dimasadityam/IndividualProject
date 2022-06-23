import axios from "axios"
import { API_URL } from "../../helper"
import { getPostings, getPostingsAction } from "./postingsAction"

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
  // console.log("getUsersAction", data)
  return {
    type: "GET_USERS",
    payload: data
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      // console.log("TOKENN USERS", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/users/filter`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        // let res = await axios.get(`${API_URL}/postings/`)
        // res.data.forEach()
        // console.log("res.data USERS", res.data)
        if (res.data) {
          // console.log("RES DATA USERS", res.data)
          dispatch(getUsersAction(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
// export const getUsers = () => {
//   return async (dispatch) => {
//     try {
//       let res = await axios.get(`${API_URL}/users/`)
//       // res.data.forEach()
//       if (res.data) {
//         // console.log("RES DATA USER", res.data)
//         dispatch(getUsersAction(res.data))
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      // console.log("token getItem", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/users/keep`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        // memeriksa adanya data user atau tidak
        // console.log("RES.DATA", res.data.token)
        if (res.data.token) {
          //
          localStorage.setItem("tokenIdUser", res.data.token)
          // console.log("resdata keepLogin", res.data)
          dispatch(loginAction(res.data))
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const registerUser = (username, email, password) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${API_URL}/users/`, {
        username: username,
        email: email,
        password: password,
        fullname: null,
        bio: null,
        profilepict: "https://sman11tangerangselatan.sch.id/images/user-u.jpg"
      })
      console.log("res.data registerUser", res.data)
      if (res.data.token) {
        localStorage.setItem("tokenIdUser", res.data.token)
        dispatch(loginAction(res.data))
        alert('registration success')
      } else {
        alert("email not available")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const loginUser = (inFormEmail, inFormPassword) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${API_URL}/users/login`, {
        email: inFormEmail,
        password: inFormPassword
      })
      if (res.data.token) {
        // console.log("RES DATA TOKEN LOGIN", res.data.token)
        localStorage.setItem("tokenIdUser", res.data.token)
        dispatch(loginAction(res.data))
        dispatch(getPostings())
        dispatch(getUsers())
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const forgotPassword = (emailForgot) => {
  return async (dispatch) => {
    try {
      console.log("emailfor", emailForgot)
      let res = await axios.post(`${API_URL}/users/forgot`, {
        email: emailForgot
      })
      // console.log("res", res)
      console.log("res.data forgotPassword", res.data)
      if (res.data.token) {
        // localStorage.setItem("tokenIdUser", res.data.token)
        alert('Check Link Reset Password in Your Email')
        // dispatch(forgotAction(res.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const resetPassword = (newPass, paramsToken) => {
  return async (dispatch) => {
    console.log("paramsToken", paramsToken)
    try {
      if (paramsToken) {
        console.log("newPass", newPass)
        await axios.patch(`${API_URL}/users/resetpass`, { newPass }, {
          headers: {
            'Authorization': `Bearer ${paramsToken}`
          }
        })
        // console.log("res.data resetPassword", res.data)
        // if (res.data.token) {
        //   localStorage.setItem("tokenIdUser", res.data.token)
        //   dispatch(loginAction(res.data))
        // }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const verifiedAccount = (paramsToken) => {
  return async (dispatch) => {
    try {
      if (paramsToken) {
        let res = await axios.patch(`${API_URL}/users/verified`, {}, {
          headers: {
            'Authorization': `Bearer ${paramsToken}`
          }
        })
        console.log("res.data verified", res.data)
        // memeriksa adanya data user atau tidak
        if (res.data.success) {
          //
          localStorage.setItem("tokenIdUser", res.data.token)
          dispatch(loginAction(res.data.token))
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const editUser = (username, fullname, bio, d, e, f) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await axios.patch(`${API_URL}/users/`, {
        username: username,
        fullname: fullname,
        bio: bio,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data.token) {
        // console.log("RES DATA TOKEN LOGIN", res.data.token)
        localStorage.setItem("tokenIdUser", res.data.token)
        dispatch(loginAction(res.data.token))
      }
    } catch (error) {
      console.log(error)
    }
  }
}