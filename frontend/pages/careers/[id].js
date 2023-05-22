import MenuContextProvider from "context/menu-context";
import SearchContextProvider from "context/search-context";
import Layout from "@/components/layout";
import Footer from "@/components/footer";
import HeaderOne from "@/components/header/header-one";
import JobInfo from "../../components/career/job-info";
import axios from "../../axiosInstance";

export default function Product({ data }) {
  return (    
    <section className="">
      <MenuContextProvider>
        <SearchContextProvider>
          <Layout PageTitle="Portfolio Page">
            <HeaderOne />
            <JobInfo data={data} />           
            <Footer />
          </Layout>
        </SearchContextProvider>
      </MenuContextProvider>
    </section>
  );
}

export async function getStaticPaths() {
  const { JobPostData } = require("@/data");
  const {post} = JobPostData
    
  const paths = post.map((data) => ({
    params: { id: data.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { JobPostData } = require("@/data");
  const {post} = JobPostData
  
  const data = post.find((data) => data.id.toString() === params.id);
  console.log(data)
  if (!data) {
    return {
      notFound: true
    }
  }
  return { props: { data } };
}

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   const res = await axios.get(`/get/career/${id}`);
//   const data = res.data.data

//   console.log(`Fetched place: ${data}`);
//   return { props: { data } };
// }