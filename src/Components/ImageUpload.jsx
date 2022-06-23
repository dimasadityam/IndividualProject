import React, { useState, useRef } from "react";
import { IoImageOutline } from "react-icons/io5";
import { Button, Card, CardBody, CardHeader, FormGroup, Input, InputGroup, Label } from "reactstrap";

const ImageUpload = () => {
  const [image, setImage] = useState("");
  const inputFile = useRef(null);

  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setImage(files[0]);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  console.log("imageimage", image);
  return (
    <div>
      <input
        style={{ display: "none" }}
        // accept=".zip,.rar"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <IoImageOutline style={{color:"#2C9779", marginLeft:"100px",
          marginTop:"0px", cursor:"pointer"}} size={27}
          onClick={onButtonClick}
      />
      <Label className="label-register2 mt-3 ms-1" style={{color:"#1b8768"}}>Photo</Label>
      {/* <div className="button btn-primary" onClick={onButtonClick}>
        Upload
      </div> */}
    </div>
  );
};

export default ImageUpload;