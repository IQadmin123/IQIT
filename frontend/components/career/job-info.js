import React, { useState, useEffect } from "react";
import CareerJobInfo from "./career-job-info";
import CareerForm from "./career-form";
import JobInfoCard from "./job-info-card";
import { Container, Row, Col } from "react-bootstrap";
import axios from "./../../axiosInstance";
import Loader from "./../loader";
import { useRouter } from "next/router";

const JobInfo = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState();

    // let id = "";
    // if (typeof window !== "undefined" && window.localStorage) {
    //     id = localStorage.getItem("job_id");
    // }

    const router = useRouter();
    const { id } = router.query;

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/get/career/${id}`);
            console.log("this data get from ID :::", response.data.data);
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
    }, [id]);

    const category = [
        "Front-end Developer",
        "Back-end developer",
        "Ios",
        "Android",
        "Sales",
    ];

    return (
        <Container className="pt-4 pb-4 job-info-container">
            {isLoading ? (
                <Loader />
            ) : data.length > 0 ? (
                data.map((data) => (
                    <>
                        <h1>{data.role} || Job Details</h1>
                        <hr />
                        <Row>
                            <Col className="col-lg-7 col-md-12 col-sm-12 mb-4">
                                <JobInfoCard
                                    category={
                                        category[data.job_category_type - 1]
                                    }
                                    job={"Full Time"}
                                    location={data.location}
                                />
                                <div className="about-role">
                                    <h4>About the role</h4>
                                    <p>{data.description}</p>
                                </div>
                                <div className="mt-3">
                                    <h4>Responsibilty</h4>
                                    <div>
                                        {data.responsibility
                                            .split(".")
                                            .map((list) => (
                                                <li>{list}</li>
                                            ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mt-3">Requirement</h4>
                                    <div>
                                        {data.requirement
                                            .split(".")
                                            .map((list) => (
                                                <li>{list}</li>
                                            ))}
                                    </div>
                                </div>
                                <CareerJobInfo />
                            </Col>
                            <Col className="col-lg-5 col-md-12 col-sm-12">
                                <CareerForm />
                            </Col>
                        </Row>
                    </>
                ))
            ) : null}
        </Container>
    );
};

export default JobInfo;
