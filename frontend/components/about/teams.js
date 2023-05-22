import React from "react";
import Image from "next/image";

const Teams = ({ data }) => {
  const { founder } = data;
  return (
    <div className="row">
      <h2 className="sec_title MB_45 text-center" style={{ width: "100%" }}>
        Meet Our Amazing Team
      </h2>
      <div className="team-members">
        {founder
          .sort(() => Math.random() - 0.5)
          .map(({ image }, index) => (
            <div className="team-image" key={index}>
              <Image src={image} alt="" />
            </div>
          ))}
        {founder
          .sort(() => Math.random() - 0.5)
          .map(({ image }, index) => (
            <div className="team-image" key={index}>
              <Image src={image} alt="" />
            </div>
          ))}
        {founder
          .sort(() => Math.random() - 0.5)
          .map(({ image }, index) => (
            <div className="team-image" key={index}>
              <Image src={image} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Teams;
