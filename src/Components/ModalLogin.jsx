import React from "react";
import Axios from "axios";
import { 
  Button, FormGroup, Input, InputGroup,
  InputGroupText, Label, Modal, ModalBody 
} from "reactstrap";
import { API_URL } from "../helper.js"
import { useDispatch } from "react-redux";
import "../style/modal.css"
import "../style/myColor.css"
import { loginAction } from "../redux/action/usersAction.js";
import { useNavigate } from 'react-router-dom';

const ModalLogin = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = React.useState(false)
  const [inForm, setInForm] = React.useState({
    email: '',
    password: ''
  })
  
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
          navigate("/home")
        }).catch((error)=>{
          console.log(error)
        })
      } else {
        alert("Email Wrong")
      }
    }
  }

  return (
    <Modal isOpen={props.modalOpen} toggle={props.toggleOpen}>
      <ModalBody className="gradient">
                <h5 className='mb-4 mt-3 fw-bold'>Login with your account</h5>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='text'
                        value={inForm.email}
                        onChange={(event) => handleInput(event.target.value, "email")}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <InputGroup>
                        <Input type={visibleForm.type}
                            value={inForm.password}
                            onChange={(event) => handleInput(event.target.value, "password")} />
                        <InputGroupText className='btn btn-secondary' onClick={handleVisible} >
                          {visibleForm.text}
                        </InputGroupText>
                    </InputGroup>
                    <div className='d-flex justify-content-end'>
                        <a className='btn p-0' style={{color:"white"}}>Forgot password ?</a>
                    </div>
                </FormGroup>
                <Button type='button' className='w-100 mt-4 mb-3 colorSecondary'
                  onClick={handleLogin}>
                    Login
                </Button>
            </ModalBody>
    </Modal>
  )
}

export default ModalLogin;