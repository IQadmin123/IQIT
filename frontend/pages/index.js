import React from "react";
import Layout from "@/components/layout";
import CallToActionOne from "@/components/call-to-action/call-to-action-one";
import Footer from "@/components/footer";
import ParallaxOne from "@/components/parallax-1";
import ClientCarouselOne from "@/components/client-carousel-one";
import TeamCarousel from "@/components/team/team-carousel";
import FunfactOne from "@/components/funfact-one";
import TrustedClient from "@/components/trusted-client";
import PortfolioHome from "@/components/portfolio/portfolio-home";
import ServiceTwo from "@/components/service/service-two";
import AboutTwo from "@/components/about/about-two";
import HeaderOne from "@/components/header/header-one";
import SearchContextProvider from "@/context/search-context";
import MenuContextProvider from "@/context/menu-context";
import SliderOne from "@/components/slider/slider-one";
import Approch from "@/components/about/approch";
import TestimonialsOneCarousel from "@/components/testimonials-carousel";
import HomePageBanner from "@/components/home-page-banner";

const HomeOne = () => {
  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle="Web and Mobile Application Development">
          <HeaderOne />        
          <HomePageBanner/>
          <ServiceTwo />
          <AboutTwo />    
          <PortfolioHome actionBtn="none"/>
          <Approch /> 
          <FunfactOne />
          <TrustedClient />
          <TeamCarousel />
          <TestimonialsOneCarousel />
          <CallToActionOne extraClassName="ready" />
          <Footer />
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
};

export default HomeOne;
