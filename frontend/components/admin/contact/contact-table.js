import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import axios from "../../../axiosInstance";
import Loader from "../../loader";
import { useRouter } from "next/router";

const TeamTable = () => {
  const [data, setData] = useState([]);
  const [links, setLinks] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const getData = async () => {
    setIsLoading(true);
    try {
      console.log(`/view/contact_details/?q=${search}&status=${status}`);
      const response = await axios.get(
        `/view/contact_details/?status=${status}&q=${search}`
      );
      console.log(response.data.data);
      if (response.data.data) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setData(response.data.data);
        setLinks(response.data.links);
        console.log("Links", response.data.links);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [search, status]);

  const handleSearchBar = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm);
    setSearchTerm("");
  };

  const handleEditStatus = (id) => {
    router.push(`/dashboard/contact/edit?id=${id}`);
    console.log("Edit", id);
  };

  const handleClear = () => {
    setSearchTerm("")
    setStatus("")
  }

  let entries = [];
  for (let i = 0; i < data.length + 5; i++) {
    if (i % 5 === 0 && i > 0) {
      console.log("iteration", i);
      entries.push(i);
    }
  }

  const contactStatus = ["read", "unread"];

  return (
    <section className="commonSection">
      <h2 className="text-center admin_sec_title MB_45">Contact Us</h2>
      <div className="serach-form mb-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchBar}
            />
          </Form.Group>
        </Form>
        <div className="statusDropdown">
          <select
            className="input-form required form-select text-capitalize"
            aria-label="Default select example"
            name="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            {contactStatus.map((option, ind) => (
              <option value={ind}>{option}</option>
            ))}
          </select>
        </div>
        <Button
          className="clearBtn"
          variant="danger"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>

      {isLoading ? (
        <Loader />
      ) : data.length > 0 ? (
        <Container className="container-team-table-data">
          <Table
            responsive
            bordered
            size="sm"
            className="team-table-data text-center"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th className="th1">Sr No.</th>
                <th className="th1">Full Name</th>
                <th className="th2">Email Address</th>
                <th className="th2">Phone Number</th>
                <th>Message</th>
                <th>Contact Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, ind) => (
                <tr key={data.id}>
                  <td hidden>{data.id}</td>
                  <td>{ind + 1}</td>
                  <td> {data.firstname + " " + data.lastname}</td>
                  <td> {data.email}</td>
                  <td> {data.phone}</td>
                  <td>{data.message}</td>
                  <td>{data.created_at}</td>
                  <td className="text-capitalize">
                    
                    <Form>
                      <Form.Check 
                        type="switch"
                        id={data.id}
                        checked={data.status === "read" ? true : false}  
                        onChange={() => handleEditStatus(data.id)}
                        label={data.status}
                        // label= {data.status}                     
                      />                      
                    </Form>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <label htmlFor="show">Show</label>
            <select
              name="show"
              className="show-entries"
              onChange={(e) => setSelect(e.target.value)}
            >
              {entries.map((entry, ind) => (
                <option value={entry} key={ind}>{entry}</option>
              ))}
            </select>
            <span>entries</span>
          </div>
          {/* <Link></Link> */}
        </Container>
      ) : (
        <Container className="container-team-table-data">
          <Table
            responsive
            bordered
            size="sm"
            className="career-table-data text-center"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th className="th1">Sr No.</th>
                <th className="th1">Full Name</th>
                <th className="th2">Email Address</th>
                <th className="th2">Phone Number</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center text-danger" colSpan={6}>
                  Sorry, No recods found!
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      )}
    </section>
  );
};
export default TeamTable;
