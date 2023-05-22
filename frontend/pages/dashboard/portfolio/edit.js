import React from "react";
import AdminHeader from "@/components/admin/admin-header";
import Layout from "@/components/admin/layout";
import MenuContextProvider from "@/context/menu-context";
import SearchContextProvider from "@/context/search-context";
import { useAuth } from "../../../utils/useAuth";
import Edit from "@/components/admin/portfolio/portfolio-edit";

const edit = () => {
  useAuth();
  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle="admin-team page">
          <AdminHeader />
          <Edit />
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
};

export default edit;
