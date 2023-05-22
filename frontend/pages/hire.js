import React from "react";
import Footer from "@/components/footer";
import Layout from "@/components/layout";
import SearchContextProvider from "context/search-context";
import MenuContextProvider from "context/menu-context";
import HeaderOne from "@/components/header/header-one";
import HireFeature from "@/components/hire/feature-hire";
import ServiceHire from "@/components/hire/service-hire";
import HireFeatureTab from "@/components/hire/hire-feature-tab";
import RelatedPortfolio from "@/components/portfolio/related-portfolio";
import AboutHire from "@/components/hire/about-hire";
import HireDeveloper from "@/components/hire/hire-developer";
import HiringModel from "@/components/hire/hiring-model";

const ContactPage = () => {
  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle="Hire">
          <HeaderOne />
          <AboutHire />
          <HireDeveloper />          
          <ServiceHire />          
          <HireFeature />
          <HireFeatureTab />
          <RelatedPortfolio actionBtn="none"/>
          <Footer />
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
};

export default ContactPage;
