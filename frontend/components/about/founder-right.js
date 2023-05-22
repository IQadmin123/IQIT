import React from "react";
import Image from "next/image";

// props recieve from founder.js file
const FounderRight = ({ data }) => {
  return (
    <div className="founder-hexa-border">
      <div className="hexagon-gallery">
        <div class="hex">
          <Image src={data.image} />
        </div>
      </div>
      <div className="founder-details px-4">
        <h2>{data.name}</h2>
        <h4>{data.designation}</h4>
        <p>{data.about}</p>
      </div>
    </div>
  );
};

export default FounderRight;
