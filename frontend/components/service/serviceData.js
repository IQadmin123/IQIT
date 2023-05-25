import React from "react";
import Image from "next/image";
import ServiceComman from "./serviceComman";

const ServicesData = ({ data }) => {  
  return (
    <div className="serviceArea">
      {data.map((data, index) => (
        <>
          <Image
            src={data.image1}
            alt=""
            width={770}
            height={426}
            style={{ filter: "grayscale(100%)" }}
          />
          <h2>{data.heading}</h2>
          {data.text.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          <ServiceComman image={data.image2} />
        </>
      ))}
    </div>
  );
};

export default ServicesData;
