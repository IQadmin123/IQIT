import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import JobListCard from "./job-list-card";
import { JobPostData } from "@/data";
import axios from "./../../axiosInstance";
import Loader from "./../loader";

const JobCard = () => {
    const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { subTitle, title, text } = JobPostData.sectionContent;

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/view/career/");
            console.log(response.data.data);
            if (response.data.data) {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                setData(response.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section
            className="service_section_2 commonSection"
            style={{ backgroundColor: "#e5e5e5" }}
        >
            {isLoading ? (
                <Loader />
            ) : Data.length > 0 ? (
                <Container>
                    <Row>
                        <Col lg={12} className="text-center">
                            <h4 className="sub_title red_color">{subTitle}</h4>
                            <h2
                                className="sec_title white"
                                style={{ color: "black" }}
                            >
                                {title}
                            </h2>
                            <p className="sec_desc color_aaa">{text}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-4 text-center jobpost-card ">
                            {Data.map((post, index) => (
                                <JobListCard data={post} key={index} />
                            ))}
                        </Col>
                    </Row>
                </Container>
            ) : null}
        </section>
    );
};

export default JobCard;
