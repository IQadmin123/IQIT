import React, { useEffect, useState, useRef } from "react";
import axios from "../../../axiosInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

const team = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    designation: "",
    image: "",
    errors: {},
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [touched, setTouched] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    designation: false,
    image: false,
  });

  // useRef
  const fileInput = useRef(null);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstname, lastname, email, phone, designation, image } =
      formValues;

    const errors = {};

    if (!firstname.trim()) {
      errors.firstname = "First name is required";
    }
    if (!lastname.trim()) {
      errors.lastname = "Last name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (!designation.trim()) {
      errors.designation = "Designation is required";
    }
    if (!image) {
      errors.image = "File is required";
    }

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("designation", designation);
    formData.append("image", image);
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
        const response = await axios.post("/create/team", formData, config);
        console.log("Team's response data =====>", response.data);

        getClear();
        if (response.data.meta.status === 200) {
          Swal.fire({
            title: "Your work has been saved",            
            icon: "success",
            confirmButtonText: "Cool",
          }).then(() => {
            setTimeout(() => {
              router.push("/dashboard/team/");
            }, 1000);
          });
        }
        fileInput.current.value = null;
      } catch (err) {
        console.log("Error Message ======>>", err);
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

  const getClear = () => {
    setFormValues(initialValues);
  };

  const handleFnameChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      firstname: event.target.value,
      errors: {
        ...prevState.errors,
        firstname: "", // Clear error message on input change
      },
    }));

  const handleFnameBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      firstname: true,
    }));
    const errors = {};
    if (!firstname.trim()) {
      errors.firstname = "First name field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleLnameChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      lastname: event.target.value,
      errors: {
        ...prevState.errors,
        lastname: "", // Clear error message on input change
      },
    }));

  const handleLnameBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      lastname: true,
    }));
    const errors = {};
    if (!lastname.trim()) {
      errors.lastname = "Last name field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleEmailChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      email: event.target.value,
      errors: {
        ...prevState.errors,
        email: "", // Clear error message on input change
      },
    }));

  const handleEmailBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      email: true,
    }));
    const errors = {};
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      errors.email = "Please enter a valid email address";
    } else if (!email.trim()) {
      errors.email = "Email Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handlePhoneChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      phone: event.target.value,
      errors: {
        ...prevState.errors,
        phone: "", // Clear error message on input change
      },
    }));

  const handlePhoneBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      phone: true,
    }));
    const errors = {};
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phone)) {
      errors.name = "'Please enter a 10 digit phone number'";
    } else if (!phone.trim()) {
      errors.phone = "phone Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleDesignationChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      designation: event.target.value,
      errors: {
        ...prevState.errors,
        designation: "", // Clear error message on input change
      },
    }));

  const handleDesignationBlur = () => {
    setTouched((prevState) => ({
      ...prevState,
      designation: true,
    }));
    const errors = {};
    if (!designation.trim()) {
      errors.designation = "Designation Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleFileChange = (event) => {
    const image = event.target.files[0];

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (image && !allowedExtensions.exec(image.name)) {
      const errors = {
        image: "File type not allowed. Allowed types: jpg, jpeg, png",
      };
      setFormValues((prevState) => ({ ...prevState, errors }));
      return;
    }
    setFormValues((prevState) => ({
      ...prevState,
      image: image,
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
      errors.image = "Image Field is required";
    }
    setFormValues((prevState) => ({ ...prevState, errors }));
  };

  const handleAddTeam = () => {
    router.push("/dashboard/team/");
  };

  const { firstname, lastname, email, phone, designation, image, errors } =
    formValues;
  const designationList = [
    "IOS Developer",
    "Android Developer",
    "PHP Developer",
    "Python Developer",
    "React Developer",
    "Angular Developer",
    "BDE",
    "DevOps Engineer",
  ];
  return (
    <section className="commonSection">
      <div className="container ">
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
            <h2 className="text-uppercase">Create Team</h2>
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
                    id="fname"
                    value={firstname}
                    placeholder="First Name"
                    onChange={handleFnameChange}
                    onBlur={handleFnameBlur}
                  />
                  {console.log("Name error : ", errors.firstname)}
                  <p style={{ color: "red" }}>{errors.firstname}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className="input-form admin_input required"
                    type="text"
                    id="lname"
                    value={lastname}
                    placeholder="Last Name"
                    onChange={handleLnameChange}
                    onBlur={handleLnameBlur}
                  />
                  {console.log("Name error : ", errors.lastname)}
                  <p style={{ color: "red" }}>{errors.lastname}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className="input-form admin_input required"
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                  />
                  {console.log("Name error : ", errors.email)}
                  <p style={{ color: "red" }}>{errors.email}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    className="input-form admin_input required"
                    type="tel"
                    id="phone"
                    value={phone}
                    placeholder="Phone"
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                  />
                  {console.log("Name error : ", errors.phone)}
                  <p style={{ color: "red" }}>{errors.phone}</p>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <input
                    className="input-form admin_input required"
                    type="text"
                    name="designation"
                    id="designation"
                    placeholder="Job Role"
                    value={designation}
                    onChange={handleDesignationChange}
                    onBlur={handleDesignationBlur}
                  />
                  {console.log("Designation error : ", errors.designation)}
                  <p style={{ color: "red" }}>{errors.designation}</p>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 text-left">
                  <input
                    type="file"
                    id="image"
                    ref={fileInput}
                    className="form-control form-control-lg fileUpload"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleFileChange}
                    onBlur={handleFileBlur}
                  />
                  {console.log(formValues.image)}
                  {console.log("File error : ", errors.image)}
                  <p style={{ color: "red" }}>{errors.image}</p>
                  <p>Allowed Type(s): .jpg, .jpeg, .png</p>                  
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-center mb-2">
                {formValues.image && (
                  <>
                  <p>Image Preview</p>
                    <img
                      src={URL.createObjectURL(formValues.image)}
                      alt="Selected image"
                      className="mt-3 img-thumbnail"
                      height={200}
                      width={200}
                    />
                    </>
                  )}
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

export default team;
