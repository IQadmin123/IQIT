import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "./../../axiosInstance";
import Loader from "./../loader";
import { useRouter } from "next/router";


const Portfolio = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  let id = ""
  if (typeof window !== "undefined" && window.localStorage) {
    id = localStorage.getItem("portfolio_id")
    }

    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`get/portfolio/${id}`);
        console.log("this data get from ID :::",response.data.data);
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
    }, [id]);
  
  return (
    <section className="commonSection porfolioDetail">
      {isLoading ? (
                <Loader />
            ) : data.length > 0 ? (
                data.map((data => (
      <Container>
        <Row>
          <Col lg={8} md={8} sm={12} className="m-auto">
            <div className="singlePortfoio_content text-center">              
              <h2 className="sec_title"><u>{data.project_name}</u></h2>
              <p className="sec_desc">{data.description}</p>
            </div>            
              <div className="portDetailThumb">
                <img alt="portDetailThumb" src={data.image} />
              </div>            
          </Col>          
        </Row>
      </Container>
       ))) 
       ) : null}
    </section>
  );
};

export default Portfolio;
