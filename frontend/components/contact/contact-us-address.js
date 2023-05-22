import React from "react";
import { Address } from "@/data";
import { Container, Row, Col } from "react-bootstrap";

const TrustedClient = () => {
  return (
    <section
      className="pt-3 pb-3 mt-3 mb-5"
    >
      <Container>
        <Row className="contact-add">
          <Col lg={6} md={6} sm={12}>
            {Address.address.map(({ icon, title, text }, index) => (
              <div className="address">
                <span>
                  <i class={`fa fa-${icon}`}></i>
                </span>
                <span>{title}</span>
                <p>{text}</p>
              </div>
            ))}
          </Col>
          <Col lg={6} md={6} sm={12}>            
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.6384379897286!2d72.5236259145928!3d23.073713484927165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e833d1e1690f3%3A0xd9259ac03c9ebf7f!2sIQ%20Infinite%20Technologies!5e0!3m2!1sen!2sin!4v1679044439600!5m2!1sen!2sin"
                style={{border:"0"}}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="map"
              ></iframe>            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TrustedClient;
