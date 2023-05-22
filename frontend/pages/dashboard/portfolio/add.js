import React from "react";
import AdminHeader from "@/components/admin/admin-header";
import Layout from "@/components/admin/layout";
import MenuContextProvider from "@/context/menu-context";
import SearchContextProvider from "@/context/search-context";
import Portfolio from "@/components/admin/portfolio/portfolio";
import { useAuth } from '../../../utils/useAuth';

const team = () => {
  useAuth()
  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle="admin-team page">
          <AdminHeader />          
          <Portfolio/>
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
};

export default team;