import React from "react";
import Image from "next/image";
import HomeBanner from "../assets/images/black-background.jpg";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const HomePageBanner = () => {
  return (
    <section className="main-banner ">
      <div className="container text-center homeBanner">
        <h3 className="main-banner__title">
          Custom Web & App Development Services for Your Business
        </h3>
        <p className="main-banner__subtext">
          We help businesses bring their ideas to life with high-quality
          software solutions.
        </p>
        <Link href="/about">
          <span className={`common_btn`}>
            <span>Get a Free Quote</span>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default HomePageBanner;
