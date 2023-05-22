import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import axios from "./../../../axiosInstance";
import { useRouter } from "next/router";
import Loader from "../../loader";
import { Icon } from "@iconify/react";
import Link from "next/link";

const ApplicantTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [select, setSelect] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  console.log({ Status: status, "Job Position": jobPosition });

  const router = useRouter();

  const getData = async () => {
    setIsLoading(true);
    try {
      console.log(`/view/candidates?status=${status}&q=${search}`)
      const response = await axios.get(
        `/view/candidates?status=${status}&q=${search}`
      );
      console.log(response.data.data);
      if (response.data.data) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        setData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [status, search]);

  const handleSearchBar = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(searchTerm)
    setSearchTerm("")
  }

  const handleEditData = (id) => {
    router.push(`/dashboard/career/candidate/edit?id=${id}`);
    console.log("Edit", id);
  };

  let entries = [];
  for (let i = 0; i < data.length + 5; i++) {
    if (i % 5 === 0 && i > 0) {
      console.log("iteration", i);
      entries.push(i);
    }
  }

  const StatusEnums = {
    new: "New",
    telephonic: "Telephonic",
    hr_round: "Hr Round",
    technical_round: "Technical Round",
    final_round: "Final Round",
    accepted: "Accepted",
    rejected: "Rejected",
  };

  return (
    <section className="">
      <h2 className="text-center admin_sec_title MB_45">Applicant</h2>
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
          <Dropdown
            options={StatusEnum}
            title="Status"
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <Button
          className="clearBtn"
          variant="danger"
          onClick={() => setSearchTerm("")}
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
                <th className="th">Sr. No</th>
                <th className="th2">Full Name</th>
                <th className="th1">Email</th>
                <th className="th3">Phone</th>
                <th>Job Position</th>
                <th>File Url</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, ind) => (
                <tr key={data.id}>
                  <td hidden>{data.id}</td>
                  <td>{ind + 1}</td>
                  <td className="align-middle"> {data.fullname}</td>
                  <td className="align-middle">
                    <Link href={`mailto:${data.email}`}>{data.email}</Link>
                  </td>

                  <td className="align-middle">{data.phone}</td>
                  <td className="align-middle">{data.job_position}</td>
                  <td className="align-middle">
                    <a href={data.file_url} target="_blank" download>
                      <Icon icon="material-symbols:download-sharp" />
                    </a>
                  </td>
                  <td className="align-middle"> {StatusEnums[data.status]}</td>
                  <td>{data.created_at}</td>
                  <td className="align-middle">
                    <td style={{ borderStyle: "none" }}>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEditData(data.id)}
                      >
                        Update Status
                      </Button>{" "}
                    </td>
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
              {entries.map((entry) => (
                <option value={entry}>{entry}</option>
              ))}
            </select>
            <span>entries</span>
          </div>
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
                <th className="th">Sr. No</th>
                <th className="th2">Full Name</th>
                <th className="th1">Email</th>
                <th className="th3">Phone</th>
                <th>Job Position</th>
                <th>File Url</th>
                <th>Status</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center text-danger" colSpan={8}>
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

const StatusEnum = {
  NEW: { value: "new", label: "New" },
  TELEPHONIC: { value: "telephonic", label: "Telephonic" },
  HRROUND: { value: "hr_round", label: "Hr Round" },
  TECHNICALROUND: { value: "technical_round", label: "Technical Round" },
  FINALROUND: { value: "final_round", label: "Final Round" },
  ACCEPTED: { value: "accepted", label: "Accepted" },
  REJECTED: { value: "rejected", label: "Rejected" },
};

function Dropdown({ options, onChange, onBlur, title }) {
  return (
    <select
      className="input-form required form-select"
      aria-label="Default select example"
      name="status"
      onChange={onChange}
      onBlur={onBlur}
    >
      <option value="">{title}</option>
      {Object.values(options).map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default ApplicantTable;
