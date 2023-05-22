import React from "react";
import { WhyChooseUsData } from "@/data";

const WhyChooseUs = () => {
  const { sectionContent, cards } = WhyChooseUsData;
  return (
    <section className="pb-3 pt-5">
      <div className="container">
        <div className="row">
          <div className="why-choose-us-header">
            <h2 className="sec_title text-center">{sectionContent.title}</h2>
            <p className="sec_desc text-center">{sectionContent.text}</p>
          </div>
          {cards.map((data, ind) => (
            <div className="col-lg-6 col-sm-8 wh-card">
              <div className="item">
                <span className="icon feature_box_col_four">
                  <i className={data.icon}></i>
                </span>
                <h6>{data.title}</h6>
                <p>{data.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
