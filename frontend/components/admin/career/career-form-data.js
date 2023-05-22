import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const CareerFormData = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://6409c3dc6ecd4f9e18ba6bf6.mockapi.io/career"
      );      
      console.log("Response Data =>", response.data);
      setData(response.data);
      console.log("Data ", data);
    } catch (err) {
      console.log("Error Message ", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="commonSection">
      <Container>
        <h1 className="text-center text-uppercase mb-5">Applications</h1>
        <Row>
          <Col className="career-table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Applied For</th>
                  <th scope="col">Cover Letter</th>
                  <th scope="col">File</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {data.id}
                    </th>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>{data.designation}</td>
                    <td>{data.coverLetter}</td>
                    <td>{data.file}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CareerFormData;
