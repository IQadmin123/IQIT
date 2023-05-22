import React, { useEffect, useState } from "react";
import MenuContextProvider from "context/menu-context";
import SearchContextProvider from "context/search-context";
import Layout from "@/components/layout";
import Footer from "@/components/footer";
import HeaderOne from "@/components/header/header-one";
import Portfolio from "@/components/portfolio/portfolio";
import CallToActionOne from "@/components/call-to-action/call-to-action-one";
import RelatedPortfolio from "@/components/portfolio/related-portfolio";

export default function Product({ data }) {
  return (
    <section className="">
      <MenuContextProvider>
        <SearchContextProvider>
          <Layout PageTitle="Portfolio Page">
            <HeaderOne />
            <Portfolio />
            <RelatedPortfolio actionBtn="none" />
            <CallToActionOne extraClassName="ready" />
            <Footer />
          </Layout>
        </SearchContextProvider>
      </MenuContextProvider>
    </section>
  );
}