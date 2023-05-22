import React from "react";
import Image from "next/image";
import Link from "next/link"
import Ronak from "@/images/team/ronak.jpg"

const TeamCard = ({ data }) => {
  const { image, firstname, lastname, designation,} = data;
  
  return (
    <div className="singleTM">
      <div className="tm_img">
        <img src={image} alt="" width={370} height={409} style={{filter:"grayscale(100%)"}}/>
        <div className="tm_overlay">          
          <div className="detail_TM">
            <h5>{firstname+ " "+ lastname}</h5>
            <h6>{designation}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
