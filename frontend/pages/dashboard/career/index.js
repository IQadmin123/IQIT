import React from "react";
import AdminHeader from "@/components/admin/admin-header";
import Layout from "@/components/admin/layout";
import MenuContextProvider from "@/context/menu-context";
import SearchContextProvider from "@/context/search-context";
import CareerTable from "@/components/admin/career/career-table";
import ApplicantTable from "@/components/admin/career/applicant-table";
import { useAuth } from '../../../utils/useAuth';

const team = () => {
  useAuth()
  return (
    <MenuContextProvider>
      <SearchContextProvider>
        <Layout PageTitle="admin-team page">
          <AdminHeader />          
          <CareerTable />
          <ApplicantTable />
        </Layout>
      </SearchContextProvider>
    </MenuContextProvider>
  );
};

export default team;
