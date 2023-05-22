import axios from "../../../axiosInstance";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const Edit = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState({});

  const fileInput = useRef(null);
  const [updateContent, setUpdateContent] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getDataById();
  }, [id]);

  console.log("First Name", firstname);
  console.log("Last Name", lastname);
  console.log("Email ", email);
  console.log("Designation ", designation);
  console.log("image ", image);

  const getDataById = async () => {
    try {
      const response = await axios.get(`/get/team/${id}`);
      console.log(response.data.data);
      setUpdateContent(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(":::::::::::::::::::");
    if (updateContent.length > 0) {
      setFirstname(updateContent[0].firstname);
      setLastname(updateContent[0].lastname);
      setEmail(updateContent[0].email);
      setDesignation(updateContent[0].designation);
      setImage(updateContent[0].image);
    }
    console.log(":::::::::::::::::::");
  }, [updateContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!firstname) {
      formErrors.firstname = "First name is required";
    }
    if (!lastname) {
      formErrors.lastname = "Last name is required";
    }
    if (!email) {
      formErrors.email = "Email is required";
    }
    if (!designation) {
      formErrors.designation = "Designation is required";
    }
    if (!image) {
      formErrors.image = "Image is required";
    }
    setError(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("designation", designation);
      formData.append("image", image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      try {
        const response = await axios.post(`/edit/team/${id}`, formData, config);
        console.log("Updated Response ::: ", response);
        Swal.fire({
          title: "Your work has been saved",          
          icon: "success",
          confirmButtonText: "Cool",
        }).then(() => {
          setTimeout(() => {
            router.push("/dashboard/team/");
          }, 1000);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFirstName = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastName = (e) => {
    setLastname(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleDesignation = (e) => {
    setDesignation(e.target.value);
  };

  const handleAddTeam = () => {
    router.push("/dashboard/team/");
  };

  return (
    <section className="commonSection">
      <div className="container">
        <div className="row">
          <div className="text-left mb-2 mx-5" style={{ width: "100%" }}>
            <Button
              variant="secondary"
              onClick={handleAddTeam}
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
            <h2 className="text-uppercase">Update Team</h2>
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
                    className={`input-form admin_input required ${
                      error.firstname ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="fname"
                    value={firstname}
                    placeholder="First Name"
                    onChange={handleFirstName}
                    // style={{height:"50px"}}
                  />
                  {error.firstname && (
                    <p style={{ color: "red" }}>{error.firstname}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className={`input-form admin_input required ${
                      error.lastname ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="lname"
                    value={lastname}
                    placeholder="Last Name"
                    onChange={handleLastName}
                  />
                  {error.lastname && (
                    <p style={{ color: "red" }}>{error.lastname}</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className={`input-form admin_input required ${
                      error.email ? "is-invalid" : ""
                    }`}
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmail}
                  />
                  {error.email && <p style={{ color: "red" }}>{error.email}</p>}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className={`input-form admin_input required ${
                      error.designation ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="designation"
                    id="designation"
                    placeholder="Job Role"
                    value={designation}
                    onChange={handleDesignation}
                  />
                  {error.designation && (
                    <p style={{ color: "red" }}>{error.designation}</p>
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-left">
                  <input
                    type="file"
                    id="image"
                    ref={fileInput}
                    className="form-control form-control-lg fileUpload"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                  <p>Allowed Type(s): .jpg, .jpeg, .png</p>
                  {error.image && <p style={{ color: "red" }}>{error.image}</p>}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-center mb-2">
                  {typeof image === "string" ? (
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

export default Edit;
