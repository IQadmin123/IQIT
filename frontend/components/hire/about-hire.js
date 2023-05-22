import React from "react";
import { AboutHireData } from "@/data";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const AboutTwo = () => {
  const { sectionContent, button, image } = AboutHireData;
  return (
    <section className="commonSection ab_agency">
      <Container>
        <Row>
          <Col lg={7} md={10} sm={12} className="PR_79">
            <h2 className="sec_title MB_45">{sectionContent.title}</h2>
            <p className="sec_desc">{sectionContent.text}</p>
            <Link className="common_btn red_bg mb-4" href={button.url}>
              <span>{button.label}</span>
            </Link>
          </Col>
          <Col lg={5} md={10} sm={12}>
            <div className="hire-about">
              <Image
                src={image}
                alt=""
                style={{
                  height: "auto",
                  width: "100%",
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutTwo;
