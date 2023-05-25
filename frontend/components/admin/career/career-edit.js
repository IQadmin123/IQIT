import axios from "../../../axiosInstance";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const Edit = () => {
  const [role, setRole] = useState("");
  const [job_category_type, setJob_category_type] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Ahmedabad");
  const [responsibility, setResponsibility] = useState("");
  const [requirement, setRequirement] = useState("");
  const [error, setError] = useState("");

  const [updateContent, setUpdateContent] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getDataById();
  }, [id]);

  console.log("Role", role);
  console.log("Job Cateogory", job_category_type);
  console.log("Description ", description);
  console.log("Location ", location);
  console.log("Responsibility ", responsibility);
  console.log("Requirement ", requirement);

  const getDataById = async () => {
    try {
      const response = await axios.get(`/get/career/${id}`);
      console.log("Getting data form id ===>", response.data.data);
      setUpdateContent(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (updateContent.length > 0) {
      setRole(updateContent[0].role);
      setJob_category_type(updateContent[0].job_category_type);
      setDescription(updateContent[0].description);
      setLocation(updateContent[0].location);
      setResponsibility(updateContent[0].responsibility);
      setRequirement(updateContent[0].requirement);
    }
  }, [updateContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!role) {
      formErrors.role = "Role is required";
    }
    if (!job_category_type) {
      formErrors.job_category_type = "Job category is required";
    }
    if (!description) {
      formErrors.description = "Description is required";
    }
    if (!location) {
      formErrors.location = "Location is required";
    }
    if (!responsibility) {
      formErrors.responsibility = "Responsibility is required";
    }
    if (!requirement) {
      formErrors.requirement = "Requirement is required";
    }

    if (Object.keys(formErrors === 0)) {
      const formData = new FormData();
      formData.append("role", role);
      formData.append("job_category_type", job_category_type);
      formData.append("description ", description);
      formData.append("location ", location);
      formData.append("responsibility ", responsibility);
      formData.append("requirement ", requirement);

      console.log("Form Data =====>", formData);

      try {
        const response = await axios.post(`/edit/career/${id}`, formData);
        console.log("Updated Response ::: ", response.data.data);
        Swal.fire({
          title: "Your work has been saved",          
          icon: "success",
          confirmButtonText: "Cool",
        }).then(() => {
          setTimeout(() => {
            router.push("/dashboard/career/");
          }, 1000);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAddCareer = () => {
    router.push("/dashboard/career/");
  };

  return (
    <section className="commonSection">
      <div className="container">
        <div className="row">
          <div className="text-left mb-2 mx-5" style={{ width: "100%" }}>
            <Button
              variant="secondary"
              onClick={handleAddCareer}
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: "none",
              }}
            >
              <Icon icon="ic:baseline-arrow-back" width="30" /> Back
            </Button>{" "}
          </div>
          <div className="col-lg-12 text-center">
            <h2 className="text-uppercase">Update Job Post</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-sm-12 col-md-10 offset-md-1">
            <form
              action="#"
              method="put"
              className="contactFrom"
              id="contactForm"
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className="input-form admin_input required"
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Job Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  {error.role && <p style={{ color: "red" }}>{error.role}</p>}
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <Dropdown
                    options={JobCategoryEnum}
                    onChange={(e) => setJob_category_type(e.target.value)}
                    optionValue={job_category_type}
                  />
                  {error.job_category_type && (
                    <p style={{ color: "red" }}>{error.job_category_type}</p>
                  )}
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <input
                    className="input-form admin_input required"
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(location)}
                  />
                  {error.location && (
                    <p style={{ color: "red" }}>{error.location}</p>
                  )}
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <textarea
                    className="input-form admin_input required"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Job Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  {error.description && (
                    <p style={{ color: "red" }}>{error.description}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <textarea
                    className="input-form admin_input required"
                    type="text"
                    name="responsibility"
                    id="responsibility"
                    placeholder="Responsibility"
                    onChange={(e) => setResponsibility(e.target.value)}
                    value={responsibility}
                  />
                  {error.responsibility && (
                    <p style={{ color: "red" }}>{error.responsibility}</p>
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-left">
                  <textarea
                    className="input-form admin_input required"
                    type="text"
                    name="requirement"
                    id="requirement"
                    placeholder="Requirement"
                    onChange={(e) => setRequirement(e.target.value)}
                    value={requirement}
                  />
                  {error.requirement && (
                    <p style={{ color: "red" }}>{error.requirement}</p>
                  )}
                </div>
              </div>
              <button
                className="admin_common_btn red_bg col-lg-4 col-md-8 col-sm-12"
                type="submit"
                id="submit"
              >
                <span>Update</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const JobCategoryEnum = {
  BACKEND: { value: 1, label: "Back-end developer" },
  FRONTEND: { value: 2, label: "Front-end developer" },
  IOS: { value: 3, label: "Ios" },
  ANDROID: { value: 4, label: "Android" },
  SALES: { value: 5, label: "Sales" },
};

function Dropdown({ options, onChange, optionValue }) {
  return (
    <select
      className="input-form admin_input required form-select"
      aria-label="Default select example"
      name="job_category_type"
      onChange={onChange}
    >
      {console.log(JobCategoryEnum.FRONTEND.value)}
      {Object.values(options).map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Edit;
