import React from "react";
import Link from "next/link";
import { TrustClientData } from "@/data";
import Image from "next/image"

const TrustedClient = ({ extraClassName }) => {
  const { image, title, text, url } = TrustClientData;
  return (
    <section className={`commonSection trustClient ${extraClassName}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="CL_content">
              <Image src={image} alt="" />
              <div className="abc_inner">
                <div className="row">
                  <div className="col-lg-5 col-sm-12 col-md-5"></div>
                  <div className="col-lg-7 col-sm-12 col-md-7">
                    <div className="abci_content ">
                      <h2>{title}</h2>
                      <p>{text}</p>                                 
                      <Link href={url}>
                        <span className="common_btn red_bg">
                          <span>Learn More</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedClient;
