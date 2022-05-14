import { render } from "@testing-library/react";
import React from "react";
import Axios from "axios";
import { API_URL } from "../helper"
import Gallery from "../Components/galleryLandingPage";
import ModalLogin from "../Components/ModalLogin";
import "../style/landingPage.css"
import ModalNew from "../Components/Modal";
import { useNavigate } from "react-router-dom";


const LandingPage = (props) => {

  const [isOpen, setIsOpen] = React.useState(false)
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="myBG">
        <div className="patternBG">
          <div className="row">
              <div className="col-12 col-md-7 col-sm-12">
                <Gallery />
              </div>
              <div className="col-12 col-md-5 col-sm-12">
                <h1 className="welcome">Welcome to post-it</h1>
                <p className="tagline">post your story, get the audience engagement,<br /> likes and share to your friends</p>
                <div className="text-center pt-5 pb-3">
                  <button className="btn btn-color fw-bold" type="button"
                    onClick={() => navigate("/register")}> Join post-it now</button>
                </div>
                <div className="text-center">
                  <span className="span">Already a member? </span>
                  <span className="spanLogin" onClick={() => setShow(!show)}>Log in</span>
                  <ModalNew style={{color: "#000000"}} onClose={() => setShow(!show)} show={show} />
                              {/* <p>This is modal body2</p>
                  </ModalNew> */}
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div id="footer">

            </div>
        </div>
      </div>
      </>
  )
}

export default LandingPage