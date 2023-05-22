import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginImage from "@/images/admin/login1.jpg";
import { useRouter } from "next/router";
import axios from "../axiosInstance";
import Swal from 'sweetalert2'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("/login", formData);
        console.log(response);
        if (response.data.data.token) {
          localStorage.setItem("token", response.data.data.token);
          router.push("/dashboard/team/");
          console.log("Login Successfully!");
        } else {          
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.meta.message,            
          })
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // const handleCheckbox = (e) => {
  //   setRememberMe(e.target.checked);
  //   console.log("Remember Me : ", e.target.checked);
  //   if (e.target.checked === true) {
  //     console.log("Checked");
  //   } else {
  //     console.log("Unchecked");
  //   }
  // };

  return (
    <section className="loginSection">
      <div className="container">
        <div className="row loginFormContainer">
          <div className="loginImage">
            <Image src={LoginImage} style={{ height: "100%", width: "100%" }} />
          </div>
          <div className="loginForm">
            <form onSubmit={handleSubmitData}>
              <h2 className="sec_title" style={{ color: "white" }}>
                Sign In
              </h2>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(event) => setEmail(event.target.value)}
                />
                {errors.email && <div>{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(event) => setPassword(event.target.value)}
                />
                {errors.password && <div>{errors.password}</div>}
              </div>
              {/* <div className="mb-3">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={handleCheckbox}
                />
                <label htmlFor="rememberMe" style={{ margin: "0 10px" }}>
                  Remember me
                </label>
              </div> */}
              <button type="submit" className="btn btn-light mb-3">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
