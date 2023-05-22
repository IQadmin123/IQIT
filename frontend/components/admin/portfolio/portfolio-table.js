import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import axios from "../../../axiosInstance";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Loader from "../../loader";
import Swal from "sweetalert2";

const PortfolioTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");

  const router = useRouter();

  const handleAddTeam = () => {
    router.push("/dashboard/portfolio/add");
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      console.log(`/view/portfolio/?category_type=${category}&q=${search}`)
      const response = await axios.get(`/view/portfolio/?category_type=${category}&q=${search}`);
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
  }, [search, category]);

  const handleSearchBar = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
    console.log("Search Item",searchTerm)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(searchTerm)
    setSearchTerm("")
  }

  const handleCategory = (e) => {
    setCategory(e.target.value)
    console.log("Category choosen",category)
  }

  const handleEditData = (id) => {
    router.push(`/dashboard/portfolio/edit?id=${id}`);
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
          .post(`delete/portfolio/${id}`)
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

  const CategoryList = ["App", "Design", "Web"];

  let entries = [];
  for (let i = 0; i < data.length + 5; i++) {
    if (i % 5 === 0 && i > 0) {
      // console.log("iteration", i);
      entries.push(i);
    }
  }

  const CategoryEnums = {
    1: "App",
    2: "Design",
    3: "Web",
  };

  // console.log("Enumber", CategoryEnums[1]);

  return (
    <section className="commonSection">
      <h2 className="text-center admin_sec_title MB_45">Portfolio</h2>
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
            options={CategoryEnum}
            title="Category"
            onChange={handleCategory}
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
            Add Portfolio{" "}
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
                <th className="th2">Project Name</th>
                <th className="th2">Category Type</th>
                {/* <th>Description</th> */}
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
                  <td className="align-middle"> {data.project_name}</td>
                  <td className="align-middle">
                    {" "}
                    {CategoryEnums[data.category_type]}
                  </td>

                  <td className="align-middle">
                    {data.image.map((image) => (
                      <img
                        src={image}
                        height={80}
                        width={70}
                        style={{ padding: "5px" }}
                      />
                    ))}
                  </td>
                  <td className="align-middle">{data.created_at}</td>
                  <td className="align-middle">
                    <td
                      className="align-middle"
                      style={{ borderStyle: "none" }}
                    >
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
                <th>Sr. No</th>
                <th>Project Name</th>
                <th>Category Type</th>
                <th>Description</th>
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

const CategoryEnum = {
  APP: { value: 1, label: "App" },
  DESIGN: { value: 2, label: "Design" },
  WEB: { value: 3, label: "Web" },
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


export default PortfolioTable;
