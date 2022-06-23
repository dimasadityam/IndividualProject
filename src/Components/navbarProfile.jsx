import React from "react";
import {
    Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText,
    ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink
} from 'reactstrap';
// import { Link, useNavigate } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
// import ModalLogin from "./ModalLogin";
// import ModalNew from "./Modal"
import "../style/navbar.css"
import "../style/myColor.css"
// import styles from "../style/modal.css"
import { logoutAction } from "../redux/action/usersAction"

const NavbarComponentProfile = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dropOpen, setDropOpen] = React.useState(false)
    const [openCollapse, setOpenCollapse] = React.useState(false)
    const [openLogin, setOpenLogin] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const [show, setShow] = React.useState(false);

    const { username, profilepict } = useSelector((state) => {
        return {
            username: state.usersReducer.username,
            profilepict: state.usersReducer.profilepict
        }
    })

    // console.log("dropOpen", dropOpen)
    // console.log("profilepict", profilepict)
    // console.log("show navbar", show)
    return (
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
                            <NavbarToggler className="border" onClick={() => setOpenCollapse(!openCollapse)} />
                            <Collapse navbar isOpen={openCollapse}>
                                <Nav
                                    className="me-auto"
                                    // className="d-flex justify-content-end"
                                    navbar
                                >
                                    {/* <span>profile</span> */}
                                    <img src={profilepict} style={{ width: "15%", borderRadius: "50%" }} alt="profile picture" />
                                    <span className="Lexend ps-2 pt-1" style={{ cursor: "pointer" }} onClick={() => setDropOpen(!dropOpen)}>{username}</span>
                                    <Dropdown isOpen={dropOpen} toggle={() => setDropOpen(!dropOpen)}>
                                        <DropdownToggle data-toggle="dropdown" tag="span">
                                            <DropdownMenu>
                                                <DropdownItem href="/profile/editprofile">
                                                    Edit Profile
                                                </DropdownItem>
                                                <DropdownItem divider/>
                                                <DropdownItem href="/" onClick={()=>dispatch(logoutAction())}>
                                                    Log Out
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </DropdownToggle>
                                    </Dropdown>
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

export default NavbarComponentProfile;