import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import {HireModelData} from "@/data"

const HiringModel = () => {
    const {heading, text, cardsData} = HireModelData
  return (
    <section className="commonSection">
      <Container>
      <h2 className="sec_title MB_45 text-center">{heading}</h2>
      <p className="sec_desc text-center">{text}</p>
        <div className="hiring-model-cards">
        {cardsData.map((data, index)=>(
            <div className="hiring-model-card">               
                <div className="hiring-model-title">
                    <h3>{data.title}</h3>
                    <div className="hiring-model-icon">
                        <div>
                        <Image src={data.image} width={70} height={70} />
                        {console.log("kjhfdkjgdfnjknb",`${data.iconBgColor}`)}
                        </div>
                    </div>
                </div>
                <div className="hiring-model-data">
                    <Row>
                    <Col>
                        <p>{data.houreTile}</p>
                        <h4>{data.hour}</h4>
                    </Col>  
                    <Col>
                        <p>{data.dayTitle}</p>
                        <h4>{data.day}</h4>
                    </Col>                     
                    </Row>
                </div>
            </div>
        ))}          
        </div>
      </Container>
    </section>
  );
};

export default HiringModel;
