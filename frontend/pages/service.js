import React from "react";
import Image from "next/image";
import websiteImg from "@/images/service/website1.jpg";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import ServiceSidebar from "@/components/service/service-sidebar";
import ServiceComman from "../components/service/serviceComman";
import { ServiceList } from "@/data";
import HeaderOne from "@/components/header-one";
import SearchContextProvider from "@/context/search-context";
import MenuContextProvider from "@/context/menu-context";
import Footer from "@/components/footer";
import Layout from "@/components/layout";

const Service = () => {
  return (
    <>
      <MenuContextProvider>
        <SearchContextProvider>
          <Layout PageTitle="Home One">
            <HeaderOne />
            <section className="commonSection">
            <div className="container">
              <div className="about-header">
                <div className="about-header1">
                  <h2 className="sec_title MB_45 ">Website Development</h2>
                  <p className="sec_desc">
                    IQ Infinite Technologies is an emerging star in the web
                    development field. We strive to fuel all kinds and scales of
                    enterprises with our performance-driven, robust, and
                    reliable web development services. \nOur team of dedicated
                    developers uses different frameworks and technologies for
                    your static or dynamic website requirements. W
                  </p>
                  <Link className="common_btn red_bg" href="/">
                    <span>Contact with us</span>
                  </Link>
                </div>
                <div className="about-header2">
                  <Image src={websiteImg} alt="" />
                </div>
              </div>
            </div>
            <Container className="mb-5">
              <Row>
                <Col lg={8}>
                  <ServiceComman image={ServiceList.service[0].image2} />
                </Col>
                <Col lg={4}>
                  <ServiceSidebar />
                </Col>
              </Row>
            </Container>
            <Footer />
            </section>
          </Layout>
        </SearchContextProvider>
      </MenuContextProvider>
    </>
  );
};

export default Service;
