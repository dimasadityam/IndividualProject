import Axios from "axios";
import React from "react";
import { API_URL } from "../helper";
import { Button, FormGroup, Input, Label, InputGroupText, InputGroup } from "reactstrap";
import { useDispatch } from 'react-redux'
import { getUsersAction } from "../redux/action/usersAction";
import { loginAction } from "../redux/action/usersAction";
import { useNavigate } from "react-router-dom";
import vectorRegister from "../assets/new/vectorRegister.png"
import "../style/registerPage.css"
import { getUsernamesAction } from '../redux/action/usernameAction'
import { FaUserCircle } from "react-icons/fa"
// import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";


const RegisterPage=()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername]=React.useState("")
  const [email, setEmail]=React.useState("")
  const [password, setPassword]=React.useState("")
  const [passwordLength, setPasswordLength]=React.useState(false)
  const [containsNumbers, setContainsNumbers]=React.useState(false)
  const [isUpperCase, setIsUpperCase]=React.useState(false)
  const [containsSymbols, setContainsSymbols]=React.useState(false)
  const [confPassword, setConfPassword]=React.useState("")
  const [selectedIdx, setSelectedIdx] = React.useState(null)


  const [inForm, setInForm] = React.useState({
    email: '',
    password: '',
    confPassword: ''
  })
  
  
  const [visibleConf, setVisibleConf] = React.useState({
    type: "password",
    text: "Show"
  })
  
  const [visibleForm, setVisibleForm] = React.useState({
    type: "password",
    text: "Show"
  })

  const handleVisibleConf = () => {
    if (visibleConf.type === "password"){
      setVisibleConf({
        type: "text",
        text: "Hide"
      })
    } else {
      setVisibleConf({
        type: "password",
        text: "Show"
      })
    }
  }

  const handleVisible = () => {
    if (visibleForm.type === "password"){
      setVisibleForm({
        type: "text",
        text: "Hide"
      })
    } else {
      setVisibleForm({
        type: "password",
        text: "Show"
      })
    }
  }
  
  const handleInput = (value, property) => {
    setInForm({ ...inForm, [property]: value})
    checkUpperCase();
    checkNumbers();
    checkSymbols();
    if(inForm.password.length > 6){
      setPasswordLength(true);
    } else {
      setPasswordLength(false)
    }
    console.log("cek password.length",inForm.password.length)
    console.log(inForm.password)
  }
  
  const handleRegister =async()=>{
    try {
      let filterQuery = `?`;
      let filterQueryEmail = `?`;
      checkStrongPassword();
      if (username=="" || email=="" || password=="" || confPassword==""){
        alert("Fill in all form")
        console.log(username, email, password, confPassword)
      // } else if(passwordLength== false || isUpperCase==false ||
      //           containsNumbers==false || containsSymbols==false){
      //             alert("Weak password")
      } else{
        if (password!=confPassword){
          alert("Password not match")
        } else if(email.includes("@")){
          filterQuery +=`username_like=${username}`
          let response = await Axios.get(`${API_URL}/users${filterQuery}`)
            if(response.data < 1){
              filterQueryEmail += `email_like=${email}`
              let responseEmail = await Axios.get(`${API_URL}/users${filterQueryEmail}`)
              if(responseEmail.data < 1){
                // navigate("/")
                alert('registration success')
                let res = await Axios.post(`${API_URL}/users`, {
                  username,
                  email,
                  password,
                  fullname:"",
                  bio:"",
                  profilepict:"https://sman11tangerangselatan.sch.id/images/user-u.jpg"
                })
                dispatch(loginAction(res.data))
                navigate("/")
              } else {
                alert("email not available")
              }
            } else {
              alert("username not available")
            }
          // console.log("Respon Resgiter", res.data)
          // dispatch(getUsersAction(res.data))
          // Auto Login ketika register berhasil
          // setSelectedIdx(!selectedIdx)
          console.log("tes selectedIdx",selectedIdx)
        } else {
          alert("Email Wrong")
        }
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const checkStrongPassword =()=>{
    if(passwordLength== false || isUpperCase==false ||
      containsNumbers==false || containsSymbols==false){
        alert("Weak password")
  }
}

  const checkUpperCase=()=>{
    console.log("cek uppercase", isUpperCase)
    if (inForm.password.match(/^(?=.*[A-Z])/)){
      setIsUpperCase(true)
    } else {
      setIsUpperCase(false)
    }
  }
  
  const checkNumbers=()=>{
    console.log("cek number", containsNumbers)
    if (inForm.password.match(/\d+/g)){
      setContainsNumbers(true)
    } else {
      setContainsNumbers(false)
    }
  }

  const checkSymbols=()=>{
    console.log("cek symbol", containsSymbols)
    if (inForm.password.match(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/)){
      setContainsSymbols(true)
    } else {
      setContainsSymbols(false)
    }
  }

  return(
    <>
    <div className="registerBG">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-sm-12">
            <h4 className="vectorRegister-sm PT40 h4-register"><br />Register Account</h4>
            <div>
              <FormGroup>
                <Label className="label-register pt-3">Username</Label>
                <Input className="shadow-input" type="text" onChange={(e)=>setUsername(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label className="label-register">Email</Label>
                <Input className="shadow-input" type="email" onChange={(e)=>setEmail(e.target.value)}/>
              </FormGroup>
                <Label className="label-register">Password</Label>
              <InputGroup>
              <Input type={visibleForm.type}
                            value={inForm.password}
                            onChange={(event) =>  { handleInput(event.target.value, "password"); setPassword(event.target.value)}} />
                        <InputGroupText className='btn modal-btn' onClick={handleVisible} >
                          {visibleForm.text}
                        </InputGroupText>
              </InputGroup>
              <div>
                  <div className="textStrong pt-1">Strong Passwords should contain at least :</div>
                  <span className={passwordLength ? 'textStrongOk' : 'textStrong'}> 8 characters</span>
                  <span className="textStrong"> including an </span>
                  <span className={isUpperCase ? 'textStrongOk' : 'textStrong'}>UpperCase</span>
                  <span className="textStrong"> , </span>
                  <span className={containsNumbers ? 'textStrongOk' : 'textStrong'}>Numbers</span>
                  <span className="textStrong"> , </span>
                  <span className={containsSymbols ? 'textStrongOk' : 'textStrong'}>Symbols</span>
                </div>
                <Label className="label-register pt-4">Confirmation Password</Label>
              <InputGroup>
                {/* <Input className="shadow-input" type="password" onChange={(e)=>setConfPassword(e.target.value)}/> */}
                <Input type={visibleConf.type}
                            value={inForm.confPassword}
                            onChange={(event) => { handleInput(event.target.value, "confPassword"); setConfPassword(event.target.value)}} />
                        <InputGroupText className='btn modal-btn' onClick={handleVisibleConf} >
                          {visibleConf.text}
                        </InputGroupText>
              </InputGroup>
            </div>
            <Button className="w-100 btn-color mt-3" onClick={handleRegister} type="button"
                style={{fontFamily:"Lexend"}}>Regis Now</Button>
          </div>
          <div className="col-12 col-md-6 MB">
            <div className="vectorRegister">

            </div>
            {/* <img width="100%" src={vectorRegister} className="PT40"
            alt="Vector Register"/> */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default RegisterPage;