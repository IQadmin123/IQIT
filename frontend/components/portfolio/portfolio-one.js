import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PortfolioCard from "./portfolio-card";
import SectionTitle from "@/components/section-title";
import { PortfolioHomeData } from "@/data";
import axios from "./../../axiosInstance";
import Loader from "./../loader";

const PortfolioOne = () => {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { sectionContent } = PortfolioHomeData;

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/view/portfolio/");
      console.log(response.data.data);
      if (response.data.data) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
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
    <section className="commonSection porfolioPage">
      {isLoading ? (
        <Loader />
      ) : Data.length > 0 ? (
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <SectionTitle data={sectionContent} />
            </Col>
          </Row>
          <Row id="Grid">
            <div className="custom">
              <Row>
                {Data.map((post, index) => (
                  <Col lg={4} md={6} sm={12} key={index}>
                    <PortfolioCard data={post} />
                  </Col>
                ))}
              </Row>
            </div>
          </Row>
        </Container>
      ) : null}
    </section>
  );
};

export default PortfolioOne;
