import React from "react";
import Link from "next/link";
import {ServiceList} from "@/data"

const ServiceSidebar = () => {  
  const {service} = ServiceList
  return (
    <>
      <aside className="widget categories">
        <h3 className="widget_title">Services</h3>
        <div className="meipaly_categorie_widget">
          <ul>           
          {service.map((data)=> (
            <li>
              <Link href={data.url}>{data.heading}</Link>
            </li>
          ))}
          </ul>
        </div>
      </aside>
      <aside className="widget categories">
        <div className="meipaly_services_help">
          <h4>need IQ Infinite help?</h4>
          <p>
            Prefer speaking with a human to filling out a form? call corporate
            office and we will connect you with a team member who can help.
          </p>
          <h2>+91 81601 25447</h2>
        </div>
      </aside>
    </>
  );
};

export default ServiceSidebar;
