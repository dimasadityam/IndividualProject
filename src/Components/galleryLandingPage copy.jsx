import Axios from "axios";
import React from "react";
import img2 from "../assets/img (2).jpg"
import img3 from "../assets/img (3).jpg"
import img4 from "../assets/img (4).jpg"
import img5 from "../assets/img (5).jpg"
import img7 from "../assets/img (7).jpg"
import img9 from "../assets/img (9).jpg"
import img10 from "../assets/img (10).jpg"
import img11 from "../assets/img (11).jpg"
import img12 from "../assets/img (12).jpg"
import img13 from "../assets/img (13).jpg"
import img15 from "../assets/img (15).jpg"
import img17 from "../assets/img (17).jpg"
import img19 from "../assets/img (19).jpg"
import img20 from "../assets/img (20).jpg"
import img21 from "../assets/img (21).jpg"
import "../style/galleryLandingPage.css"

const Gallery = () =>{

  return(
    <div className="gallery">
      <img className="imgGal imgGal4" src={img2} />
      <img className="imgGal" src={img12} />
      <img className="imgGal" src={img5} />
      <img className="imgGal imgGal1" src={img4} />
      <img className="imgGal" src={img3} />
      <img className="imgGal imgGal5" src={img19} />
      <img className="imgGal imgGal2" src={img7} />
      <img className="imgGal" src={img9} />
      <img className="imgGal" src={img11} />
      <img className="imgGal imgGal1" src={img10} />
      <img className="imgGal imgGal4" src={img20} />
      <img className="imgGal" src={img17} />
      <img className="imgGal" src={img21} />
      <img className="imgGal" src={img15} />
      <img className="imgGal" src={img13} />
    </div>
  )
}

export default Gallery