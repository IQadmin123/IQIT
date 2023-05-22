import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "../../axiosInstance";
import Image from "next/image";

const TeamsTable = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`/view/team/`);
      console.log("Teams Response Data", response.data);
      setData(response.data.data);
    } catch (err) {
      console.log("Error Message", err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="commonSection">
      <h2 className="sec_title text-center">Teams Table</h2>
      <Container>
        <Row>
          <Col>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.fullname}</td>
                    <td>{data.email}</td>
                    <td>{data.designation}</td>                                 
                    <td> <Image src={data.image} />                      
                    </td>
                    <td>
                      <div
                        className="teams-btn mt-3 mb-3"
                        style={{ display: "block" }}
                      >
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </td>
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

export default TeamsTable;
