import React, { useEffect, useState, useRef } from "react";
import { ContactFormTitle } from "@/data";
import axios from "../../axiosInstance";
import Swal from "sweetalert2";

const ContactForm = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
    errors: {},
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleFnameChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      firstname: event.target.value,
      errors: {
        ...prevState.errors,
        firstname: "", // Clear error message on input change
      },
    }));

  const handleLnameChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      lastname: event.target.value,
      errors: {
        ...prevState.errors,
        lastname: "", // Clear error message on input change
      },
    }));

  const handleEmailChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      email: event.target.value,
      errors: {
        ...prevState.errors,
        email: "", // Clear error message on input change
      },
    }));

  const handlePhoneChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      phone: event.target.value,
      errors: {
        ...prevState.errors,
        phone: "", // Clear error message on input change
      },
    }));

  const handleMessageChange = (event) =>
    setFormValues((prevState) => ({
      ...prevState,
      message: event.target.value,
      errors: {
        ...prevState.errors,
        message: "", // Clear error message on input change
      },
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = { "Access-Control-Allow-Origin": "*" };
    const { firstname, lastname, email, phone, message } = formValues;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!firstname.trim()) {
      errors.firstname = "first name is required";
    }

    if (!lastname.trim()) {
      errors.lastname = "last name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(email)) {
      errors.email = "This is not valid email format";
    }

    if (!phone.trim()) {
      errors.phone = "Phone is required";
    }

    if (!message.trim()) {
      errors.message = "Message is required";
    }

    if (Object.keys(errors).length) {
      setFormValues((prevState) => ({ ...prevState, errors }));
    } else {
      try {
        const response = await axios.post("/add/contact_details", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
          message: message,
          headers,
        });
        alert(
          "Thanks for contacting us! We will be in touch with you shortly."
        );
        console.log("Response Data", response.data.data);
        console.log("Form submitted successfully!");
        getClear();
        fileInput.current.value = null;
        if (response.data.meta.status === 200) {
          Swal.fire({
            title: "Your work has been saved",
            text: "Do you want to continue",
            icon: "success",
            confirmButtonText: "Cool",
          });
          // alert("Successcfully addded")
          setTimeout(() => {
            router.push("/dashboard/team/team");
          }, 3000);
        }
        setIsSubmit(true);
      } catch (err) {
        console.log("Error Message", err);
      }
    }
  };

  const getClear = () => {
    setFormValues(initialValues);
  };

  const { firstname, lastname, email, phone, message, errors } = formValues;

  const { subTitle, title, description } = ContactFormTitle;
  return (
    <section className="commonSection ContactPage">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h4 className="sub_title">{subTitle}</h4>
            <h2 className="sec_title">{title}</h2>
            <p className="sec_desc">{description}</p>
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
                <div className="col-lg-6 col-sm-6">
                  <input
                    className="input-form required"
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                    value={firstname}
                    onChange={handleFnameChange}
                  />
                  {console.log("first name error : ", errors.firstname)}
                  {errors.firstname && (
                    <p style={{ color: "red" }}>
                      <span>{errors.firstname}</span>
                    </p>
                  )}
                </div>
                <div className="col-lg-6 col-sm-6">
                  <input
                    className="input-form required"
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={handleLnameChange}
                  />
                  {console.log("last name error : ", errors.lastname)}
                  {errors.lastname && (
                    <p style={{ color: "red" }}>
                      <span>{errors.lastname}</span>
                    </p>
                  )}
                </div>
                <div className="col-lg-6 col-sm-6">
                  <input
                    className="input-form required"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {console.log("email error : ", errors.email)}
                  {errors.email && (
                    <p style={{ color: "red" }}>
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
                <div className="col-lg-6 col-sm-6">
                  <input
                    className="input-form"
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  {console.log("phone error : ", errors.phone)}
                  {errors.phone && (
                    <p style={{ color: "red" }}>
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
                <div className="col-lg-12 col-sm-12">
                  <textarea
                    className="input-form required"
                    name="message"
                    id="message"
                    placeholder="Write Message"
                    value={message}
                    onChange={handleMessageChange}
                  />
                  {console.log("message error : ", errors.message)}
                  {errors.message && (
                    <p style={{ color: "red" }}>
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>
              </div>
              <button
                className="common_btn red_bg"
                type="submit"
                id="con_submit"
              >
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
