import React from 'react'
import CareerJobInfo from "./career-job-info";
import CareerForm from "./career-form";
import JobInfoCard from "./job-info-card";
import { Container, Row, Col } from "react-bootstrap";

const CareerCard = () => {
  return (
    <Container className="pt-4 pb-4 job-info-container">
            <h1>{title} || Job Details</h1>
            <hr />
            <Row>
                <Col className="col-lg-7 col-md-12 col-sm-12 mb-4">
                    <JobInfoCard
                        category={category}
                        job={"Full Time"}
                        location={location}
                    />
                    <div className="about-role">
                        <h4>About the role</h4>
                        <p>{desc}</p>
                    </div>
                    <div className="mt-3">
                        <h4>Responsibilty</h4>
                        <div>
                            {responsibilty.map((responsibilty, ind) => (
                                <>
                                    <li key={ind}>{responsibilty}</li>
                                </>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="mt-3">Requirement</h4>
                        <div>
                            {requirement.map((requirement, ind) => (
                                <>
                                    <li key={ind}>{requirement}</li>
                                </>
                            ))}
                        </div>
                    </div>
                    <CareerJobInfo />
                </Col>
                <Col className="col-lg-5 col-md-12 col-sm-12">
                    <CareerForm />
                </Col>
            </Row>
        </Container>
  )
}

export default CareerCard;