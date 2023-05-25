import React, { useEffect, useState, useRef } from "react";
import { CareerFormData } from "@/data";
import axios from "../../axiosInstance";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const CareerForm = () => {
    const { title } = CareerFormData.sectionContent;

    const initialValues = {
        fullname: "",
        email: "",
        phone: "",
        file_url: "",
        errors: {},
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    let status = "new";

    const fileInput = useRef(null);

    const router = useRouter();
    const { id } = router.query;
    let job_id = id;
    console.log({ "Job Id": job_id, Status: status });

    const handleNameChange = (event) =>
        setFormValues((prevState) => ({
            ...prevState,
            fullname: event.target.value,
            errors: {
                ...prevState.errors,
                fullname: "", // Clear error message on input change
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullname, email, phone, file_url } = formValues;
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!fullname.trim()) {
            errors.fullname = "Name is required";
        }

        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!regex.test(email)) {
            errors.email = "This is not valid email format";
        }

        if (!phone.trim()) {
            errors.phone = "Phone is required";
        }

        if (!file_url) {
            errors.file_url = "File is required";
        }

        const formData = new FormData();        
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("status", status);
        formData.append("file_url", file_url);

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
                    `/add/candidate/${job_id}`,
                    formData,
                    config
                );
                console.log("Response Data", response.data);
                if (response.data.meta.status === 200) {
                    Swal.fire({
                        title: "We've received your request and will call you back within 48 hours.",                        
                        icon: "success",
                        confirmButtonText: "Cool",
                    });
                }
                console.log("Form submitted successfully!");
                getClear();
                fileInput.current.value = null;
            } catch (err) {
                console.log("Error Message", err);
            }
        }
    };

    const getClear = () => {
        setFormValues(initialValues);
    };

    const handleFileChange = (event) => {
        const file_url = event.target.files[0];

        const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;

        if (file_url && !allowedExtensions.exec(file_url.name)) {
            const errors = {
                file_url:
                    "File type not allowed. Allowed types: jpg, jpeg, png",
            };
            setFormValues((prevState) => ({ ...prevState, errors }));
            return;
        }
        setFormValues((prevState) => ({
            ...prevState,
            file_url: file_url,
            errors: {
                ...prevState.errors,
                file_url: "", // Clear error message on input change
            },
        }));
    };

    const { fullname, email, phone, file_url, errors } = formValues;

    return (
        <section className="ContactPage border p-3 service-form">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="sec_title">{title}</h2>                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12 ">
                        <form
                            action="#"
                            method="post"
                            className="contactFrom"
                            id="contactForm"
                            onSubmit={handleSubmit}
                        >
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <input
                                        className="input-form required"
                                        type="text"
                                        name="job_id"
                                        id="job_id"
                                        value={job_id}
                                        hidden
                                    />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <input
                                        className="input-form required"
                                        type="text"
                                        name="fullname"
                                        id="fullname"
                                        value={fullname}
                                        placeholder="Full Name"
                                        onChange={handleNameChange}
                                    />
                                    {console.log(
                                        "Name error : ",
                                        errors.fullname
                                    )}
                                    {errors.fullname && (
                                        <p style={{ color: "red" }}>
                                            <span>{errors.fullname}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <input
                                        className="input-form required"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {console.log("Name error : ", errors.email)}
                                    {errors.email && (
                                        <p style={{ color: "red" }}>
                                            <span>{errors.email}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <input
                                        className="input-form"
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    />
                                    {console.log("Name error : ", errors.phone)}
                                    {errors.phone && (
                                        <p style={{ color: "red" }}>
                                            <span>{errors.phone}</span>
                                        </p>
                                    )}
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 text-left">
                                    <select
                                        className="input-form required form-select"
                                        aria-label="Default select example"
                                        name="status"
                                        hidden
                                    >
                                        <option value={status}>New</option>
                                    </select>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 text-left">
                                    <label for="formFile">
                                        Upload CV/Resume
                                    </label>
                                    <input
                                        type="file"
                                        id="file_url"
                                        ref={fileInput}
                                        className="form-control input-form required fileUpload"
                                        onChange={handleFileChange}
                                    />
                                    <p>Allowed Type(s): .pdf, .doc, .docx</p>
                                    {console.log(
                                        "File error : ",
                                        errors.file_url
                                    )}
                                    {errors.file_url && (
                                        <p style={{ color: "red" }}>
                                            <span>{errors.file_url}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                                    <input type="checkbox" required />
                                    <p>
                                        By using this form you agree with the
                                        storage and handling of your data by
                                        this website.{" "}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="common_btn red_bg col-lg-4 col-lg-8 col-sm-6"
                                type="submit"
                                id="submit"
                            >
                                <span>Submit</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerForm;
