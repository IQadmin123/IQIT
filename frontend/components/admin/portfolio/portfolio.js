import React, { useEffect, useState, useRef } from "react";
import axios from "../../../axiosInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

const porfolio = () => {
  const initialValues = {
    category_type: "",
    project_name: "",
    description: "",
    image: "",
    errors: {},
  };
  const [formValues, setFormValues] = useState(initialValues);

  const [touched, setTouched] = useState({
    project_name: "",
    category_type: "",
    description: "",
    image: false,
  });


  // useRef
  const fileInput = useRef(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { category_type, project_name, description, image } = formValues;
    const errors = {};

    if (!project_name.trim()) {
      errors.project_name = "Name is required";
    }
    if (!category_type.trim()) {
      errors.category_type = "Type field is required";
    }
    if (!description.trim()) {
      errors.description = "Description field is required";
    }
    if (image.length === 0) {
      errors.file = "At least one file is required";
    }

    // Handle form submission
    const formData = new FormData();
    formData.append("category_type", category_type);
    formData.append("project_name", project_name);
    formData.append("description", description);

    for (let i = 0; i < image.length; i++) {
      formData.append(`image[${i}]`, image[i]);
    }

    console.log(formValues);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (Object.keys(errors).length) {
      setFormValues((prevState) => ({ ...prevState, errors }));
    } else {
      try {
        const response = await axios.post(
          "/create/portfolio",
          formData,
          config
        );
        console.log("Portfolio's response data =====>", response.data);
        getClear();
        if (response.data.meta.status === 200) {
          Swal.fire({
            title: "Your work has been saved",            
            icon: "success",
            confirmButtonText: "Cool",
          }).then(() => {
            setTimeout(() => {
              router.push("/dashboard/portfolio/");
            }, 1000);
          });
        }
        fileInput.current.value = null;
      } catch (err) {
        console.log("Error Message ======>", err);
      }
    }
  };

  const getClear = () => {
    setFormValues(initialValues);
  };

  const handleTypeChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      category_type: event.target.value,
      errors: {
        ...prevState.errors,
        category_type: "", // Clear error message on input change
      },
    }));

  const handleTypeBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      category_type: true,
    }));
    const errors = {};
    if (!category_type.trim()) {
      errors.category_type = "type field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleNameChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      project_name: event.target.value,
      errors: {
        ...prevState.errors,
        project_name: "", // Clear error message on input change
      },
    }));

  const handleNameBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      project_name: true,
    }));
    const errors = {};
    if (!project_name.trim()) {
      errors.project_name = "Name Field is required";
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

  const handleFileChange = (event) => {
    const image = event.target.files;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    let hasError = false;
    const imagesArray = [...image];

    imagesArray.forEach((image) => {
      if (image && !allowedExtensions.exec(image.name)) {
        hasError: true;
      }
    });

    if (hasError) {
      const errors = {
        image: "File type not allowed. Allowed types: jpg, jpeg, png",
      };
      setFormValues((prevState) => ({ ...prevState, errors }));
      return;
    }

    setFormValues((prevState) => ({
      ...prevState,
      image: imagesArray,
      errors: {
        ...prevState.errors,
        image: "", // Clear error message on input change
      },
    }));
  };

  const handleFileBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      image: true,
    }));
    const errors = {};
    if (!image) {
      errors.image = "File Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleAddPortfolio = () => {
    router.push("/dashboard/portfolio/");
  };

  const handleCategoryChange = (e) => {
    console.log("Selected Category: ", e.target.value);
  };

  const { category_type, project_name, description, image, errors } =
    formValues;
  const CategoryList = ["App", "Design", "Web"];

  return (
    <section className="commonSection ">
      <div className="container ">
        <div className="text-left mb-2 mx-5" style={{ width: "100%" }}>
          <Button
            variant="secondary"
            onClick={handleAddPortfolio}
            style={{
              backgroundColor: "transparent",
              color: "black",
              border: "none",
            }}
          >
            <Icon icon="ic:baseline-arrow-back" width="30" /> Back
          </Button>{" "}
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="text-uppercase">Create Portfolio</h2>
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
                    name="project_name"
                    id="name"
                    placeholder="Project Name"
                    value={project_name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                  />
                  {console.log(
                    "Name => touch error : ",
                    touched.project_name,
                    "and",
                    errors.project_name
                  )}
                  <p style={{ color: "red" }}>{errors.project_name}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <Dropdown
                    options={CategoryEnum}
                    onChange={handleTypeChange}
                    onBlur={handleTypeBlur}
                  />
                  {console.log(errors.category_type)}
                  <p style={{ color: "red" }}>{errors.category_type}</p>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <input
                    className="input-form required"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Project Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    onBlur={handleDescriptionBlur}
                  />
                  {console.log(
                    "Description => touch error : ",
                    touched.description,
                    "and",
                    errors.description
                  )}
                  <p style={{ color: "red" }}>{errors.description}</p>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 text-left">
                  <input
                    type="file"
                    id="image"
                    ref={fileInput}
                    multiple
                    className="form-control form-control-lg fileUpload"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleFileChange}
                    onBlur={handleFileBlur}
                  />
                  {console.log("File error : ", errors.image)}
                  <p style={{ color: "red" }}>{errors.image}</p>
                  <p>Allowed Type(s): .jpg, .jpeg, .png  (width:370 & height:409)</p>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-center mb-2">
                  {image.length > 0 &&
                    image.map((url) => (
                      <img
                        key={url}
                        src={URL.createObjectURL(url)}
                        alt="Selected image"
                        className="mt-3 img-thumbnail"
                        height={200}
                        width={200}
                      />
                    ))}
                </div>
              </div>
              <button
                className="admin_common_btn red_bg col-lg-4 col-md-8 col-sm-12"
                type="submit"
                id="submit"
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

const CategoryEnum = {
  APP: { value: 1, label: "App" },
  DESIGN: { value: 2, label: "Design" },
  WEB: { value: 3, label: "Web" },
};

function Dropdown({ options, onChange, onBlur }) {
  return (
    <select
      className="input-form admin_input required form-select"
      aria-label="Default select example"
      name="category_type"
      onChange={onChange}
      onBlur={onBlur}
    >
      <option value="" selected>
        Category
      </option>
      {Object.values(options).map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default porfolio;
