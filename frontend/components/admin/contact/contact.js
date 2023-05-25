import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const contact = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://6409c3dc6ecd4f9e18ba6bf6.mockapi.io/contact"
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
        <Row>
          <Col className="career-table">
            <table className="table">
              <thead> 
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">
                      {data.id}
                    </th>
                    <td>{data.fname} {data.lname} </td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>{data.message}</td>
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

export default contact;
