import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HireCardOne from "@/components/hire/hire-card";
import { ServiceHireData, ServiceHireData1 } from "@/data";
import SectionTitle from "../section-title";

const ServiceHomeTwo = () => {
  return (
    <section className="service_section_2 commonSection res-common-section" style={{ backgroundColor: " #faf9f7" }}>
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <SectionTitle data={ServiceHireData1} />
          </Col>
        </Row>
        <Row>
        <Col className="service-hire-card" >
          {ServiceHireData.map((post, index) => (            
              <HireCardOne data={post} key={index}/>            
          ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceHomeTwo;
