import React,{useState, useEffect} from "react";
import PortfolioCard from "./portfolio-card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import axios from "./../../axiosInstance";
import Loader from "../loader";


const RelatedPortfolio = ({actionBtn}) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/view/portfolio`);
      console.log("portfolio home::::", response.data.data);
      if (response.data.data) {
        setIsLoading(false);
        setData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const carouselOptions = {
    spaceBetween: 0,
    slidesPerView: 1,
    breakpoints: {
      0: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      576: {
        spaceBetween: 30,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 30,
        slidesPerView: 3
      }
    }
  };
  return (
    <section className="commonSection res-common-section relatedPortfolio">
      {isLoading ? (
        <Loader />
      ): data.length > 0 ? (
        <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h4 className="sub_title">our portfolio</h4>
            <h2 className="sec_title">Work Showcase</h2>
            <p className="sec_desc">
              We are committed to providing our customers with exceptional
              service while
              <br /> offering our employees the best training.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Swiper className="related_slider" {...carouselOptions}>
              {data.map((post, index) => (
                <SwiperSlide key={index}>
                  <PortfolioCard data={post} action_btn={actionBtn}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      ) : null}      
    </section>
  );
};

export default RelatedPortfolio;
