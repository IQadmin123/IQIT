import React, { Fragment } from "react";

const SectionTitle = ({ data }) => {
  const { title, subTitle, text } = data;
  return (
    <Fragment>      
      <h2 className="sec_title">{title}</h2>
      <p className="sec_desc">{text}</p>
    </Fragment>
  );
};

export default SectionTitle;
