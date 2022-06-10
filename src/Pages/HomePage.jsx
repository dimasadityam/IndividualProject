import Axios from "axios";
import React from "react";
import { API_URL } from "../helper";
import { Button, Card, CardBody, CardHeader, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAction } from "../redux/action/usersAction";
import { loginAction } from "../redux/action/usersAction";
import { useNavigate } from "react-router-dom";
import "../style/homePage.css"
import img7 from "../assets/new/image (7).jpg"
import NavbarComponent from "../Components/navbar";
import { FaRegHeart } from "react-icons/fa"
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"
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
  const [likePost, setLikePost]=React.useState(false);

  console.log("img upload",img)

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const { users, profilepict, postings, comments }=useSelector((state)=>{
    return{
        users:state.usersReducer.users,
        profilepict:state.usersReducer.profilepict,
        postings:state.postingsReducer.postings,
        comments:state.commentsReducer.comments
    }
})
  
console.log("COMMENTS",comments)
  const printPosting=()=>{
    // console.log("cek positngs",postings)
    return postings.map((value,index)=>{
      // console.log("value posting",value.username)
      return <div className="cardNew">
          <div className="cNHeader">
            <img src={profilepict} style={{width:"3%", borderRadius:"50%"}} alt="profile picture" />
            <span className="text" style={{color:"black"}}>{value.username}</span>
          </div>
          <div className="cNBody row">
            {/* <span style={{color:"black"}}>tester</span> */}
          <div className="col-md-5 pb-4">
            <img className="pictPost" style={{cursor:"pointer"}} src={value.src}
                onDoubleClick={()=> setLikePost(!likePost)} alt="posting user" />
          </div>
          {/* <div className="col-md-1 text-center">
            <span className="text">tes</span>
          </div> */}
          <div className="col-md-7 position-relative">
            <div className="row">
              <div className="col-md-1 text-center">
                <div>
                  {
                  likePost == false ?
                  <IoMdHeartEmpty className="mt-1" size={30} style={{color:"#2C987A"}}/>
                  :
                  <IoMdHeart className="mt-1" size={30} style={{color:"#2C987A"}}/>
                }
                </div>
                <span className="text fw-bold" style={{fontSize:"9px", color:"#2C987A"}}>{value.nuberLikes} Likes</span>
              </div>
              <div className="col-md-11">
                <span className="text" style={{color:"black"}}>{value.username} </span>
                <span className="text-thin fw-bold" style={{color:"black"}}>{value.caption}</span>
                <div className="textDate mt-3">{value.createDate}</div>
                <div className="text" style={{color:"black"}}>{comments[1]}</div>
              </div>
            </div>
            {/* <span style={{color:"black"}}>{value.numberLikes}</span> */}
            {/* <div className="position-relative"> */}
            <div className="cNFooter" >
              <Input className="shadow-input" placeholder="Tambahkan Komentar..."/>
            </div>
          </div>
          </div>
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
            bio:"",
            username,
            email,
            password,
            profilepict:"",
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
    <div style={{backgroundColor:"#eef5f4"}}>
    <NavbarComponent />
      <div className="container">
          <div>
            <div className="pt-3">
              {printPosting()}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default HomePage;