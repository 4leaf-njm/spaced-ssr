import React from "react";
import DaumPostCode from "react-daum-postcode";

const style = {
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: "-225px",
  marginLeft: "-300px",
  zIndex: "100",
  overflow: "hidden",
};

const PostCode = ({ onCompleteHandler }) => {
  return (
    <DaumPostCode
      onComplete={onCompleteHandler}
      width={600}
      height={450}
      autoClose
      style={style}
    />
  );
};

export default PostCode;
