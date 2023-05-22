import React from "react";
import Footer from "@/components/footer";
import Layout from "@/components/layout";
import ContactInfos from "@/components/contact/contact-infos";
import GoogleMap from "@/components/google-map";
import ContactForm from "@/components/contact/contact-form";
import PageBanner from "@/components/page-banner";
import SearchContextProvider from "context/search-context";
import MenuContextProvider from "context/menu-context";
import HeaderOne from "@/components/header/header-one";
import ContactUsAddress from "../components/contact/contact-us-address"

const ContactPage = () => {
  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle="Contact Page">
          <HeaderOne />          
          <ContactForm />
          <ContactUsAddress />                  
          <Footer />
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
};

export default ContactPage;
