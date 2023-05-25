import React from "react";
import { PortfolioData } from "@/data";
import Image from "next/image";

const portfolios = () => {
  return (
    <section>
      <div className="container portfolioContent">
        <div className="row">
          {PortfolioData.map((post, index) => (
            <div className="portfolioCard">
              <div className="portfolioImage">
                <Image
                  src={post.image}
                  alt={post.title}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="portfolio-title">
                <h4 className="" style={{ color: "black" }}>
                  {post.categories.map((cat) => cat + ", ")}
                </h4>
                <h4>{post.title}</h4>
              </div>
              <div className="teams-btn mt-3 mb-3" style={{ display: "block" }}>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default portfolios;
