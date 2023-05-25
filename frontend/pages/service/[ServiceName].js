import MenuContextProvider from "context/menu-context";
import SearchContextProvider from "context/search-context";
import Layout from "@/components/layout";
import Footer from "@/components/footer";
import HeaderOne from "@/components/header/header-one";
import Service from "@/components/service/service";

export default function Product({ data }) {
  return (
    <section className="">
      <MenuContextProvider>
        <SearchContextProvider>
          <Layout PageTitle="Portfolio Page">
            <HeaderOne />
            <Service data={data} />
            <Footer />
          </Layout>
        </SearchContextProvider>
      </MenuContextProvider>
    </section>
  );
}

export async function getStaticPaths() {
  const { ServiceList } = require("@/data");
  const { service } = ServiceList;
  
  const paths = service.map((data) => ({
    params: { ServiceName: data.name },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { ServiceList } = require("@/data");
  const { service } = ServiceList;

  const data = service.find((data) => data.name === params.ServiceName);
  console.log(data)
  return { props: { data } };
}
