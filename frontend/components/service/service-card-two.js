import React from "react";
import Link from "next/link";
import Image from "next/image";

const ServiceCardTwo = ({ data }) => {
  const { url, title, desc , image} = data;
  return (
    <Link href={url} className="text-reset">
      <div className="service-card" style={{backgroundColor:"white"}}>
      <div className="service-card-image">
        <Image src={image} alt="" />
        </div>
        <div className="service-card-detail">
        <h2 className="text-center">{title}</h2>
        <p className="text-center">{desc}</p>
        </div>        
      </div>
    </Link>
  );
};

export default ServiceCardTwo;
