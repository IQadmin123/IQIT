import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const JobInfoCard = (prop) => {
  return (
    <div>
      <Row>
        <Col>
         
            <p>
              <i className="fa fa-bars pr-3" aria-hidden="true"></i>Job Category: {prop.category}
            </p>
            <p>
              <i className="fa fa-briefcase pr-3" aria-hidden="true"></i>Job Type: {prop.job}              
            </p>
            <p>
              <i className="fa fa-map-marker pr-3" aria-hidden="true"></i>Job Location: {prop.location} 
            </p>
          
        </Col>
      </Row>
    </div>
  );
};

export default JobInfoCard;
