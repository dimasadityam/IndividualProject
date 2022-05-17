import React, {useEffect} from "react";
import Axios from "axios";
import { 
  Button, FormGroup, Input, InputGroup,
  InputGroupText, Label, Modal, ModalBody 
} from "reactstrap";
import { API_URL } from "../helper.js"
import { useDispatch } from "react-redux";
import "../style/modal.css"
import "../style/myColor.css"
import { loginAction, loginUser } from "../redux/action/usersAction.js";
import { useNavigate } from 'react-router-dom';
import { RiCloseLine } from "react-icons/ri"
import styles from "../style/modal.css"
import ReactDOM from "react-dom"
import {CSSTransition} from "react-transition-group"


const ModalNew = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  const [inForm, setInForm] = React.useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const [visibleForm, setVisibleForm] = React.useState({
    type: "password",
    text: "Show"
  })

  const handleInput = (value, property) => {
    setInForm({ ...inForm, [property]: value})
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

  const handleLogin = () => {
    if(inForm.email== "" || inForm.password== ""){
      alert("Fill in all form")
    } else {
      if(inForm.email.includes("@")){
        Axios.get(`${API_URL}/users?email=${inForm.email}&password=${inForm.password}`)
        .then((response)=>{
          dispatch(loginAction(response.data[0]))
          // dispatch(loginUser(response.data[0]))
          console.log(response.data[0])
          if(response.data[0] == undefined) {
            alert("user unregistered, please register first")
          } else {
            // alert("login success")
            navigate("/home")
          }
        }).catch((error)=>{
          console.log(error)
        })
      } else if (inForm.email){
          Axios.get(`${API_URL}/users?username=${inForm.email}&password=${inForm.password}`)
          .then((response)=>{
            dispatch(loginAction(response.data[0]))
            // dispatch(loginUser(response.data[0]))
            if(response.data[0] == undefined) {
              alert("user unregistered, please register first")
            } else {
              alert("login success")
              navigate("/home")
            }
          }).catch((error)=>{
            console.log(error)
          })
      } else {
        alert("username or email wrong")
      }
    }
  }

  console.log(inForm.email, inForm.password)
  return ReactDOM.createPortal (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit:300 }}
    >
    <div className="modal row" onClick={props.onClose}>
      <div className="col-md-8 col-sm-12">
        <div className="text-center">
          <h1 className="modal-hello">Hello!</h1>
          <h1 className="modal-hello">Welcome Back to Post-it</h1>
          <p className="modal-please">please login your account to continue post-it</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-12">
        <div className="modal-content justify-content-start" onClick={e => e.stopPropagation()}>
          <div className="modal-body">
            {/* {props.children} */}
          <div>
            <button onClick={props.onClose} className="btn modal-btnClose position-absolute top-0 end-0">X</button>
          </div>
            <FormGroup style={{paddingTop:"5%"}}>
                    <Label className="modal-label">Username or Email</Label>
                    <Input type='text'
                        value={inForm.email}
                        onChange={(event) => handleInput(event.target.value, "email")}/>
                </FormGroup>
                <FormGroup>
                    <Label className="modal-label">Password</Label>
                    <InputGroup>
                        <Input type={visibleForm.type}
                            value={inForm.password}
                            onChange={(event) => handleInput(event.target.value, "password")} />
                        <InputGroupText className='btn modal-btn' onClick={handleVisible} >
                          {visibleForm.text}
                        </InputGroupText>
                    </InputGroup>
                    <div className='d-flex justify-content-end'>
                        <a className='btn p-0 modal-forgot'>Forgot password ?</a>
                    </div>
                </FormGroup>
                <Button type='button' className='w-100 mt-4 mb-3 modal-btn'
                  onClick={handleLogin}>
                    Login
                </Button>
          </div>
        </div>
      </div>
    </div>
    </CSSTransition>,
    document.getElementById("root")
  )
}

export default ModalNew;