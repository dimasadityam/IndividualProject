import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText,
        ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';
// import { Link, useNavigate } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from "react-icons/fa"
// import ModalLogin from "./ModalLogin";
import ModalNew from "./Modal"
import "../style/navbar.css"
import "../style/myColor.css"
import styles from "../style/modal.css"

const NavbarComponent = (props) =>{

//   const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dropOpen, setDropOpen] = React.useState(false)
    const [openCollapse, setOpenCollapse] = React.useState(false)
    const [openLogin, setOpenLogin] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const [show, setShow] = React.useState(false);

    const {username, profilepict}=useSelector((state) => {
        return {
          username:state.usersReducer.username,
          profilepict:state.usersReducer.profilepict
        }
      })

    //   console.log("profilepict", profilepict)
    // console.log("show navbar",show)
    return(
        <>
        <div className="gradientNavbar">
            <div className="patternNavbar">

        {/* <ModalNew 
            modalOpen={openLogin}
            toggleOpen={() => setOpenLogin(!openLogin)}
        /> */}
        {/* <ModalLogin
                    modalOpen={openLogin}
                    toggleOpen={() => setOpenLogin(!openLogin)}
                /> */}
                <div className="container" id="navbar">
                    <Navbar className="row" light expand="md">
                        <NavbarBrand href="/home" className="col-12 col-md-10 col-sm-10">
                            <span className="Lexend-Bold">post-it</span>
                            {/* <img src={ logoPYS } style={{width: "150px"}}/> */}
                        </NavbarBrand>
                        <NavbarToggler className="border" onClick={() => setOpenCollapse(!openCollapse)}/>
                        <Collapse navbar isOpen={openCollapse}>
                            <Nav
                                className="me-auto"
                                // className="d-flex justify-content-end"
                                navbar
                                >
                                    <img src={profilepict} style={{width:"30px", borderRadius:"50%"}} alt="profile picture" />
                                    <span className="Lexend ps-2 pt-1" style={{cursor: "pointer"}}
                                        onClick={() => navigate("/profile")}>{username}</span>
                                        {/* <Dropdown isOpen={dropOpen} toggle={()=>setDropOpen(!dropOpen)}>
                                            <DropdownToggle data-toggle="dropdown" tag="span">
                                                <DropdownMenu>
                                                    <DropdownItem>
                                                        Edit Profile
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        Log Out
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </DropdownToggle>
                                        </Dropdown> */}
                                    {/* <a class="cta me-3">
                                        <span onClick={() => setShow(!show)}>Login</span>
                                    </a>
                                    <ModalNew style={{color: "#000000"}} title="My Modal" onClose={() => setShow(!show)} show={show}>
                                        <p>This is modal body2</p>
                                    </ModalNew>
                                    <a href="" class="cta">
                                        <span onClick={() => navigate("/register")}>Register</span>
                                    </a> */}
                                    {/* <NavItem> */}
                                        {/* <NavLink href="#modalLogin">
                                            <span className="nav-link text-white fw-bold"
                                                onClick={() => setOpenLogin(!openLogin)}>
                                                Login
                                            </span>
                                        </NavLink> */}
                                    {/* </NavItem> */}
                                    {/* <NavItem>
                                        <NavLink href="/">
                                            <span className="nav-link text-white fw-bold">
                                                Register
                                            </span>
                                        </NavLink>
                                    </NavItem> */}
                                    {/* <NavbarText className="col-12 col-md-10 col-sm-10">
                                        <ButtonGroup>
                                            <Button color="danger">Login</Button>
                                            <Button color="secondary">Register</Button>
                                        </ButtonGroup>
                                    </NavbarText> */}
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
                <div id="body">

                </div>
            </div>
        </div>
        </>
    )
}

export default NavbarComponent;