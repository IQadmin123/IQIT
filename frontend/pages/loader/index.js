import React from "react";
import Footer from "@/components/footer";
import Layout from "@/components/layout";
import MenuContextProvider from "context/menu-context";
import SearchContextProvider from "context/search-context";
import HeaderOne from "@/components/header/header-one";
import Loader from "../../components/loader"

const Loaders = () => {
  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle="Portfolio  Page">
          <HeaderOne />
          <Loader />         
          {/* <Footer /> */}
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
};

export default Loaders;
