import React,{useState} from "react";
import { ContactFormTitle } from "@/data";

const ContactForm = () => {
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handlefName = (e)=>{
    setFname(e.target.value)
  }

  const handlelName = (e)=>{
        setLname(e.target.value)
  }

  const handleEmail = (e)=>{
    setEmail(e.target.value)    
  }

  const handlePhone = (e)=>{
    setPhone(e.target.value)    
  }

  const handleMessage = (e)=>{
    setMessage(e.target.value)    
  }
  
  let err
  const handleSubmitData = (e)=>{
    e.preventDefault()
    console.log({fname, lname, email, phone, message});     
    getClear()   
  }
  console.log(err)
  function getClear(){
    setFname("")
    setLname("")
    setEmail("")
    setPhone("")
    setMessage("")
  }

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
              onSubmit={handleSubmitData}
            >
              <div className="row">
                <div className="col-lg-6 col-sm-6">
                  <input
                    className="input-form required"
                    type="text"
                    name="f_name"
                    id="f_name"
                    placeholder="First Name"
                    value={fname}
                    onChange={handlefName}
                  />
                 
                </div>
                <div className="col-lg-6 col-sm-6">
                  <input
                    className="input-form required"
                    type="text"
                    name="l_name"
                    id="l_name"
                    placeholder="Last Name"
                    value={lname}
                    onChange={handlelName}
                  />
                </div>
                <div className="col-lg-6 col-sm-6">
                  <input
                    className="input-form required"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
                <div className="col-lg-6 col-sm-6">
                  <input
                    className="input-form"
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={handlePhone}
                  />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <textarea
                    className="input-form required"
                    name="con_message"
                    id="con_message"
                    placeholder="Write Message"
                    value={message}
                    onChange={handleMessage}
                  ></textarea>
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
