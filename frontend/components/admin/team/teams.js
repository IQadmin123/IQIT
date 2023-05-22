import React from "react";
import { TeamOneData } from "@/data";
import Image from "next/image";

const teams = () => {
  const { posts } = TeamOneData;
  return (
    <section className="admin-teams">
    <h2 className="sec_title text-center">Team Members</h2>
      <div className="container">
        <div className="row teams">
          {posts.map((post, index) => (
            <div className=" teams-cards">
              <div className="teams-card-image">
                <Image src={post.image} alt="" width={200} height={250} style={{filter:"grayscale(100%)"}}/>
                <div className="teams-about text-center pt-3">
                    <h5>{post.name}</h5>
                    <h6>{post.designation}</h6>
                </div>
                <div className="teams-btn mt-3 mb-3">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default teams;
