import React from "react";
import { AboutData } from "@/data";
import AboutHeader from "./about-header";
import Team from "./teams";

const About = () => {
  return (
    <section className="commonSection" style={{ paddingBottom: "30px" }}>
      <AboutHeader data={AboutData} />
      <Team data={AboutData} />
    </section>
  );
};

export default About;
