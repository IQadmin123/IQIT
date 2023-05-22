import React from "react";
import { ContactInfosBlock, ContactInfosList } from "@/data";

const ContactInfos = () => {
  const { subTitle, title, description } = ContactInfosBlock;
  return (
    <section className="commonSection client_2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">            
            <h2 className="sec_title">{title}</h2>
            <p className="sec_desc">{description}</p>
          </div>
        </div>
        <div className="row" >
          {ContactInfosList.map(({ title, infos }, index) => (
            <div             
              key={`contact-infos-${index}`}
              style={{margin:"auto"}}
            >
              <div className="singleClient_2 ">
                <h3>{title}</h3>
                {infos.map(({ name }, index) => (
                  <p key={`contact-infos-list-${index}`}>{name}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfos;
