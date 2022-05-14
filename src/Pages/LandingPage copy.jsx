import { render } from "@testing-library/react";
import React from "react";
import NavbarComponent from "../Components/navbar";
import Axios from "axios";
import { API_URL } from "../helper"
import Gallery from "../Components/galleryLandingPage";
import ModalLogin from "../Components/ModalLogin";
import "../style/landingPage.css"


const LandingPage = (props) => {

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div className="myBG">
      <NavbarComponent />
        <h1 className="text-center fw-bold pt-3 cGreen"
            style={{textShadow:"2px 2px #ffbb00", letterSpacing:"3px"}}>
              post your story and share
          </h1>
        <h1 className="text-center fw-bold cYellow"
            style={{textShadow:"2px 2px #185B5F", letterSpacing:"3px"}}>
              with your friends !
          </h1>
          <Gallery />
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id="modalLogin">
          {/* <ModalNew isOpen={props.modalOpen} toggle={props.toggleOpen} /> */}
        </div>
      </div>
      </>
  )
}


// class LandingPage extends React.Component{
//   constructor(props){
//     super(props);
    
//   }


//   render(){
//     return (
//       <>
//       <div className="myBG">
//         <NavbarComponent />
//         <h1 className="text-center fw-bold pt-3 cGreen"
//             style={{textShadow:"2px 2px #ffbb00", letterSpacing:"3px"}}>
//               post your story and share
//           </h1>
//         <h1 className="text-center fw-bold cYellow"
//             style={{textShadow:"2px 2px #185B5F", letterSpacing:"3px"}}>
//               with your friends !
//           </h1>
//           <Gallery />
//       </div>
//       <div>
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <div id="modalLogin">
//           <ModalLogin />
//         </div>
//       </div>
//       <footerComponent />
//       </>
//     )
//   }
// }

export default LandingPage