import React from "react";
import Link from "next/link";

const CallToActionOne = ({ extraClassName, buttonClass }) => {
  return (
    <section className={`commonSection ${extraClassName}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-sm-12 col-md-7">
            <h2 className="sec_title white">Let's Get Your Project Started!</h2>
          </div>
          <div className="col-lg-4  col-sm-12 col-md-5 text-right">
            <Link href="/contact">
              <span className={`common_btn ${buttonClass}`}>
                <span>Contact with us</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionOne;
