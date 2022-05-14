import Axios from "axios";
import React from "react";
import { API_URL } from "../helper";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAction } from "../redux/action/usersAction";
import { loginAction } from "../redux/action/usersAction";
import { useNavigate } from "react-router-dom";
import "../style/homePage.css"
import img7 from "../assets/new/image (7).jpg"
import NavbarComponent from "../Components/navbar";
// import { getUsersAction } from './redux/action/usersAction'

const HomePage=(props)=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername]=React.useState("")
  const [email, setEmail]=React.useState("")
  const [password, setPassword]=React.useState("")
  const [confPassword, setConfPassword]=React.useState("")
  const [selectedIdx, setSelectedIdx] = React.useState(null)
  const [img, setImg]=React.useState();

  console.log("img upload",img)

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const { users, profilepict }=useSelector((state)=>{
    return{
        users:state.usersReducer.users
    }
})

  const printUsers=()=>{
    return users.map((value, index) => {
      return <div key={value.id}>
        <h3>{value.username}</h3>
      </div>
    })
  }

  const handleRegister =async()=>{
    try {
      if (username=="" || email=="" || password=="" || confPassword==""){
        alert("Fill in all form")
      }else{
        if (password!=confPassword){
          alert("Password not match")
        } else if(email.includes("@")){

          let res = await Axios.post(`${API_URL}/users`, {
            fullname:"",
            bio:[],
            username,
            email,
            password,
            profilepict:"",
            likepost:[]
          })
          // console.log("Respon Resgiter", res.data)
          // dispatch(getUsersAction(res.data))
          // Auto Login ketika register berhasil
          dispatch(loginAction(res.data))
          navigate("/")
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
  
  return(
    <div>
    <NavbarComponent />
      <div className="container">
        <Label className="textBold">NAVBAR HOME PAGE</Label>
        <br />
        <input type="file" onChange={onImageChange} />
        <img src={img} alt="" />
        <div className="row">
          <div className="col-md-3" style={{backgroundColor:"#dbcaaa"}}>
            <Label style={{cursor: "pointer"}} onClick={() => navigate("/profile")}>Profile</Label>
            <div className="text-center">
              <img className="profilePict" src={img} />
              <img className="profilePict" src={profilepict} />
            </div>
            <div>
              {/* {printUsers()} */}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className="col-md-9" style={{backgroundColor:"#b4d6c9"}}>
            <Label>Posting from all user</Label>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;