import React from "react";
import Link from "next/link";

const ServiceCardOne = ({ data }) => {
  const { title, text, iconName, url } = data;
  return (
    <div className="icon_box_2 text-center">
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="iconWrap">
        <i className={iconName}></i>
      </div>
      <Link href={url}>
        <span>discover more</span>
      </Link>
    </div>
  );
};

export default ServiceCardOne;
