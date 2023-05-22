import React from "react";
import AdminHeader from "@/components/admin/admin-header";
import Layout from "@/components/admin/layout";
import MenuContextProvider from "@/context/menu-context";
import SearchContextProvider from "@/context/search-context";
import Team from "@/components/admin/team/team";
import { useAuth } from '../../../utils/useAuth';

const team = () => {
  useAuth()
  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle="admin-team page">
          <AdminHeader />          
          <Team/>
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
};

export default team;