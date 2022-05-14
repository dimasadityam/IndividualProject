import Axios from "axios";
import React from "react";
import img1 from "../assets/new/image (1).jpg"
import img2 from "../assets/new/image (2).jpg"
import img3 from "../assets/new/image (3).jpg"
import img4 from "../assets/new/image (4).jpg"
import img5 from "../assets/new/image (5).jpg"
import img6 from "../assets/new/image (6).jpg"
import img7 from "../assets/new/image (7).jpg"
import img8 from "../assets/new/image (8).jpg"
import img9 from "../assets/new/image (9).jpg"
import img10 from "../assets/new/image (10).jpg"
import img11 from "../assets/new/image (11).jpg"
import "../style/galleryLandingPage.css"
import { IoIosHeart } from "react-icons/io"

const Gallery = () =>{

  return(
    <div className="gallery row">
      <div className="col-md-3 col-sm-3">
        <img className="imgGal imgGal1" src={img1} />
        <img className="imgGal" src={img2} />
        <img className="imgGal imgGal5" src={img3} />
      </div>
      <div className="col-md-3 col-sm-3">
        <img className="imgGal imgGal2" src={img4} />
        <img className="imgGal" src={img5} />
        <img className="imgGal imgGal5" src={img6} />
      </div>
      <div className="col-md-3 col-sm-3">
        <img className="imgGal" src={img7} />
        <div>
          <IoIosHeart className="love" />
        </div>
        <img className="imgGal imgGal3" src={img8} />
      </div>
      <div className="col-md-3 col-sm-3">
        <img className="imgGal imgGal4" src={img9} />
        <img className="imgGal" src={img10} />
        <img className="imgGal imgGal5" src={img11} />
      </div>
    </div>
  )
}

export default Gallery