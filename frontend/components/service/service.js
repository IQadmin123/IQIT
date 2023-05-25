import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import ServiceSidebar from "@/components/service/service-sidebar";
import ServicesData from "@/components/service/service-data";

const Service = ({data}) => {
  return (
    <section className="commonSection service_detail">
      <Container>
        <Row>
          <Col lg={8} md={12}>
            <ServicesData data={data} />
          </Col>
          <Col lg={4} md={12} className="sidebar">
            <ServiceSidebar/>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Service;