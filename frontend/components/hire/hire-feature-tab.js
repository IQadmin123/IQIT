import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HireSectionTitle from "@/components/hire/hire-section-title";
import { HireFeatureTabData } from "@/data";
import Image from "next/image";
import Link from "next/link";

const HireFeatureTab = () => {
  const [active, setActive] = useState(0);
  const { sectionContent, posts } = HireFeatureTabData;
  return (
    <section className="commonSection res-common-section chooseUs">
      <Container>
        <Row>
          <Col lg={12} className="text-center">
            <HireSectionTitle data={sectionContent} />
          </Col>
        </Row>
        <div id="tabs">
          <Row >
            <Col lg={3} md={3} sm={12}>
              <ul className=" hire-tab">
                {posts.map(({ title }, index) => (
                  <li
                    key={index}
                    className={`${active === index ? "active" : " "}`}
                  >
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActive(index);
                      }}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col> 
            <Col lg={9} md={9} sm={12}>
            <div className="tab-content">
            {posts.map((post, index) => {
              return index === active ? (
                <div
                  className="tab-pane fade show active animated fadeIn "                 
                  key={index}                  
                >
                  <Row>
                  <Col className="hire-image-col">
                      <div className="hire-image" >
                      {console.log("images",post.image)}
                      {post.image.map(({image, name}, ind)=>(
                        <div className="hire-logo" >
                        <Image src={image} alt={`chose_img-${index}`} className="floating"/>
                        <div>
                        <p>{name}</p>
                        </div>
                        </div>
                      ))}                        
                      </div>
                    </Col>                     
                  </Row>
                </div>
              ) : null;
            })}
          </div>  
            </Col>              
          </Row>                
        </div>
      </Container>
    </section>
  );
};

export default HireFeatureTab;
