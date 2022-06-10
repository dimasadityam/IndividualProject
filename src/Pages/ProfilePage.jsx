import Axios from "axios";
import React from "react";
import { API_URL } from "../helper";
import NavbarComponent from "../Components/navbar";
import NavbarComponentProfile from "../Components/navbarProfile";
import "../style/profilePage.css"
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input } from "reactstrap";
import { updateProfileAction, loginAction } from "../redux/action/usersAction";
import { FaUserEdit } from "react-icons/fa"
import ModalDetail from "../Components/ModalDetail";

const ProfilePage=()=>{

  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [dataID, setDataID] = React.useState(0);
  
  
  const { postings }=useSelector((state)=>{
    return{
      postings:state.postingsReducer.postings
    }
  })
  
  const { users, username, fullname, bio, email }=useSelector((state)=>{
    return{
      users:state.usersReducer.users,
      username:state.usersReducer.username,
      fullname:state.usersReducer.fullname,
      bio:state.usersReducer.bio,
      email:state.usersReducer.email,
    }
  })

  const [usernameProfile, setUsernameProfile]=React.useState(username)
  const [fullnameProfile, setFullnameProfile]=React.useState(fullname)
  const [bioProfile, setBioProfile]=React.useState(bio)
  const [emailProfile, setEmailProfile]=React.useState(email)
  
  // if(showModalDetail){
  //   setTimeout(()=> setShowModalDetail(!showModalDetail), 3500)
  // }
  
  console.log("cek dataID",dataID)
  const printMyPost=()=>{

  // <ModalDetail onClose={() => setShowModalDetail(!showModalDetail)} show={showModalDetail} data={dataID} />
  return postings.map((value,index) =>{
    if(value.username == username){
      return <>
        <img className="pictMyPost" src={value.src} alt="my posting"
              onClick={() => {(setShow(!show)); (setDataID(value.idPosting))}}/>
              {/* onClick={() => {(setShow(!show)); (setDataID(value.id))}}/> */}
      </>
    }
  })
}

console.log("showModalDetail", show)
// console.log("edit profile", editProfile)

const printUsers=()=>{
  if(editProfile==false){
    return users.map((value, index) => {
      if(value.username == username){
        return <div key={value.User} className="row">
          <div className="text-center col-md-4">
            <a href="/profile/editprofile">
              <FaUserEdit className="icon-edit" size={45} />
            </a>
            <img src={value.profilepict} style={{width:"45%", borderRadius:"50%"}} className="mt-5" alt="profile picture" />
            <div className="textUsername fw-bold mt-2">{value.username}</div>
          </div>
          <div className="col-md-8 mt-5">
                <div className="textProfile mt-3">{value.fullname}</div>
                <div className="text-thin fw-bold mt-2">{value.bio}</div>
                <div className="text-thin fw-bold mt-2">{value.email}</div>
            </div>
        </div>
      }
    })
  } else {
    return users.map((value, index) => {
      if(value.username == username){
        return <div key={value.idUser} className="row">
          <div className="text-center col-md-5">
            <img src={value.profilepict} style={{width:"35%", borderRadius:"50%"}} className="mt-5" alt="profile picture" />
            <div className="textUsername fw-bold mt-2">{value.username}</div>
          </div>
          <div className="col-md-7 mt-4">
            <Button href="/profile" onClick={handleEditProfile} className="btn-color-save textBtn">Save</Button> 
            <Button onClick={()=> setEditProfile(!editProfile)} className="btn-color-cancel textBtn ms-2">Cancel</Button> 
            <div className="row mt-3">
              <div className="col-md-2">
                <div className="textProfile">Username</div>
              </div>
              <div className="col-md-1">
                <div className="textProfile">:</div>
              </div>
              <div className="col-md-9">
                <Input className="textProfile" type="text" onChange={(e)=>setUsernameProfile(e.target.value)} defaultValue={value.username} />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <div className="textProfile">Full Name</div>
              </div>
              <div className="col-md-1">
                <div className="textProfile">:</div>
              </div>
              <div className="col-md-9">
                <Input className="textProfile" type="text" onChange={(e)=>setFullnameProfile(e.target.value)} defaultValue={value.fullname} />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <div className="textProfile">Biodata</div>
              </div>
              <div className="col-md-1">
                <div className="textProfile">:</div>
              </div>
              <div className="col-md-9">
                <Input type="textarea" className="textProfile" onChange={(e)=>setBioProfile(e.target.value)} defaultValue={value.bio} />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <div className="textProfile">Email</div>
              </div>
              <div className="col-md-1">
                <div className="textProfile">:</div>
              </div>
              <div className="col-md-9">
                <Input className="textProfile" type="text" onChange={(e)=>setEmailProfile(e.target.value)} defaultValue={value.email} />
              </div>
          </div>
            </div>
        </div>
      }
    })
  }
}

// console.log("usernameP", usernameProfile, "fullnameP", fullnameProfile, "bioP", bioProfile, "emailP", emailProfile)
  const handleEditProfile=async()=>{
    try {
      let filterQuery = `?`
      filterQuery+=`username_like=${username}`
      let responseUser = await Axios.get(`${API_URL}/users${filterQuery}`)
      if (responseUser.data < 1){
        console.log("RESPONSE USER DATA", responseUser.data)
        alert("responseUser.data < 1")
        setUsernameProfile(username)
        setFullnameProfile(fullname)
        setBioProfile(bio)
        setEmailProfile(email)

        // console.log("usernameP", usernameProfile, "fullnameP", fullnameProfile, "bioP", bioProfile, "emailP", emailProfile)
        if(usernameProfile=="" || emailProfile==""){
          alert("fill username and email")
        } else {
          let res = await Axios.patch(`${API_URL}/users/2`, {
            username: usernameProfile,
            email: emailProfile,
            fullname: fullnameProfile,
            bio: bioProfile
          })
          console.log("cek res patch profile",res.data)
          dispatch(loginAction(res.data))
          // alert("username not available")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
  <div style={{backgroundColor:"#eef5f4"}}>
    <NavbarComponentProfile />
    <ModalDetail onClose={() => setShow(!show)} show={show} data={dataID} />
    {/* <ModalDetail isOpen={show} data={dataID}/> */}
      <div className="container">
        {/* <div className="row">
          <div className="col-md-4 pt-3"> */}
            <div className="text-center ms-4">
              {/* <div className="textJudul">My Profile</div> */}
            </div>
            <div className="ms-4">
              {printUsers()}
            </div>
              <hr />
          {/* <div className="col-md-8 pt-3"> */}
            <div className="text-center">
              <span className="textJudul" style={{cursor: "pointer"}}>My Post</span>
              <span className="textJudul mx-5">|</span>
              <span className="textJudul" style={{cursor: "pointer"}}>My Like Post</span>
            </div>
            <div>
              {printMyPost()}
            </div>
          </div>
          {/* </div>
        </div> */}
      {/* </div> */}
  </div>
  )
}

export default ProfilePage