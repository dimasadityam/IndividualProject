import Axios from "axios";
import React from "react";
import { Button, FormGroup, Input, InputGroup, Label, InputGroupText } from "reactstrap";
import { useDispatch } from 'react-redux'
import { resetPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordPage=(props)=>{
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailForgot, setEmailForgot]=React.useState("")
  const [newPassword, setNewPassword]=React.useState("")
  const [confNewPassword, setConfNewPassword]=React.useState("")
  const [newPassLength, setNewPassLength]=React.useState(false)
  const [containsNumbers, setContainsNumbers]=React.useState(false)
  const [isUpperCase, setIsUpperCase]=React.useState(false)
  const [containsSymbols, setContainsSymbols]=React.useState(false)

  const [inForm, setInForm] = React.useState({
    newPassword: '',
    confNewPassword: ''
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
    if(inForm.newPassword.length > 6){
      setNewPassLength(true);
    } else {
      setNewPassLength(false)
    }
    // console.log("cek password.length",inForm.password.length)
    // console.log(inForm.password)
  }

  const checkStrongPassword =()=>{
    if(newPassLength== false || isUpperCase==false ||
      containsNumbers==false || containsSymbols==false){
        alert(`Weak password, Please check Passwords should contain at least :
        8 characters including an UpperCase , Numbers , Symbols`)
  }
}

  const checkUpperCase=()=>{
    // console.log("cek uppercase", isUpperCase)
    if (inForm.newPassword.match(/^(?=.*[A-Z])/)){
      setIsUpperCase(true)
    } else {
      setIsUpperCase(false)
    }
  }
  
  const checkNumbers=()=>{
    // console.log("cek number", containsNumbers)
    if (inForm.newPassword.match(/\d+/g)){
      setContainsNumbers(true)
    } else {
      setContainsNumbers(false)
    }
  }

  const checkSymbols=()=>{
    // console.log("cek symbol", containsSymbols)
    if (inForm.newPassword.match(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/)){
      setContainsSymbols(true)
    } else {
      setContainsSymbols(false)
    }
  }

  const handleSubmit =async(props)=>{
    try {
      checkStrongPassword();
      if (newPassword=="" || confNewPassword==""){
        alert("Fill in all form")
      }else{
        if (newPassword!=confNewPassword){
          alert("Password not match")
        } else{
          
          // let res = await Axios.post(`${API_URL}/users`, {
            //   username,
            //   email,
            //   password,
            //   role:"user",
            //   cart:[]
            // })
            // console.log("Respon Resgiter", res.data)
            // dispatch(getUsersAction(res.data))
            // Auto Login ketika register berhasil
            // dispatch(loginAction(res.data))
            let a = newPassword;
            let b = params.token;
            let resetPass = resetPassword(a, b);
            dispatch(resetPass)
            navigate("/")
          // setSelectedIdx(!selectedIdx)
        }
      }

    } catch (error) {
      console.log(error)
    }
  }
console.log(emailForgot)

  return( <>
  <div className="registerBG">
    <br />
    <div className="vectorReset">
    <div class="container text-center pt-5 pb-5">
    {/* <br />
    <br />
    <br />
    <br /> */}
    <h4 className="h4-register">Create New Password</h4>
    <br />
    <hr />
    <br />
    <div class="row">
      <div class="col-4">
      </div>
      <div class="col-4">
        <FormGroup>
            <Label className="label-register">Password</Label>
          <InputGroup>
            <Input type={visibleForm.type} value={inForm.newPassword}
              placeholder="Input New Password"
              onChange={(e)=>{handleInput(e.target.value, "newPassword"); setNewPassword(e.target.value)}}/>
            <InputGroupText className='btn modal-btn' onClick={handleVisible} >
                {visibleForm.text}
            </InputGroupText>
          </InputGroup>
            <div>
                <div className="textStrong pt-1">Strong Passwords should contain at least :</div>
                <span className={newPassLength ? 'textStrongOk' : 'textStrong'}> 8 characters</span>
                <span className="textStrong"> including an </span>
                <span className={isUpperCase ? 'textStrongOk' : 'textStrong'}>UpperCase</span>
                <span className="textStrong"> , </span>
                <span className={containsNumbers ? 'textStrongOk' : 'textStrong'}>Numbers</span>
                <span className="textStrong"> , </span>
                <span className={containsSymbols ? 'textStrongOk' : 'textStrong'}>Symbols</span>
            </div>
        </FormGroup>
        <FormGroup>
            <Label className="label-register">Confirmation Password</Label>
          <InputGroup>
            <Input type={visibleConf.type} value={inForm.confNewPassword}
              placeholder="Confirmation New Password"
              onChange={(e)=>{handleInput(e.target.value, "confNewPassword"); setConfNewPassword(e.target.value)}}/>
            <InputGroupText className='btn modal-btn' onClick={handleVisibleConf} >
                {visibleConf.text}
            </InputGroupText>
          </InputGroup>
        </FormGroup>
        <div class="d-grid gap-2 mx-auto">
          <button type="button" class="btn btn-outline-success"
          onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div class="col-4">
      </div>
    </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    </div>
  </div>
  </>
  )
}

export default ResetPasswordPage;