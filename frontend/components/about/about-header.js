import React from "react";
import Image from "next/image";
import About1 from "../../assets/images/founder.jpg";

// props recieve from about.js file
const AboutHeader = ({ data }) => {
  const { heading1, text1 } = data;
  return (
    <div className="container">
      <div className="about-header">
        <div className="about-header1">
          <h2 className="sec_title MB_45 ">{heading1}</h2>
          <p className="sec_desc">{text1}</p>
        </div>
        <div className="about-header2">
          <Image src={About1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
