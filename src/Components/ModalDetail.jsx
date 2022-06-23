import React, {useEffect} from "react";
import Axios from "axios";
import { 
  Button, FormGroup, Input, InputGroup,
  InputGroupText, Label, Modal, ModalBody ,Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { API_URL } from "../helper.js"
import { useDispatch, useSelector } from "react-redux";
import "../style/modalDetail.css"
import "../style/myColor.css"
import { loginAction, loginUser } from "../redux/action/usersAction.js";
import { useNavigate } from 'react-router-dom';
import { RiCloseLine } from "react-icons/ri"
// import styles from "../style/modal.css"
import ReactDOM from "react-dom"
import {CSSTransition} from "react-transition-group"
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"
import { GoKebabHorizontal } from "react-icons/go"
import { getLikePostings, getFilterPostings } from "../redux/action/postingsAction";


const ModalDetail = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [detail, setDetail] = React.useState({});
  const [thumbnail, setThumbnail] = React.useState(0);
  const [likePost, setLikePost]=React.useState(false);
  const [editPost, setEditPost]=React.useState(false);
  const [dropOpen, setDropOpen] = React.useState(false)

  const { likeposts, username, profilepict, postings }=useSelector((state)=>{
    return{
      likeposts:state.postingsReducer.likeposts,
      username:state.usersReducer.username,
      profilepict:state.usersReducer.profilepict,
      postings:state.postingsReducer.postings
    }
})

React.useEffect(()=>{
  dispatch(getFilterPostings());
  dispatch(getLikePostings());
  // dispatch(getUsers());
}, [])

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

  const handleSaveEdit = async () =>{
    try {
      let res = await Axios.post(`${API_URL}/users/`, {
        
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = () => {
    if(inForm.email== "" || inForm.password== ""){
      alert("Fill in all form")
    } else {
      console.log("inForm username", inForm.username)
      if(inForm.email.includes("@")){
        Axios.get(`${API_URL}/users?email=${inForm.email}&password=${inForm.password}`)
        .then((response)=>{
          localStorage.setItem("tokenIdUser", response.data[0].idUser)
          dispatch(loginAction(response.data[0]))
          // dispatch(loginUser(response.data[0]))
          console.log("res data login email",response.data[0])
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
          localStorage.setItem("tokenIdUser", response.data[0].idUser)
          dispatch(loginAction(response.data[0]))
          // dispatch(loginUser(response.data[0]))
          console.log("res data login username",response.data[0])
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

  const renderImages = () => {
    let { images } = detail
    return images.map((item, index) =>{
      return (
        <div>
          <img className="select-image mb-1 shadow bg-white rounded" src={item}
                    key={index}
                    width="100%"
                    onClick={() => setThumbnail(index)}
                    style={{ borderBottom: thumbnail == index && "3px solid #407AB1" }}
                />
        </div>
      )
    })
  }

  // console.log("props",props)
  // console.log("props.data",props)
  // console.log("thumbnail", thumbnail)
  // return postings.map((value,index)=>{
  //   // console.log("value id",value.id, value.username, username, index)
  //   if (value.username == username){
  const printLikepostModal=()=>{
    return likeposts.map((value,index)=>{
      console.log("likepost",value.idposting == props.data)
    if (value.idposting == props.data.toString()){
      return <div style={{paddingLeft:"100px"}}>
        <div className="cardNew">
          {
            editPost == false ?
          <>
            <div className="cNHeader row">
              <div className="col-md-10">
                <img src={profilepict} style={{width:"3%", borderRadius:"50%"}} alt="profile picture"
                  key={value.idPosting} onClick={() => setThumbnail(value.idPosting)}/>
                <span className="text" style={{color:"black"}}>{value.username}</span>
              </div>
              <div className="col-md-1">
                <GoKebabHorizontal size={20} style={{color:"#1f2531", marginLeft:"150px", cursor:"pointer"}} onClick={()=> setDropOpen(!dropOpen)} />
                <Dropdown isOpen={dropOpen} toggle={() => setDropOpen(!dropOpen)}>
                    <DropdownToggle data-toggle="dropdown" tag="span">
                      <DropdownMenu>
                        <DropdownItem>
                            <span onClick={() => setEditPost(!editPost)}>Edit Posting</span>
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>
                        <span onClick={() => setDropOpen(!dropOpen)}>Delete Posting</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </DropdownToggle>
                </Dropdown>
              </div>
          </div>
          <div className="cNBody row">
          <div className="col-md-5 pb-4">
            <img className="pictPost" style={{cursor:"pointer"}} src={value.src}
                onDoubleClick={()=> setLikePost(!likePost)} alt="posting user" />
          </div>
          <div className="col-md-7 position-relative">
            <div className="row">
              <div className="col-md-1 text-center">
                <>
                  {
                    likePost == false ?
                    <IoMdHeartEmpty className="mt-1" size={30} style={{color:"#2C987A"}}/>
                    :
                    <IoMdHeart className="mt-1" size={30} style={{color:"#2C987A"}}/>
                  }
                </>
                <span className="text fw-bold" style={{fontSize:"9px", color:"#2C987A"}}>{value.nuberLikes} Likes</span>
              </div>
              <div className="col-md-11">
              <span className="text" style={{color:"black"}}>{value.username} </span>
              <span className="text-thin fw-bold" style={{color:"black"}}>{value.caption}</span>
              <div className="textDate mt-3">{value.createDate}</div>
              </div>
            </div>
            <div className="cNFooter" >
              <Input className="shadow-input" placeholder="Tambahkan Komentar..."/>
            </div>
          </div>
        </div>
          </>
          :
          <>
            <div className="cNHeader row">
              <div className="col-md-10">
                <img src={profilepict} style={{width:"3%", borderRadius:"50%"}} alt="profile picture"
                  key={value.idposting} onClick={() => setThumbnail(value.idposting)}/>
                <span className="text" style={{color:"black"}}>{value.username}</span>
              </div>
              <div className="col-md-1">
                <div className="btn-group">
              <Button className="btn-color-modal mt-3" onClick={()=> setEditPost(!editPost)} type="button"
                style={{fontFamily:"Lexend"}}>Save</Button>
              <Button className="btn-color-modal-cancel mt-3" onClick={()=> setEditPost(!editPost)} type="button"
                style={{fontFamily:"Lexend"}}>Cancel</Button>
                </div>
                {/* <GoKebabHorizontal size={20} style={{color:"#1f2531", marginLeft:"1450px", cursor:"pointer"}} onClick={()=> setEditPost(!editPost)} /> */}
              </div>
          </div>
          <div className="cNBody row">
          <div className="col-md-5 pb-4">
            <img className="pictPost" style={{cursor:"pointer"}} src={value.src}
                onDoubleClick={()=> setLikePost(!likePost)} alt="posting user" />
          </div>
          <div className="col-md-7 position-relative">
            <div className="row">
              <div className="col-md-1 text-center">
                <>
                  {
                    likePost == false ?
                    <IoMdHeartEmpty className="mt-1" size={30} style={{color:"#2C987A"}}/>
                    :
                    <IoMdHeart className="mt-1" size={30} style={{color:"#2C987A"}}/>
                  }
                </>
                <span className="text fw-bold" style={{fontSize:"9px", color:"#2C987A"}}>{value.nuberLikes} Likes</span>
              </div>
              <div className="col-md-11">
              <span className="text" style={{color:"black"}}>{value.username} </span>
              <Input size={90} type="text" className="text-thin fw-bold" style={{color:"black"}} defaultValue={value.caption}/>
              <div className="textDate mt-3">{value.createDate}</div>
              </div>
            </div>
            <div className="cNFooter" >
              <Input className="shadow-input" placeholder="Tambahkan Komentar..."/>
            </div>
          </div>
        </div>
          </>
        }
        </div> 
      </div> 
      }
    })
  }
  const printMypostModal=()=>{
    return postings.map((value,index)=>{
      console.log("mypost", value.idposting == props.data)
    if (value.idposting == props.data.toString()){
      return <div style={{paddingLeft:"100px"}}>
        <div className="cardNew">
          {
            editPost == false ?
          <>
            <div className="cNHeader row">
              <div className="col-md-10">
                <img src={profilepict} style={{width:"3%", borderRadius:"50%"}} alt="profile picture"
                  key={value.idPosting} onClick={() => setThumbnail(value.idPosting)}/>
                <span className="text" style={{color:"black"}}>{value.username}</span>
              </div>
              <div className="col-md-1">
                <GoKebabHorizontal size={20} style={{color:"#1f2531", marginLeft:"150px", cursor:"pointer"}} onClick={()=> setDropOpen(!dropOpen)} />
                <Dropdown isOpen={dropOpen} toggle={() => setDropOpen(!dropOpen)}>
                    <DropdownToggle data-toggle="dropdown" tag="span">
                      <DropdownMenu>
                        <DropdownItem>
                            <span onClick={() => setEditPost(!editPost)}>Edit Posting</span>
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>
                        <span onClick={() => setDropOpen(!dropOpen)}>Delete Posting</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </DropdownToggle>
                </Dropdown>
              </div>
          </div>
          <div className="cNBody row">
          <div className="col-md-5 pb-4">
            <img className="pictPost" style={{cursor:"pointer"}} src={value.src}
                onDoubleClick={()=> setLikePost(!likePost)} alt="posting user" />
          </div>
          <div className="col-md-7 position-relative">
            <div className="row">
              <div className="col-md-1 text-center">
                <>
                  {
                    likePost == false ?
                    <IoMdHeartEmpty className="mt-1" size={30} style={{color:"#2C987A"}}/>
                    :
                    <IoMdHeart className="mt-1" size={30} style={{color:"#2C987A"}}/>
                  }
                </>
                <span className="text fw-bold" style={{fontSize:"9px", color:"#2C987A"}}>{value.nuberLikes} Likes</span>
              </div>
              <div className="col-md-11">
              <span className="text" style={{color:"black"}}>{value.username} </span>
              <span className="text-thin fw-bold" style={{color:"black"}}>{value.caption}</span>
              <div className="textDate mt-3">{value.createDate}</div>
              </div>
            </div>
            <div className="cNFooter" >
              <Input className="shadow-input" placeholder="Tambahkan Komentar..."/>
            </div>
          </div>
        </div>
          </>
          :
          <>
            <div className="cNHeader row">
              <div className="col-md-10">
                <img src={profilepict} style={{width:"3%", borderRadius:"50%"}} alt="profile picture"
                  key={value.idposting} onClick={() => setThumbnail(value.idposting)}/>
                <span className="text" style={{color:"black"}}>{value.username}</span>
              </div>
              <div className="col-md-1">
                <div className="btn-group">
              <Button className="btn-color-modal mt-3" onClick={()=> setEditPost(!editPost)} type="button"
                style={{fontFamily:"Lexend"}}>Save</Button>
              <Button className="btn-color-modal-cancel mt-3" onClick={()=> setEditPost(!editPost)} type="button"
                style={{fontFamily:"Lexend"}}>Cancel</Button>
                </div>
                {/* <GoKebabHorizontal size={20} style={{color:"#1f2531", marginLeft:"1450px", cursor:"pointer"}} onClick={()=> setEditPost(!editPost)} /> */}
              </div>
          </div>
          <div className="cNBody row">
          <div className="col-md-5 pb-4">
            <img className="pictPost" style={{cursor:"pointer"}} src={value.src}
                onDoubleClick={()=> setLikePost(!likePost)} alt="posting user" />
          </div>
          <div className="col-md-7 position-relative">
            <div className="row">
              <div className="col-md-1 text-center">
                <>
                  {
                    likePost == false ?
                    <IoMdHeartEmpty className="mt-1" size={30} style={{color:"#2C987A"}}/>
                    :
                    <IoMdHeart className="mt-1" size={30} style={{color:"#2C987A"}}/>
                  }
                </>
                <span className="text fw-bold" style={{fontSize:"9px", color:"#2C987A"}}>{value.nuberLikes} Likes</span>
              </div>
              <div className="col-md-11">
              <span className="text" style={{color:"black"}}>{value.username} </span>
              <Input size={90} type="text" className="text-thin fw-bold" style={{color:"black"}} defaultValue={value.caption}/>
              <div className="textDate mt-3">{value.createDate}</div>
              </div>
            </div>
            <div className="cNFooter" >
              <Input className="shadow-input" placeholder="Tambahkan Komentar..."/>
            </div>
          </div>
        </div>
          </>
        }
        </div> 
      </div> 
      }
    })
  }
  
  // const printModal = () => {
  //   return postings.map((val,idx)=>{
  //     console.log('VALL', val)
  //     console.log("val",val.idposting, "==", props.data)
  //     if(val.idposting == props.data) {
  //       return printMypostModal()
  //     } else if(val.idposting !== props.data) {
  //       return likeposts.map((valLike, idxLike)=>{
  //         if(valLike.idposting == props.data){
  //           return printLikepostModal()
  //         }
  //       })
  //     }
  //   })
  // }

  // console.log(inForm.email, inForm.password)
  return ReactDOM.createPortal (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit:300 }}
    >
    <div className="modal" onDoubleClick={props.onClose}>
      {printMypostModal()}
      {printLikepostModal()}
      {/* {printModal()} */}
    {/* {
    props.data ?
        // printMyPost()
      :
          // printLikePost()
    } */}
    </div>
    </CSSTransition>,
    document.getElementById("root")
  )
}

export default ModalDetail;