import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const career = () => {
  const initialValues = {
    role: "",
    job_category_type: "",
    job_type: "fulltime",
    location: "Ahmedabad",
    description: "",
    responsibility: "",
    requirement: "",
    errors: {},
  };
  const [formValues, setFormValues] = useState(initialValues);

  const router = useRouter();

  const [touched, setTouched] = useState({
    role: false,
    job_category_type: false,
    job_type: false,
    location: false,
    description: false,
    responsibility: false,
    requirement: false,
  });

  const handleDesignationChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      role: event.target.value,
      errors: {
        ...prevState.errors,
        role: "", // Clear error message on input change
      },
    }));

  const handleDesignationBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      role: true,
    }));
    const errors = {};
    if (!role.trim()) {
      errors.role = "Designation Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleCategoryChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      job_category_type: event.target.value,
      errors: {
        ...prevState.errors,
        job_category_type: "", // Clear error message on input change
      },
    }));

  const handleCategoryBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      job_category_type: true,
    }));
    const errors = {};
    if (!job_category_type.trim()) {
      errors.job_category_type = "Category Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleJobtypeChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      job_type: "fulltime",
      errors: {
        ...prevState.errors,
        job_type: "", // Clear error message on input change
      },
    }));

  const handleJobtypeBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      job_type: false,
    }));
    const errors = {};
    if (!job_type.trim()) {
      errors.job_type = "Jobtype Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleLocationChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      location: "Ahmedabad",
      errors: {
        ...prevState.errors,
        location: "", // Clear error message on input change
      },
    }));

  const handleLocationBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      location: true,
    }));
    const errors = {};
    if (!location.trim()) {
      errors.location = "Location field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleDescriptionChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      description: event.target.value,
      errors: {
        ...prevState.errors,
        description: "", // Clear error message on input change
      },
    }));

  const handleDescriptionBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      description: true,
    }));
    const errors = {};
    if (!description.trim()) {
      errors.description = "Description Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleResponsbilityChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      responsibility: event.target.value,
      errors: {
        ...prevState.errors,
        responsibility: "", // Clear error message on input change
      },
    }));

  const handleResponsbilityBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      responsibility: true,
    }));
    const errors = {};
    if (!responsibility.trim()) {
      errors.responsibility = "Responsbility Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleRequirementChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      requirement: event.target.value,
      errors: {
        ...prevState.errors,
        requirement: "", // Clear error message on input change
      },
    }));

  const handleRequirementBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      requirement: true,
    }));
    const errors = {};
    if (!requirement.trim()) {
      errors.requirement = "Requirement Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      role,
      job_category_type,
      job_type,
      location,
      description,
      responsibility,
      requirement,
    } = formValues;
    const errors = {};
    if (!role.trim()) {
      errors.role = "Designation is required";
    }
    if (!job_category_type.trim()) {
      errors.job_category_type = "Category field is required";
    }
    if (!job_type.trim()) {
      errors.job_type = "Jobtype is required";
    }
    if (!location.trim()) {
      errors.location = "Location is required";
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }
    if (!responsibility.trim()) {
      errors.responsibility = "Responsbility is required";
    }
    if (!requirement.trim()) {
      errors.requirement = "Requirement is required";
    }
    if (Object.keys(errors).length) {
      setFormValues((prevState) => ({ ...prevState, errors }));
    } else {
      try {
        const response = await axios.post("/create/career", {
          role: role,
          job_category_type: job_category_type,
          job_type: job_type,
          location: location,
          description: description,
          responsibility: responsibility,
          requirement: requirement,
        });
        if (response.data.meta.status === 200) {
          Swal.fire({
            title: "Your work has been saved",            
            icon: "success",
            confirmButtonText: "Cool",
          }).then(() => {
            setTimeout(() => {
              router.push("/dashboard/career/");
            }, 1000);
          });
        }
        getClear();
      } catch (err) {
        console.log("Error Message", err);
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        }
      }
    }
  };

  const isFormDataNull = () => {
    return Object.values(formValues).some((value) => value === "");
  };

  const getClear = () => {
    setFormValues(initialValues);
  };

  const handleAddCareer = () => {
    router.push("/dashboard/career/");
  };

  const {
    role,
    job_category_type,
    job_type,
    location,
    description,
    responsibility,
    requirement,
    errors,
  } = formValues;

  return (
    <section className="commonSection ">
      <div className="container ">
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
            <h2 className="text-uppercase">Create Job Vacancy</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-sm-12 col-md-10 offset-md-1">
            <form
              action="#"
              method="post"
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
                    value={formValues.role}
                    onChange={handleDesignationChange}
                    onBlur={handleDesignationBlur}
                  />
                  {console.log("Designation error : ", errors.role)}
                  <p style={{ color: "red" }}>{errors.role}</p>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <Dropdown
                    options={JobCategoryEnum}
                    onChange={handleCategoryChange}
                    onBlur={handleCategoryBlur}
                  />
                  {console.log("Category error : ", errors.job_category_type)}
                  <p style={{ color: "red" }}>{errors.job_category_type}</p>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className="input-form admin_input required"
                    type="text"
                    name="job_type"
                    id="job_type"
                    placeholder="Job Type"
                    value={formValues.job_type}
                    onChange={handleJobtypeChange}
                    onBlur={handleJobtypeBlur}
                  />
                  {console.log("Jobtype error : ", errors.job_type)}
                  <p style={{ color: "red" }}>{errors.job_type}</p>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className="input-form admin_input required"
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Location"
                    value={formValues.location}
                    onChange={handleLocationChange}
                    onBlur={handleLocationBlur}
                  />
                  <p style={{ color: "red" }}>{errors.location}</p>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <textarea
                    className="input-form admin_input required"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Job Description"
                    onChange={handleDescriptionChange}
                    onBlur={handleDescriptionBlur}
                    value={formValues.description}
                  />
                  {console.log("description error : ", errors.description)}
                  <p style={{ color: "red" }}>{errors.description}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <textarea
                    className="input-form admin_input required"
                    type="text"
                    name="responsibility"
                    id="responsibility"
                    placeholder="Responsibility"
                    onChange={handleResponsbilityChange}
                    onBlur={handleResponsbilityBlur}
                    value={formValues.responsibility}
                  />
                  {console.log(
                    "responsibility error : ",
                    errors.responsibility
                  )}
                  <p style={{ color: "red" }}>{errors.responsibility}</p>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <textarea
                    className="input-form admin_input required"
                    type="text"
                    name="requirement"
                    id="requirement"
                    placeholder="Requirement"
                    onChange={handleRequirementChange}
                    onBlur={handleRequirementBlur}
                    value={formValues.requirement}
                  />
                  {console.log("Requirement error : ", errors.requirement)}
                  <p style={{ color: "red" }}>{errors.requirement}</p>
                </div>
              </div>
              <button
                className="admin_common_btn red_bg col-lg-4 col-lg-8 col-sm-6"
                type="submit"
                id="submit"
                style={{ width: "30%" }}
              >
                <span>Create</span>
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

function Dropdown({ options, onChange, onBlur }) {
  return (
    <select
      className="input-form admin_input required form-select"
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

export default career;
