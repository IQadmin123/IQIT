import React from "react";
import { useRouter } from "next/router";

const ServiceCardOne = ({ data}) => {
    const { role, job_category_type, location, id } = data;

    const router = useRouter();

    const category = [
        "Front-end Developer",
        "Back-end developer",
        "Ios",
        "Android",
        "Sales",
    ];
    const icon = [
        "mei-pie-chart",
        "mei-settings",
        "fa fa-mobile",
        "fa fa-desktop",
        "fa fa-laptop",
    ];

    const hadndleOpening = (id) => {
        // localStorage.setItem("job_id", id);
        router.push(`/careers/job-info?id=${id}`);
        console.log("Edit", id);
    };

    return (
        <div className="icon_box_2 text-center">
            <div className="iconWrap">
                <i className={icon[job_category_type - 1]}></i>
            </div>
            <h3>{role}</h3>
            <div className="text-left">
                <ul>
                    <li>
                        <i className="fa fa-bars pr-3" aria-hidden="true"></i>
                        &nbsp;{category[job_category_type - 1]}
                    </li>
                    <li>
                        <i
                            className="fa fa-briefcase pr-3"
                            aria-hidden="true"
                        ></i>
                        Full Time
                    </li>
                    <li>
                        <i
                            className="fa fa-map-marker pr-3"
                            aria-hidden="true"
                        ></i>
                        &nbsp;{location}
                    </li>
                </ul>
            </div>

            <button
                className="view-opening-btn"
                onClick={() => hadndleOpening(id)}
            >
                View Openings
            </button>            
        </div>
    );
};

export default ServiceCardOne;
