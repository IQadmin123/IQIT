import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SectionTitle from "@/components/section-title";
import { TeamOneData } from "@/data";
import { Swiper, SwiperSlide } from "swiper/react";
import TeamCard from "@/components/team/team-card";
import "swiper/swiper-bundle.min.css";
import axios from "./../../axiosInstance";
import Loader from "./../loader";

import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

const TeamCarousel = () => {
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await axios.get("/view/team/");
      console.log("::::Team Data1::::", response.data.data);
      if (response.data.data) {
        setIsLoading(false);
        setTeamData(response.data.data);
        console.log("::::New Team Data::::", teamData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { sectionContent } = TeamOneData;
  const carouselOptions = {
    spaceBetween: 0,
    loop: true,
    slidesPerView: 5,
    speed: 3000,
    pagination: {
      el: "#team-carousel-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      0: {
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      576: {
        spaceBetween: 30,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      992: {
        spaceBetween: 30,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        spaceBetween: 30,
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
    },
    autoplay: {
      delay: 5000,
    },
  };

  return (
    <section className="commonSection res-common-section team">
      <div className="team-background"> </div>
      <Container>
        <Row>
          <Col lg={12} className="text-center">
            <SectionTitle data={sectionContent} />
          </Col>
        </Row>
      </Container>
      {isLoading ? (
        <Loader />
      ) : teamData.length > 0 ? (
        <>
          <Swiper className="team_slider" {...carouselOptions}>
            {teamData.map((post, index) => (
              <SwiperSlide key={index}>
                <TeamCard data={post} />
              </SwiperSlide>
            ))}
            <div
              className="swiper-pagination"
              id="team-carousel-pagination"
            ></div>
          </Swiper>
        </>
      ) : null}
    </section>
  );
};

export default TeamCarousel;
