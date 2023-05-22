import React from "react";
import AdminHeader from "@/components/admin/admin-header";
import Layout from "@/components/admin/layout";
import MenuContextProvider from "@/context/menu-context";
import SearchContextProvider from "@/context/search-context";
import { useAuth } from "../../../../utils/useAuth";
import Edit from "@/components/admin/career/candidate-edit";

const EditCandidate = () => {
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

export default EditCandidate;
