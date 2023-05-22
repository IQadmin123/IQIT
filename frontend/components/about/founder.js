import React from "react";
import FounderLeft from "./founder-left";
import FounderRight from "./founder-right";

// props recieve from about.js file
const Founder = ({ data }) => {
  const { heading2, text2, founder } = data;
  return (
    <div className="pt-5 pb-5" style={{ backgroundColor: "#f7faff" }}>
      <div className="founders">
        <h2 className="sec_title text-center">{heading2}</h2>
        <p className="text-center pb-5">{text2}</p>
        {founder.map((data, index) =>
          (index + 1) % 2 === 0 ? (
            <FounderLeft data={data} />
          ) : (
            <FounderRight data={data} />
          )
        )}
      </div>
    </div>
  );
};

export default Founder;
