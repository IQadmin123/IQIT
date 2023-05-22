import axios from "../../../axiosInstance";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

const ContactEdit = () => {
  const [status, setStatus] = useState("");
  const [updateContent, setUpdateContent] = useState([]);

  const router = useRouter();
  const { id } = router.query;

   console.log("Status ::::", status);

  const getDataById = async () => {
    try {
      const response = await axios.get(`/get/contact_details/${id}`);
      console.log("Getting data form id ===>", response.data.data);
      setUpdateContent(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataById();
  }, [0]);

  useEffect(() => {
    if (updateContent.length > 0) {
      setStatus(updateContent[0].status);
    }
  }, [updateContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", status);

    try {
      const response = await axios.post(
        `/update/contact_detail/status/${id}`,
        formData
      );
      console.log("Updated Response ::: ", response.data.data.status);
      Swal.fire({
        title: "Your work has been saved",
        icon: "success",
        confirmButtonText: "Cool",
      }).then(() => {
        setTimeout(() => {
          router.push("/dashboard/contact/");
        }, 1000);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCareer = () => {
    router.push("/dashboard/contact/");
  };

  const contactStatus = ["read", "unread"];
  const uniqueContactStatus = [...new Set(contactStatus)];

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
            <h2 className="text-uppercase">Update Status</h2>
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
                <div className="col-lg-12 col-md-12 col-sm-12 statusDropdown">
                  <select
                    className="input-form admin_input required form-select text-capitalize"
                    aria-label="Default select example"
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={status}>{status}</option>
                    {uniqueContactStatus.map((option) => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
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

export default ContactEdit;
