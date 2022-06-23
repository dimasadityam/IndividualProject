import Axios from "axios";
import React from "react";
import { useDispatch } from 'react-redux'
import { verifiedAccount } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";
import {BsFillPersonCheckFill} from 'react-icons/bs' 


const CheckEmailPage=(props)=>{
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return( <>
  <div className="registerBG">
    <br />
    <br />
    <br />
    <div className="vectorCheckEmail">
      <div class="text-center pt-5 pb-5">
        <div className="h4-register">Check Your Email for Link Verification</div>
      {/* <BsFillPersonCheckFill size={100} style={{color:"#198754"}}/> */}
      {/* <div class="text-muted">After Register, you can acces all feature with verified account</div> */}
      </div>
      {/* <div class="d-grid gap-2 col-4 mx-auto">
        <button type="button" class="btn btn-outline-success btn-sm"
        onClick={handleVerified}>Verified Your Account</button>
      </div> */}
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

export default CheckEmailPage;