import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form, Tab } from "react-bootstrap";
import axios from "../../../axiosInstance";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Loader from "../../loader";
import Swal from "sweetalert2";

const CareerTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(5);
  const [jobCategory, setJobCategory] = useState('')
  const [isLoading, setIsLoading] = useState();

  const router = useRouter();

  const handleAddTeam = () => {
    router.push("/dashboard/career/add");
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      console.log(`/view/career/?q=${search}&category_type=${jobCategory}`)
      const response = await axios.get(`/view/career/?q=${search}&category_type=${jobCategory}`);
      console.log(response.data.data);
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
  }, [search, jobCategory]);

  const handleSearchBar = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm);
    setSearchTerm("")   
  };

  const handleEditData = (id) => {
    router.push(`/dashboard/career/edit?id=${id}`);
    console.log("Edit", id);
  };

  const handleDeleteData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/delete/career/${id}`)
          .then(() => {
            setData(data.filter((item) => item.id !== id));
          })
          .catch((err) => {
            console.log(err);
          });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your data has been deleted.",
        });
      }
    });
  };

  const JobCategoryEnums = {
    1:"Front-end developer",
    2:"Back-end developer",
    3:"Ios",
    4:"Android",
    5:"Sales",
  };

  let entries = [];
  for (let i = 0; i < data.length + 5; i++) {
    if (i % 5 === 0 && i > 0) {
      console.log("iteration", i);
      entries.push(i);
    }
  }

  console.log("Select value", select);

  return (
    <section className="commonSection">
      <h2 className="text-center admin_sec_title MB_45">Career</h2>
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
            options={JobCategoryEnum}
            title="Job Category"
            onChange={(e) => setJobCategory(e.target.value)}
          />
        </div>
        <Button
          className="clearBtn"
          variant="danger"
          onClick={() => setSearchTerm("")}
        >
          Clear
        </Button>
        <div className="mb-2 mx-5">
          <Button variant="success" onClick={handleAddTeam}>
            <Icon icon="material-symbols:add" />
            Add Job Post{" "}
          </Button>{" "}
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : data.length > 0 ? (
        <Container className="container-team-table-data">
          <Table
            responsive
            bordered
            size="sm"
            className="career-table-data text-center"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th className="th">Sr. No</th>
                <th className="th2">Role</th>
                <th className="th1">Job Category</th>
                <th className="th3">Location</th>
                <th>Description</th>
                <th>Responsibility</th>
                <th>Requirement</th>
                <th className="th2">Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, ind) => (
                <tr key={data.id}>
                  <td hidden>{data.id}</td>
                  <td>{ind + 1}</td>
                  <td className="align-middle"> {data.role}</td>
                  <td className="align-middle">
                    {" "}
                    {JobCategoryEnums[data.job_category_type]}
                  </td>
                  <td className="align-middle"> {data.location}</td>
                  <td className="align-middle"> {data.description}</td>
                  <td className="align-middle"> {data.responsibility}</td>
                  <td className="align-middle">{data.requirement}</td>
                  <td className="align-middle">{data.created_at}</td>
                  <td className="align-middle">
                    <td style={{ borderStyle: "none" }}>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEditData(data.id)}
                      >
                        Edit
                      </Button>{" "}
                    </td>
                    <td style={{ borderStyle: "none" }}>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeleteData(data.id)}
                      >
                        Delete
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
              {entries.map((entry, ind) => (
                <option value={entry} key={ind}>
                  {entry}
                </option>
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
            className="career-table-data text-justify"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th className="th">Sr. No</th>
                <th className="th2">Role</th>
                <th className="th1">Job Category</th>
                <th className="th3">Location</th>
                <th>Description</th>
                <th>Responsibility</th>
                <th>Requirement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center text-danger" colSpan={8}>
                  Sorry, No rows found!
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      )}
    </section>
  );
};

const JobCategoryEnum = {
  FRONTEND: { value: 1, label: "Front-end developer" },
  BACKEND: { value: 2, label: "Back-end developer" },
  IOS: { value: 3, label: "Ios" },
  ANDROID: { value: 4, label: "Android" },
  SALES: { value: 5, label: "Sales" },
};

function Dropdown({ options, onChange, onBlur }) {
  return (
    <select
      className="input-form required form-select"
      aria-label="Default select example"
      name="job_category_type"
      onChange={onChange}
      onBlur={onBlur}
    >
      <option value="">Choose Job Category</option>
      {Object.values(options).map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default CareerTable;
