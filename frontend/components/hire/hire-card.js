import React from "react";

const ServiceCardOne = ({ data }) => {
  const { title, iconName, } = data;
  return (
    <div className="text-center hire-card ">
        <div className="iconWrap floating">
        <i className={iconName}></i>
      </div> 
      <h3 >{title}</h3>            
    </div>
  );
};

export default ServiceCardOne;
