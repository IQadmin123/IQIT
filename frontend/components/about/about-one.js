import React from "react";
import { AboutOneData } from "@/data";
import Image from "next/image";

const AboutOne = () => {
  const { sectionContent, gallery, counter } = AboutOneData;
  return (
    <section className="commonSection " style={{ backgroundColor: "#e5e5e5" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12 col-md-6">
            <h4 className="sub_title">{sectionContent.subTitle}</h4>
            <h2 className="sec_title">{sectionContent.title}</h2>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-6">
            <div className="agency_img1">
              <Image src={gallery[0]} alt="" />
            </div>
          </div>
          <div className="col-lg-12 col-sm-12">
            <div className="agency_img2">
              <Image src={gallery[1]} alt="" />
            </div>
            <div className="compay_date">
              <h5>{counter.title}</h5>
              <h2>{counter.number}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOne;
