import MenuContextProvider from "context/menu-context";
import SearchContextProvider from "context/search-context";
import Layout from "@/components/layout";
import Footer from "@/components/footer";
import HeaderOne from "@/components/header/header-one";
import JobInfo from "../../components/career/job-info";

export default function Product() {
  return (    
    <section className="">
      <MenuContextProvider>
        <SearchContextProvider>
          <Layout PageTitle="Portfolio Page">
            <HeaderOne />
            <JobInfo />           
            <Footer />
          </Layout>
        </SearchContextProvider>
      </MenuContextProvider>
    </section>
  );
}