import Axios from "axios";
import React from "react"
import { API_URL } from "../helper";
import NavbarComponent from "../Components/navbar";
import NavbarComponentProfile from "../Components/navbarProfile";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input } from "reactstrap";
import { updateProfileAction, loginAction, editUser } from "../redux/action/usersAction";
import "../style/editProfilePage.css"

const EditProfile = () => {

  const dispatch = useDispatch()

  const { users, username, fullname, bio, email }=useSelector((state)=>{
    return{
      users:state.usersReducer.users,
      username:state.usersReducer.username,
      fullname:state.usersReducer.fullname,
      bio:state.usersReducer.bio,
      email:state.usersReducer.email
    }
  })

  const [usernameProfile, setUsernameProfile]=React.useState("")
  const [fullnameProfile, setFullnameProfile]=React.useState("")
  const [bioProfile, setBioProfile]=React.useState("")
  // const [emailProfile, setEmailProfile]=React.useState(email)

  console.log(usernameProfile, fullnameProfile, bioProfile)

  const handleEditProfile=async()=>{
    try {
      // let filterQuery = `?`
      // filterQuery+=`username_like=${username}`
      // let responseUser = await Axios.get(`${API_URL}/users${filterQuery}`)
      // if (responseUser.data < 1){
      //   console.log("RESPONSE USER DATA", responseUser.data)
      //   alert("responseUser.data < 1")
      //   setUsernameProfile(username)
      //   setFullnameProfile(fullname)
      //   setBioProfile(bio)

        console.log(usernameProfile, fullnameProfile, bioProfile, "username", username)
        if(usernameProfile =="" || fullnameProfile =="" || bioProfile ==""){
          let a = usernameProfile;
          let b = fullnameProfile;
          let c = bioProfile;
          let d = username;
          let e = fullname;
          let f = bio;

          let editUsers = editUser(a, b, c, d, e, f)
          dispatch(editUsers)
        } else {
          let a = usernameProfile;
          let b = fullnameProfile;
          let c = bioProfile
          let editUsers = editUser(a, b, c)
          dispatch(editUsers)
          // console.log("cek res patch profile",res.data)
          // dispatch(loginAction(res.data))
          // alert("username not available")
        // }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const printUsers=()=>{
    return users.map((value, index) => {
      if (value.username == username){
        return <div key={value.idUser}>
          <div className="text-center">
            <img src={value.profilepict} className="profile-pict text-center" alt="Profile Picture" /> <br />
          </div>
          <div className="row mt-4">
            <div className="col-md-2">
              <span>Username</span>
            </div>
            <div className="col-md-1">
              <span>:</span>
            </div>
            <div className="col-md-9">
              <div>
                <Input type="text" className="text-input" defaultValue={value.username}
                  onChange={(e)=>setUsernameProfile(e.target.value)} />
              </div>
            </div>
            <div className="col-md-2 mt-3">
              <span>Full Name</span>
            </div>
            <div className="col-md-1 mt-3">
              <span>:</span>
            </div>
            <div className="col-md-9 mt-3">
              <div>
              <Input type="text" className="text-input" defaultValue={value.fullname}
                  onChange={(e)=>setFullnameProfile(e.target.value)} />
              </div>
            </div>
            <div className="col-md-2 mt-3">
              <span>Biodata</span>
            </div>
            <div className="col-md-1 mt-3">
              <span>:</span>
            </div>
            <div className="col-md-9 mt-3">
              <div>
              <Input type="textarea" className="text-input" defaultValue={value.bio}
                  onChange={(e)=>setBioProfile(e.target.value)} />
              </div>
            </div>
            {/* <div className="col-md-2 mt-3">
              <span>Email</span>
            </div>
            <div className="col-md-1 mt-3">
              <span>:</span>
            </div>
            <div className="col-md-9 mt-3">
              <div>
              <Input type="text" className="text-input" defaultValue={value.email}
                  onChange={(e)=>setEmailProfile(e.target.value)} />
              </div>
            </div> */}
          </div>
          <div className="text-center mt-3 pb-2">
            <Button href="/profile" onClick={handleEditProfile} className="btn-color-save textBtn">Save</Button> 
            <Button href="/profile" className="btn-color-cancel textBtn ms-2">Cancel</Button>
          </div>
        </div>
      }
    })
  }
  
  return (
    <div style={{backgroundColor:"#eef5f4"}}>
      <NavbarComponent />
      <div className="container">
        {printUsers()}
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
    </div>
  )
}

export default EditProfile;