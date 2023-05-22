import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { CareerHeaders } from "@/data";

const CareerHeader = () => {
    const { header1, header2 } = CareerHeaders;
    return (
        <section className="commonSection career-section-info">
            <Container className="">
                <Row>
                    <Col lg={5} md={12} className="mb-3">
                        <Row>
                            <h2 className="sec_title">{header1.heading}</h2>
                            <p className="sec_desc">{header1.desc}</p>
                            <h4 style={{ textTransform: "uppercase" }}>
                                {header1.title}
                            </h4>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                {header1.list1.map((list, index) => {
                                    return <li key={index}>{list.list}</li>;
                                })}
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                {header1.list2.map((list, index) => {
                                    return <li key={index}>{list.list}</li>;
                                })}
                            </Col>
                            {console.log(header1.list1)}
                        </Row>
                    </Col>
                    <Col lg={7} md={12} className="">
                        <div className="career-card-container text-center">
                            {header2.map((data, index) => (
                                <div className="cards" key={index}>
                                    <div>
                                        <Image
                                            src={data.image}
                                            alt=""
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div>
                                        <h5
                                            style={{
                                                textTransform: "uppercase",
                                                color: "black",
                                            }}
                                        >
                                            {data.head}
                                        </h5>
                                        <p>{data.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CareerHeader;
