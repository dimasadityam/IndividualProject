// import logo from './logo.svg';
import './App.css';
import LandingPage from './Pages/LandingPage';
import "../src/App.css"
import { Routes, Route } from "react-router-dom"
// import NavbarComponent from "./Components/navbar";
import RegisterPage from './Pages/RegisterPage';
// import RegisterPagecopy3 from './Pages/RegisterPagecopy3'
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import React from 'react';
import { useDispatch } from 'react-redux'
import Axios from 'axios';
import { API_URL } from './helper';
import { getPostingsAction } from './redux/action/postingsAction';
import { loginAction, getUsers, keepLogin } from "./redux/action/usersAction"
import EditProfilePage from './Pages/editProfilePage';
import ForgotPasswordPage from './Pages/ForgotPassword';
import VerificationPage from './Pages/VerificationPage';
import CheckEmailPage from './Pages/CheckEmailPage';
import ResetPasswordPage from './Pages/ResetPassword';


function App() {

  const dispatch = useDispatch();

  // const getPostings=()=>{
  //   Axios.get(`${API_URL}/postings`)
  //   .then((response)=>{
  //     console.log(response.data)
  //     dispatch(getPostingsAction(response.data))
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // }

  // const getUsers=()=>{
  //   Axios.get(`${API_URL}/users`)
  //   .then((response)=>{
  //     console.log(response.data)
  //     dispatch(getUsersAction(response.data))
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // }

  // const keepLogin=()=>{
  //   let token = localStorage.getItem("tokenIdUser")
  //   if(token){
  //     Axios.get(`${API_URL}/users?id=${token}`)
  //     .then((res)=>{
  //       if(res.data.length === 1){
  //         localStorage.setItem("tokenIdUser", res.data[0].id)
  //         dispatch(loginAction(res.data[0]))
  //       }
  //     }).catch((error)=>{
  //       console.log(error)
  //     })
  //   }
  // }

  React.useEffect(()=>{
    // getPostings();
    dispatch(keepLogin());
    dispatch(getUsers());
  },[])

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/profile/editprofile' element={<EditProfilePage />} />
        <Route path='/verification/:token' element={<VerificationPage />} />
        <Route path='/forgot' element={<ForgotPasswordPage/>} />
        <Route path='/forgotpass/:token' element={<ResetPasswordPage/>} />
        <Route path='/checkemail' element={<CheckEmailPage/>} />
      </Routes>
    </div>
  );
}

export default App;
