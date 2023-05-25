import React from "react";
import Footer from "@/components/footer";
import Layout from "@/components/layout";
import PageBanner from "@/components/page-banner";
import AboutOne from "@/components/about/about-one";
import CallToActionOne from "@/components/call-to-action/call-to-action-one";
import TeamCarousel from "@/components/team/team-carousel";
import TestimonialsOneCarousel from "@/components/testimonials-carousel";
import HeaderOne from "@/components/header/header-one";
import SearchContextProvider from "@/context/search-context";
import MenuContextProvider from "@/context/menu-context";
import About from "@/components/about/about";
import Approch from "@/components/about/approch";
import WhyChooseUs from "@/components/about/why-choose-us";

const AboutPage = () => {
  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle="About Us Page">
          <HeaderOne />
          <About />
          <AboutOne />  
          <Approch />  
          <WhyChooseUs />
          <TestimonialsOneCarousel />
          <TeamCarousel />
          <CallToActionOne extraClassName="ready" />
          <Footer />
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
};

export default AboutPage;
