import axios from "../../../axiosInstance";
import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const Edit = () => {
  const [project_name, setProject_name] = useState("");
  const [category_type, setCategory_type] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState({});

  const fileInput = useRef(null);
  const [updateContent, setUpdateContent] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getDataById();
  }, [id]);

  console.log("Project Name", project_name);
  console.log("Category:::::", category_type);
  console.log("Type of Category Type", typeof category_type);
  console.log("Description ", description);
  console.log("image ", image);

  // console.log("First Name ", updateContent[0].firstname)

  const getDataById = async () => {
    try {
      const response = await axios.get(`/get/portfolio/${id}`);
      console.log(response.data.data);
      setUpdateContent(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(":::::::::::::::::::");
    if (updateContent.length > 0) {
      setProject_name(updateContent[0].project_name);
      setCategory_type(updateContent[0].category_type);
      setDescription(updateContent[0].description);
      setImage(updateContent[0].image);
    }
    console.log(":::::::::::::::::::");
  }, [updateContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!project_name) {
      formErrors.project_name = "Project name is required";
    }
    if (!category_type) {
      formErrors.category_type = "Category type is required";
    }
    if (!description) {
      formErrors.description = "Description is required";
    }
    if (!image) {
      formErrors.image = "Image is required";
    }

    setError(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const formData = new FormData();
      formData.append("project_name", project_name);
      formData.append("category_type", category_type);
      formData.append("description", description);

      for (let i = 0; i < image.length; i++) {
        formData.append(`image[${i}]`, image[i]);
      }

      console.log("Form Data =====>", formData);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      try {
        const response = await axios.post(
          `/edit/portfolio/${id}`,
          formData,
          config
        );
        console.log("Updated Response ::: ", response);
        Swal.fire({
          title: "Your work has been saved",         
          icon: "success",
          confirmButtonText: "Cool",
        }).then(() => {
          setTimeout(() => {
            router.push("/dashboard/portfolio/");
          }, 1000);
        });
      } catch (err) {
        console.log(err);
      }
    }
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
    setImage(imagesArray);
  };

  const handleProjectName = (e) => {
    setProject_name(e.target.value);
  };

  const handleCategoryType = (e) => {
    setCategory_type(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAddPortfolio = () => {
    router.push("/dashboard/portfolio/");
  };

  const CategoryList = ["App", "Design", "Web"];

  return (
    <section className="commonSection">
      <div className="container">
        <div className="row">
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
          <div className="col-lg-12 text-center">
            <h2 className="text-uppercase">Update Portfolio</h2>
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
                    id="fname"
                    value={project_name}
                    placeholder="Project Name"
                    onChange={handleProjectName}
                  />
                  {error.project_name && (
                    <p style={{ color: "red" }}>{error.project_name}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <Dropdown
                    options={CategoryEnum}
                    onChange={handleCategoryType}
                  />
                  {error.category_type && (
                    <p style={{ color: "red" }}>{error.category_type}</p>
                  )}
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className="input-form required"
                    type="text"
                    id="lname"
                    value={description}
                    placeholder="Description"
                    onChange={handleDescription}
                  />
                  {error.description && <p style={{color:"red"}}>{error.description}</p>}
                </div> */}
                <div className="col-lg-12 col-md-12 col-sm-12 text-left">
                  <input
                    type="file"
                    multiple
                    id="image"
                    ref={fileInput}
                    className="form-control form-control-lg fileUpload"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleFileChange}
                  />
                  <p>Allowed Type(s): .jpg, .jpeg, .png</p>
                  {error.image && <p style={{ color: "red" }}>{error.image}</p>}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-center mb-2">
                  {image.length > 0 &&
                    image.map((image) =>
                      typeof image === "string" ? (
                        <img
                          src={image}
                          alt="Selected image"
                          className="mt-3 img-thumbnail"
                          height={200}
                          width={200}
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Selected image"
                          className="mt-3 img-thumbnail"
                          height={200}
                          width={200}
                        />
                      )
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

const CategoryEnum = {
  APP: { value: 1, label: "App" },
  DESIGN: { value: 2, label: "Design" },
  WEB: { value: 3, label: "Web" },
};

function Dropdown({ options, onChange }) {
  return (
    <select
      className="input-form admin_input required form-select"
      aria-label="Default select example"
      name="category_type"
      onChange={onChange}
    >
      {Object.values(options).map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Edit;
