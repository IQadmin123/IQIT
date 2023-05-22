import React from 'react'
import SectionTitle from "./hire/hire-section-title";
import Image from "next/image"

const ProcessStep = ({data}) => {
    const { sectionContent, posts, image } = data;
    const zeroPad = (num, numZeros) => {
      var n = Math.abs(num);
      var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
      var zeroString = Math.pow(10, zeros).toString().substr(1);
      if (num < 0) {
        zeroString = "-" + zeroString;
      }  
      return zeroString + n;
    };
    return (
      <section className="commonSection res-common-section featured">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-sm-12  col-md-12">
              <div className="features_content">
                <SectionTitle data={sectionContent} />
                {posts.map(({ title, text }, index) => {
                  return (
                    <div className="singleFeature" key={index}>
                      <div className="f_count">{zeroPad(index + 1, 2)}</div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-7 col-sm-12 col-md-12 noPaddingRight">
              <div className="approch_img">
                <Image src={image.path} alt="" />              
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default ProcessStep;