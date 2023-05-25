import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SectionTitle from "../section-title";
import PortfolioCard from "./portfolio-card";
import { PortfolioHomeData } from "@/data";
import Link from "next/link";
import axios from "./../../axiosInstance";
import Loader from "../loader";

const PortfolioHome = ({ actionBtn }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { sectionContent, url, btnTitle } = PortfolioHomeData;

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/view/portfolio`);
      console.log("portfolio home::::", response.data.data);
      if (response.data.data) {
        setIsLoading(false);
        setData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="commonSection res-common-section porfolio">
      {isLoading ? (
        <Loader />
      ) : data.length > 0 ? (
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <SectionTitle data={sectionContent} />
            </Col>
          </Row>
          <Row id="Grid">
            <div className="custom">
              <Row>
                {data.slice(0, 3).map((post, index) => (
                  <Col lg={4} md={6} sm={12} key={index}>
                    <PortfolioCard data={post} action_btn={actionBtn} />
                  </Col>
                ))}
              </Row>
            </div>
          </Row>
          <Row className="portfolio-btn">
            <Link className="common_btn red_bg" href={url}>
              <span>{btnTitle}</span>
            </Link>
          </Row>
        </Container>
      ) : null}
    </section>
  );
};

export default PortfolioHome;
