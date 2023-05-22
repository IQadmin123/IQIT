import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import axios from "../../../axiosInstance";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Loader from "../../loader";
import Swal from "sweetalert2";
import Link from "next/link";

const TeamTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleAddTeam = () => {
    router.push("/dashboard/team/add");
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/view/team/?q=${search}`);
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
  }, [search]);


  const handleSearchBar = (e) => {   
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(searchTerm)
    console.log(search)
    setSearchTerm("")
  }


  const handleEditData = (id) => {
    router.push(`/dashboard/team/edit?id=${id}`);
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
          .post(`/delete/team/${id}`)
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

  let entries = [];
  for (let i = 0; i < data.length + 5; i++) {
    if (i % 5 === 0 && i > 0) {
      console.log("iteration", i);
      entries.push(i);
    }
  }

  return (
    <section className="commonSection">
      <h2 className="text-center admin_sec_title MB_45">Team</h2>
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
            Add Team Member{" "}
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
            className="team-table-data text-center"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th className="th1">Sr. No</th>
                <th className="th2">Full Name</th>
                <th className="th2">Designation</th>
                <th>Email</th>
                <th>Image</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, ind) => (
                <tr key={ind}>
                  <td hidden>{data.id}</td>
                  <td className="align-middle">{ind + 1}</td>
                  <td className="align-middle">
                    {data.firstname + " " + data.lastname}
                  </td>
                  <td className="align-middle">{data.designation}</td>
                  <td className="align-middle">
                    <Link href={`mailto:${data.email}`}>{data.email}</Link>
                  </td>
                  <td className="align-middle">
                    <img src={data.image} height={80} width={50} />
                  </td>
                  <td className="align-middle">{data.created_at}</td>
                  <td className="align-middle">
                    <span style={{ borderStyle: "none" }}>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEditData(data.id)}
                      >
                        Edit
                      </Button>{" "}
                    </span>
                    <span style={{ borderStyle: "none" }}>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeleteData(data.id)}
                      >
                        Delete
                      </Button>{" "}
                    </span>
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
                <th className="th1">Sr. No</th>
                <th className="th2">Full Name</th>
                <th className="th2">Designation</th>
                <th>Email</th>
                <th>Image</th>
                <th>Action</th>
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
