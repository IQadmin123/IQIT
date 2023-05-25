// import React, { useEffect, useState } from "react";
// import MenuContextProvider from "context/menu-context";
// import SearchContextProvider from "context/search-context";
// import Layout from "@/components/layout";
// import Footer from "@/components/footer";
// import HeaderOne from "@/components/header/header-one";
// import Portfolio from "@/components/portfolio/portfolio";
// import CallToActionOne from "@/components/call-to-action/call-to-action-one";
// import RelatedPortfolio from "@/components/portfolio/related-portfolio";
// import axios from "../../axiosInstance";

// export default function Product({ data }) {
//   return (
//     <section className="">
//       <MenuContextProvider>
//         <SearchContextProvider>
//           <Layout PageTitle="Portfolio Page">
//             <HeaderOne />
//             <Portfolio data={data} />
//             <RelatedPortfolio actionBtn="none" />
//             <CallToActionOne extraClassName="ready" />
//             <Footer />
//           </Layout>
//         </SearchContextProvider>
//       </MenuContextProvider>
//     </section>
//   );
// }

// export async function getServerSideProps({ params }) { 
//   const response = await axios.get(`/view/portfolio/${params.id}`);
//   const data = response.data.data;
//   return { props: { data } };
// }


import React, { useEffect, useState } from "react";
import MenuContextProvider from "context/menu-context";
import SearchContextProvider from "context/search-context";
import Layout from "@/components/layout";
import Footer from "@/components/footer";
import HeaderOne from "@/components/header/header-one";
import Portfolio from "@/components/portfolio/portfolio";
import CallToActionOne from "@/components/call-to-action/call-to-action-one";
import RelatedPortfolio from "@/components/portfolio/related-portfolio";
import axios from "../../axiosInstance";

export default function Product({ data }) {
  return (
    <section className="">
      <MenuContextProvider>
        <SearchContextProvider>
          <Layout PageTitle="Portfolio Page">
            <HeaderOne />
            <Portfolio data={data} />
            <RelatedPortfolio actionBtn="none" />
            <CallToActionOne extraClassName="ready" />
            <Footer />
          </Layout>
        </SearchContextProvider>
      </MenuContextProvider>
    </section>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/get/portfolio/${params.id}`);

  return {
    props: {
      data: response.data.data,
    },
    revalidate: 1,
  };
}