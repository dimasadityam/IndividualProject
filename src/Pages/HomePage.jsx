import Axios from "axios";
import React from "react";
import { API_URL } from "../helper";
import { Button, Card, CardBody, CardHeader, FormGroup, Input, InputGroup, Label } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, getUsersAction } from "../redux/action/usersAction";
import { loginAction } from "../redux/action/usersAction";
import { useNavigate } from "react-router-dom";
import "../style/homePage.css"
import img7 from "../assets/new/image (7).jpg"
import NavbarComponent from "../Components/navbar";
import { FaRegHeart } from "react-icons/fa"
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"
import { IoImageOutline } from "react-icons/io5"
import { getPostings } from "../redux/action/postingsAction";
import ImageUpload from "../Components/ImageUpload";
// import { getUsersAction } from './redux/action/usersAction'

const HomePage=(props)=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername]=React.useState("")
  const [email, setEmail]=React.useState("")
  const [password, setPassword]=React.useState("")
  const [confPassword, setConfPassword]=React.useState("")
  const [img, setImg]=React.useState();
  const [imgPost, setImgPost]=React.useState("");
  const [likePost, setLikePost]=React.useState(false);
  const [imgPosting, setImgPosting] = React.useState([]);
  const [file, setFile] = React.useState();
  const [caption, setCaption]=React.useState("")
  const [previewPost, setPreviewPost] = React.useState(false)
  const inputFile = React.useRef(null);
  // const [idusers, setIdusers]=React.useState(users[0].iduser)


  // console.log("img upload",img)

  React.useEffect(()=>{
    dispatch(getPostings());
    // dispatch(getUsers());
  }, [])

  const onImageChange = (e) => {
    const file = e.target.files[0];
    // console.log("onImageChange",e.target.file);
    setImg(URL.createObjectURL(file));
  };

  function handleChange(e) {
    console.log("targetFiles", e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const { users, profilepict, postings, comments, token }=useSelector((state)=>{
    return{
        users:state.usersReducer.users,
        profilepict:state.usersReducer.profilepict,
        postings:state.postingsReducer.postings,
        comments:state.commentsReducer.comments,
        token:state.usersReducer.token
    }
})
  
// console.log("COMMENTS",comments)
// console.log("cek positngs",postings)
// console.log("cek users",users)
// console.log("cek TOKEN", token)
const printPosting=()=>{
  return postings.map((value,index)=>{
      // console.log("cekcek",value.iduser, users.iduser)
      // console.log(value.iduser == users[index].iduser)
      return <div className="cardNew">
          <div className="cNHeader">
            <img src={profilepict} style={{width:"3%", borderRadius:"50%"}}
              alt="profile picture"
            />
              <span className="text" style={{color:"black"}}>
                {value.username}
              </span>
          </div>
          <div className="cNBody row">
            {/* <span style={{color:"black"}}>tester</span> */}
          <div className="col-md-4 pb-4">
            <img className="pictPost" style={{cursor:"pointer"}} src={value.src}
                onDoubleClick={()=> setLikePost(!likePost)} alt="posting user" />
          </div>
          {/* <div className="col-md-1 text-center">
            <span className="text">tes</span>
          </div> */}
          <div className="col-md-8 position-relative">
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

  const onBtAddImgPosting = () =>{
    let temp = [...imgPosting]
    temp.push("")
    setImgPosting(temp)
    console.log(imgPosting)
  }

  const handleImgPosting = (e, index) => {
    console.log("e",e, "e.target.files", e.target.files);
    let temp = [...imgPosting]
    temp[index] = e.target.files[0]
    setImgPosting(temp)
    setFile(URL.createObjectURL(e.target.files[0]))
}

  const onBtDeleteImgPosting = (index) => {
  let temp = [...imgPosting]
  temp.splice(index, 1)
  setImgPosting(temp)
  setFile()
}

const handleFileUpload = (e) => {
  // const { files } = e.target;
  // if (files && files.length) {
  //   const filename = files[0].name;

  //   var parts = filename.split(".");
  //   const fileType = parts[parts.length - 1];
  //   console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

    setImgPosting(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]))
  // }
};

console.log("previewPost", previewPost)
const onButtonClick = () => {
  inputFile.current.click();
  setPreviewPost(!previewPost)
};

console.log("idusersLogin", users)
const handleSubmit = async()=>{
  try {
    let iduserLogin = users[0].iduser
    let formData = new FormData()
      let data = {
        caption,
        iduserLogin
        
      }
      console.log('data', data)
      // menambahkan data kedalam formData yang harus pake JSON.stringify
      formData.append('data', JSON.stringify(data));

      // menambahkan images
      imgPosting.forEach(val=>formData.append('imgPosting', val));
      let resPosting = await Axios.post(`${API_URL}/postings/`, formData)
      // let a = formData
      console.log("resPosting", resPosting.data)
      dispatch(getPostings())
      // navigate("/home")
    }
  catch (error) {
    console.log(error)
  }
}

console.log("cek imgPosting",imgPosting)
console.log("cek file",file)

  const printImgPosting = () => {
    if (imgPosting.length > 0) {
        return imgPosting.map((item, index) => {
            return <>
            <div className='d-flex my-2'>
                <Input
                    type="file"
                    onChange={(e) => {handleImgPosting(e,index)}}
                    // onChange={(e) => {handleImgPosting(e, index); {onImageChange()}}}
                />
                {/* <a className="btn btn-outline-danger" onClick={() => onBtDeleteImgPosting(index)} style={{ cursor: 'pointer' }}>Delete</a> */}
                <Button className="btn-color-cancel textBtn ms-2"
                  onClick={() => onBtDeleteImgPosting(index)}>Cancel</Button>
            </div>
                <img sizes={100} src={file}/>
            </> 
        })
    }
}
  
  return(
    <div style={{backgroundColor:"#eef5f4"}}>
    <NavbarComponent />
      <div className="container">
          <div>
            <div className="pt-3">
              <div className="cardNew container">
                {/* <div className="cNHeader"> */}
                  <FormGroup>
                  </FormGroup>
                {/* </div> */}
                {
                  previewPost == true ?
                  <div className="cNBody pt-3 row">
                    {/* <InputGroup> */}
                    <div className="col-1">
                        <img src={profilepict} style={{width:"40px", borderRadius:"50%"}}
                          alt="profile picture"
                        />
                    </div>
                    <div className="col-2">
                      <img style={{height:"300px", borderRadius:"5%"}} src={file}/>
                    </div>
                    <div className="col-9">
                      <Input className="ms-3" type="text" placeholder="What's Happening"
                        onChange={(e)=>setCaption(e.target.value)} style={{backgroundColor:"#dadfde"}}/>
                      <div className="row">
                        <div className="col-8">
                          <InputGroup>
                            {/* <ImageUpload /> */}
                            <input
                              style={{ display: "none" }}
                              // accept=".zip,.rar"
                              ref={inputFile}
                              onChange={(e)=> handleFileUpload (e)}
                              type="file"
                            />
                            <IoImageOutline style={{color:"#2C9779", marginLeft:"50px",
                              marginTop:"10px", cursor:"pointer"}} size={27}
                              // onClick={onBtAddImgPosting}
                              onClick={onButtonClick}
                            />
                            <Label className="label-register2 mt-3 ms-1" style={{color:"#1b8768"}}>Photo</Label>
                          </InputGroup>
                        </div>
                        <div className="col-4">
                          <Button style={{marginLeft:"130px", marginTop:"8px"}} className="btn-color-save textBtn"
                            onClick={handleSubmit}
                            >Upload</Button>
                          <div style={{marginLeft:"82px"}}>
                            {
                              printImgPosting()
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                <div className="cNBody pt-3 row">
                  {/* <InputGroup> */}
                  <div className="col-1">
                      <img src={profilepict} style={{width:"40px", borderRadius:"50%"}}
                        alt="profile picture"
                      />
                  </div>
                  <div className="col-11">
                    <Input className="ms-3" type="text" placeholder="What's Happening"
                      onChange={(e)=>setCaption(e.target.value)} style={{backgroundColor:"#dadfde"}}/>
                    <div className="row">
                      <div className="col-8">
                        <InputGroup>
                          {/* <ImageUpload /> */}
                          <input
                            style={{ display: "none" }}
                            // accept=".zip,.rar"
                            ref={inputFile}
                            onChange={(e)=> handleFileUpload (e)}
                            type="file"
                          />
                          <IoImageOutline style={{color:"#2C9779", marginLeft:"50px",
                            marginTop:"10px", cursor:"pointer"}} size={27}
                            // onClick={onBtAddImgPosting}
                            onClick={onButtonClick}
                          />
                          <Label className="label-register2 mt-3 ms-1" style={{color:"#1b8768"}}>Photo</Label>
                        </InputGroup>
                      </div>
                      <div className="col-4">
                        <Button style={{marginLeft:"130px", marginTop:"8px"}} className="btn-color-save textBtn"
                          onClick={handleSubmit}
                          >Upload</Button>
                        <div style={{marginLeft:"82px"}}>
                          {
                            printImgPosting()
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                }
                  {/* </InputGroup> */}
              </div>
            </div>
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