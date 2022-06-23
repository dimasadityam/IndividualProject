import Axios from "axios";
import React from "react";
import { API_URL } from "../helper";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useDispatch } from 'react-redux'
import { forgotPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";

const ForgotPasswordPage=(props)=>{
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailForgot, setEmailForgot]=React.useState("")

  React.useEffect(() => {
    dispatch(forgotPassword());
}, []);

  const handleSubmit =async()=>{
    try {
      if (emailForgot==""){
        alert("Input Your Email")
      }else{
        if (emailForgot.includes("@")){
            let a = emailForgot;
            // console.log("a", a)
            let forgotPass = forgotPassword(a);
            dispatch(forgotPass)
        } else {
          alert("Email Wrong")
        }
      }

    } catch (error) {
      console.log(error)
    }
  }
console.log(emailForgot)

  return( <>
  <div className="registerBG">
    <br/>
  <div className="vectorForgot">
    <div class="container text-center pt-5 pb-5">
    <h2 className="h4-register">Forgot Password</h2>
    <br />
    <hr />
    <br />
    <div class="row">
      <div class="col-4">
      </div>
      <div class="col-4">
        <FormGroup>
          <Label className="label-register">Email</Label>
          <Input type="email" placeholder="Input Your Email" onChange={(e)=>setEmailForgot(e.target.value)}/>
        </FormGroup>
        <div class="d-grid gap-2 mx-auto">
          <button type="button" class="btn btn-outline-success"
          onClick={handleSubmit}>Submit</button>
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
    <br />
    <br />
    <br />
      <div class="col-4">
      </div>
    </div>
      </div>
    </div>
    </div>
  </div>
  </>
  )
}

export default ForgotPasswordPage;