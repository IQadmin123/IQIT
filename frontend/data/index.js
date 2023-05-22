import logoLight from "../assets/images/PlainBlack.png";
import logoDark from "../assets/images/PlainWhite.png";

export const LogoImage = {
  light: logoLight,
  dark: logoDark,
};

export const NavLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Services",
    url: "#",
    subItems: [
      {
        name: "Website Design",
        url: "/service/website-design",
      },
      {
        name: "Application & Modernization",
        url: "/service/application-modernization",
      },
      {
        name: "UI/UX Design",
        url: "/service/ui-ux-design",
      },
      {
        name: "Mobile App Development",
        url: "/service/mobile-app-development",
      },
      {
        name: "DevOps Development",
        url: "/service/devops-development",
      },
      {
        name: "Product Development",
        url: "/service/product-development",
      },
    ],
  },
  {
    name: "Portfolio",
    url: "/portfolio",
  },
  {
    name: "Career",
    url: "/career",
  },
  {
    name: "Hire Us",
    url: "/hire",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

export const AdminNavbar = [
  {
    name: "Team",
    url: "/dashboard/team/",
  },
  {
    name: "Portfolio",
    url: "/dashboard/portfolio/",
  },
  {
    name: "Career",
    url: "/dashboard/career/",
  },
  {
    name: "Contact Us",
    url: "/dashboard/contact/",
  },
];

// import sliderOne01 from "../public/sl1.jpg";
// import sliderOne02 from "../public/sl2.jpg";

const sliderOne01 = "https://picsum.photos/id/743/1920/1080";
const sliderOne02 = "https://picsum.photos/id/185/1921/1080";

export const SliderOneData = [
  {
    image: sliderOne01,
    subTitle:
      "We help businesses bring their ideas to life with high-quality software solutions.",
    title: "Custom Web & App Development Services for Your Business",
    text: "Empowering your business through technology.",
    button: {
      label: "Get a Free Quote",
      url: "/about",
    },
  },
  {
    image: sliderOne02,
    subTitle:
      "We help businesses bring their ideas to life with high-quality software solutions.",
    title: "Custom Web & App Development Services for Your Business",
    button: {
      label: "Get a Free Quote",
      url: "/about",
    },
  },
];

import sliderTwo01 from "@/images/slider/2_1.jpg";
import sliderTwo02 from "@/images/slider/2_2.jpg";
import sliderTwo03 from "@/images/slider/2_3.jpg";

export const SliderTwoData = [
  {
    image: sliderTwo01,
    subTitle: "WELCOME TO MEIPALY AGENCY",
    title: "DIGITAL\nMARKETING\nAGENCY.",
    button: {
      label: "DISCOVER MORE",
      url: "/about",
    },
  },
  {
    image: sliderTwo02,
    subTitle: "WELCOME TO MEIPALY AGENCY",
    title: "DIGITAL\nMARKETING\nAGENCY.",
    button: {
      label: "DISCOVER MORE",
      url: "/about",
    },
  },
  {
    image: sliderTwo03,
    subTitle: "WELCOME TO MEIPALY AGENCY",
    title: "DIGITAL\nMARKETING\nAGENCY.",
    button: {
      label: "DISCOVER MORE",
      url: "/about",
    },
  },
];

// import sliderThree01 from "@/images/slider/3_1.jpg";
// import sliderThree02 from "@/images/slider/3_2.jpg";

const sliderThree01 = "https://picsum.photos/1919/1080";
const sliderThree02 = "https://picsum.photos/1920/1079";

export const SliderThreeData = [
  {
    image: sliderThree01,
    subTitle: "WELCOME TO MEIPALY AGENCY",
    title: "SMART WEB\n DESIGN AGENCY.",
    button: {
      label: "DISCOVER MORE",
      url: "/about",
    },
  },
  {
    image: sliderThree02,
    subTitle: "WELCOME TO MEIPALY AGENCY",
    title: "SMART WEB\n DESIGN AGENCY.",
    button: {
      label: "DISCOVER MORE",
      url: "/about",
    },
  },
];

export const ContactInfosBlock = {
  title: "Our office ",
  description:
    "We are committed to providing our customers with exceptional service while \n offering our employees the best training.",
};

export const ContactInfosList = [
  {
    title: "Ahmedabad",
    infos: [
      {
        name: "806, Elite Business Park, Sola, Ahmedabad, Gujrat - 380060",
      },
      {
        name: " info@iqinfinite.in",
      },
      {
        name: "+91 81601 25447",
      },
    ],
  },
];

export const ContactFormTitle = {
  subTitle: "Contact us",
  title: "write us a message",
  description:
    "We are committed to providing our customers with exceptional service while \n      offering our employees the best training. ",
};

// import blogImage1 from "../assets/images/blog/1_.jpg";
// import blogImage2 from "../assets/images/blog/2_.jpg";
// import blogImage3 from "../assets/images/blog/3_.jpg";
// import blogImage4 from "../assets/images/blog/4_.jpg";
// import blogImage5 from "../assets/images/blog/5_.jpg";
// import blogImage6 from "../assets/images/blog/6_.jpg";

const blogImage1 = "https://picsum.photos/370/305";
const blogImage2 = "https://picsum.photos/371/305";
const blogImage3 = "https://picsum.photos/370/303";
const blogImage4 = "https://picsum.photos/373/305";
const blogImage5 = "https://picsum.photos/370/306";
const blogImage6 = "https://picsum.photos/369/305";

export const BlogData = [
  {
    title: "basic rules of running web agency business",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage1,
  },
  {
    title: "Become the best sale marketer",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage2,
  },
  {
    title: "Introducing latest mopaly features",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage3,
  },
  {
    title: "a deep understanding of our audience",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage4,
  },
  {
    title: "We build and activate brands insight",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage5,
  },
  {
    title: "experiences that connect with people",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage6,
  },
];

// import blogImageTwo1 from "@/images/blog/14.jpg";
// import blogImageTwo2 from "@/images/blog/15.jpg";

const blogImageTwo1 = "https://picsum.photos/771/305";
const blogImageTwo2 = "https://picsum.photos/770/305";

export const BlogTwoData = [
  {
    title:
      "Dynamically procrastinate unique vortals with global best practices.",
    date: "20 nov",
    url: "/blog-single",
    image: blogImageTwo1,
  },
  {
    title: "Become the best sale marketer",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage2,
  },
  {
    title: "Introducing latest mopaly features",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage3,
  },
  {
    title: "a deep understanding of our audience",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage4,
  },
  {
    title: "We build and activate brands insight",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage5,
  },
  {
    title:
      "Holisticly conceptualize backend scenarios via accurate technologies.",
    date: "20 nov",
    url: "/blog-single",
    image: blogImageTwo2,
  },
  {
    title: "experiences that connect with people",
    date: "20 nov",
    url: "/blog-single",
    image: blogImage6,
  },
];

export const BlogHomeSection = {
  subTitle: "our news & articles",
  title: "latest blog posts",
  text: "We are committed to providing our customers with exceptional service while\n offering our employees the best training.",
};

// import blogS1 from "@/images/blog/11.jpg";
// import blogS2 from "@/images/blog/12.jpg";
// import blogS3 from "@/images/blog/13.jpg";

const blogS1 = "https://picsum.photos/61/66";
const blogS2 = "https://picsum.photos/60/66";
const blogS3 = "https://picsum.photos/62/66";

export const BlogSidebarPost = [
  {
    title: "basic rules of running web agency",
    image: blogS1,
    url: "/blog-single",
  },
  {
    title: "basic rules of running web agency",
    image: blogS2,
    url: "/blog-single",
  },
  {
    title: "basic rules of running web agency",
    image: blogS3,
    url: "/blog-single",
  },
];

// import commentImage1 from "@/images/blog/9.jpg";
// import commentImage2 from "@/images/blog/10.jpg";

const commentImage1 = "https://picsum.photos/110/111";
const commentImage2 = "https://picsum.photos/110/110";

export const BlogComments = [
  {
    image: commentImage1,
    name: "David Martin",
    data: "20 Nov, 2018 - 4:00 pm",
    content:
      "Lorem Ipsum is simply dummy text of the rinting and typesetting been the industry standard dummy text ever sincer condimentum purus. In non ex at ligula fringilla lobortis et not the aliquet.",
  },
  {
    image: commentImage2,
    name: "Jessica Brown",
    data: "20 Nov, 2018 - 4:00 pm",
    content:
      "Lorem Ipsum is simply dummy text of the rinting and typesetting been the industry standard dummy text ever sincer condimentum purus. In non ex at ligula fringilla lobortis et not the aliquet.",
  },
];

import portfolioMBL01 from "@/images/portfolio/m_design.png";
import portfolioBci01 from "@/images/portfolio/BCI.png";
import portfolioEQSR01 from "@/images/portfolio/EQSR.jpg";
import portfolioLNDR01 from "@/images/portfolio/Laundry_Portal.png";
import portfolioUiUx01 from "@/images/portfolio/Website.png";

export const PortfolioData = [
  {
    id: 1,
    name: "mobile-design-details",
    title: "Mobile Design",
    categorie: "Design",
    image: portfolioMBL01,
    text: " we are create simple mobile application design using UI/UX and XD",
  },
  {
    id: 2,
    name: "bci-details",
    title: "BCI",
    categorie: "App",
    image: portfolioBci01,
    text: " BCI is use for arrange meeting with your people and team member, it is provide time and location, number of people and many more information. ",
  },
  {
    id: 3,
    name: "eqsr-details",
    title: "EQSR",
    categorie: "Web",
    image: portfolioEQSR01,
    text: " EQSR is a multipurpose website specially designed to manage all the task of your store. It literally manages all the task either if it is too simple or too complex. EQSR gives you a feature of maintain your store’s data on a timely basis, also you can look for a past data of your store very easily. Not only it manages your data but also allows you to schedule new tasks for the future so that you don’t miss out. With the help of EQSR you can also have all your employee data in front of you which you can easily access, change as per the need. ",
  },
  {
    id: 4,
    name: "laundry-portal-details",
    title: "Laundry Portal",
    categorie: "App",
    image: portfolioLNDR01,
    text: " Laundry Portal is a platform that allows users to browse and schedule services from a selection of high-quality and trusted dry cleaners / laundry service providers.",
  },
  {
    id: 5,
    name: "ui-ux-details",
    title: "Websites UI/UX Design",
    categorie: "Web",
    image: portfolioUiUx01,
    text: " Simple websites UI/UX Design for sell product like watch, wallet and etc.. ",
  },
];

export const PortfolioFilters = [
  { name: "all" },
  { name: "graphic" },
  { name: "branding" },
  { name: "marketing" },
  { name: "logos" },
];

export const ServicePostData = [
  {
    title: "Website Design",
    text: "Phaseus sit amet tristique lorem ipsum is simply free text ligua donec culis leo sus cipit.",
    iconName: "mei-settings",
    url: "/services/website-design",
  },
  {
    title: "Mobile App Development",
    text: "Phaseus sit amet tristique lorem ipsum is simply free text ligua donec culis leo sus cipit.",
    iconName: "mei-transfer",
    url: "/services/application-modernization",
  },
  {
    title: "UI-UX Design",
    text: "Phaseus sit amet tristique lorem ipsum is simply free text ligua donec culis leo sus cipit.",
    iconName: "mei-pie-chart",
    url: "/services/ui-ux-design",
  },
];

export const ServiceHomeTwoData = {
  subTitle: "welcome to smart meipaly web agency",
  title: "We design digital products that \n help grow businesses.",
  text: "We are committed to providing our customers with exceptional service while\n offering our employees the best training.",
};

export const ServiceHomeThreeData = {
  subTitle: "Services we are offering",
  title: "Our Services",
  text: "We are committed to providing our customers with exceptional service while\n offering our employees the best training.",
};

import websiteImg from "@/images/service/website1.jpg";
import UIUXImg from "@/images/service/ui-ux.jpg";
import mobileAppImg from "@/images/service/mobile-app.jpg";
import EcommerceImg from "@/images/service/e-commerce.jpg";
import customImg from "@/images/service/devops.jpg";
import enterPriseImg from "@/images/service/enterprise.jpg";

export const ServicePostTwoData = {
  sectionContent: {
    title: "We design digital products that \n help grow businesses.",
    subTitle: "Services we are offering",
    text: "We are committed to providing our customers with exceptional service \n while offering our employees the best training.",
  },
  posts: [
    {
      image: websiteImg,
      title: "Website Development",
      iconName: "mei-web-design",
      url: "/service/website-design",
      desc: "We build custom websites using the latest technologies and best practices to ensure optimal performance and user experience",
    },
    {
      image: EcommerceImg,
      title: "E-Commerce Development",
      iconName: "mei-computer-graphic",
      url: "/service/application-modernization",
      desc: "We specialize in developing e-commerce websites and apps that are secure, scalable, and tailored to your business needs",
    },
    {
      image: UIUXImg,
      title: "UI/UX Design",
      iconName: "mei-development-1",
      url: "/service/ui-ux-design",
      desc: "We design interfaces that are intuitive, visually appealing, and user-friendly to enhance your customers' experience.",
    },
    {
      image: mobileAppImg,
      title: "App Development",
      iconName: "mei-transfer",
      url: "/service/mobile-app-development",
      desc: "Our team has extensive experience developing native and hybrid mobile apps for iOS and Android devices",
    },
    {
      image: customImg,
      title: "DevOps Development",
      iconName: "mei-development",
      url: "/service/devops-development",
      desc: "We provide enterprise development solutions that help businesses streamline their operations and increase their productivity",
    },
    {
      image: enterPriseImg,
      title: "Product Development",
      iconName: "fa fa-cogs",
      url: "/service/product-development",
      desc: "Our team can develop custom software solutions that automate your business processes and improve your workflow.",
    },
  ],
};

// import serviceOne01 from "@/images/home_1/6.jpg";
// import serviceOne02 from "@/images/home_1/7.jpg";
// import serviceOne03 from "@/images/home_1/8.jpg";

const serviceOne01 = "https://picsum.photos/370/336";
const serviceOne02 = "https://picsum.photos/370/335";
const serviceOne03 = "https://picsum.photos/371/336";

export const ServicePostThreeData = {
  sectionContent: {
    title: "Let’s create something",
    subTitle: "what we do",
    text: "We are committed to providing our customers with exceptional service \n while offering our employees the best training.",
  },
  posts: [
    {
      title: "web development",
      image: serviceOne01,
      url: "/service-details",
    },
    {
      title: "digital marketing",
      image: serviceOne02,
      url: "/service-details",
    },
    {
      title: "product branding",
      image: serviceOne03,
      url: "/service-details",
    },
  ],
};

export const FunfactData = [
  {
    title: "Projects Completed",
    countNumber: 45,
  },
  {
    title: "Active Clients",
    countNumber: 20,
  },
  {
    title: "Cups of Coffee",
    countNumber: 10,
  },
  {
    title: "Happy Clients",
    countNumber: 20,
  },
];

import trustClient01 from "@/images/home_1/_4.jpg";

export const TrustClientData = {
  image: trustClient01,
  title: "We Lead from the Front",
  text: "IQ Infinite Technologies established in 2019 with its web & mobile development proficiency to make a stamp in the domain of IT industry. It constantly went on expanding & augmenting its wings with worldwide customers & built up a firm reputation.",
  url: "/about",
};

import ClientCarousel01 from "@/images/client/1.png";
import ClientCarousel02 from "@/images/client/2.png";
import ClientCarousel03 from "@/images/client/3.png";
import ClientCarousel04 from "@/images/client/4.png";
import ClientCarousel05 from "@/images/client/5.png";

export const ClientCarouselData = {
  sectionContent: {
    title: "they trust us",
    subTitle: "our clients",
    text: "We are committed to providing our customers with exceptional service \n while offering our employees the best training.",
  },
  items: [
    {
      url: "",
      image: ClientCarousel01,
    },
    {
      url: "",
      image: ClientCarousel02,
    },
    {
      url: "",
      image: ClientCarousel03,
    },
    {
      url: "",
      image: ClientCarousel04,
    },
    {
      url: "",
      image: ClientCarousel05,
    },
  ],
};

import aboutOne01 from "@/images/about/_1.jpg";
import aboutOne02 from "@/images/about/_2.jpg";

export const AboutOneData = {
  sectionContent: {
    title: "Convert Your Dream into Reality",
    subTitle: "get to know us",
  },
  gallery: [aboutOne01, aboutOne02],
  counter: {
    title: "Company Started",
    number: 2019,
  },
};

// import team01 from "@/images/team/1.jpg";
// import team02 from "@/images/team/2.jpg";
// import team03 from "@/images/team/3.jpg";
// import team04 from "@/images/team/4.jpg";
// import team05 from "@/images/team/5.jpg";

const team01 =
  "https://meipaly-nextjs.vercel.app/_next/static/images/1-3ea79e49eda5a1a78465f4d788798fee.jpg";
const team02 =
  "https://meipaly-nextjs.vercel.app/_next/static/images/2-4bb81e756ac49f7758b070bf8270f447.jpg";
const team03 =
  "https://meipaly-nextjs.vercel.app/_next/static/images/3-249d386903a70a5fc674bd9173a7f098.jpg";
const team04 =
  "https://meipaly-nextjs.vercel.app/_next/static/images/4-91385f23069ef476888087f37514b593.jpg";
const team05 =
  "https://meipaly-nextjs.vercel.app/_next/static/images/5-d04c4f5195b4c31b613376c8800cb830.jpg";

import Ronak from "../public/image/Ronak.jpg";
import Jalpa from "../public/image/jalpa1.jpg";
import Shruti from "../public/image/shruti.jpg";
import Bhumi from "../public/image/Bhumi.jpg";
import Nishit from "../public/image/Nishit.jpg";

export const TeamOneData = {
  sectionContent: {
    title: "expert people",
    subTitle: "meet the team",
    text: "Our team consists of highly skilled and experienced professionals with expertise in web and app development, \nUI/UX design, project management, and quality assurance.",
  },
  posts: [
    {
      image: Ronak,
      name: "Ronak Rafaliya",
      designation: "Sr. Software Engineer",
      url: "/about",
    },
    {
      image: team04,
      name: "Swati Thumar",
      designation: "Sr. PHP Developer",
      url: "/about",
    },
    {
      image: Nishit,
      name: "Nishit Makwana",
      designation: "Sr. DevOps Engineer",
      url: "/about",
    },
    {
      image: team01,
      name: "Abhishek Jha",
      designation: "Android Developer",
      url: "/about",
    },
    {
      image: Bhumi,
      name: "Bhumi Chauhan",
      designation: "Jr. PHP Developer",
      url: "/about",
    },
    {
      image: team05,
      name: "Shashank Jain",
      designation: "Jr. Python Developer",
      url: "/about",
    },
    {
      image: team02,
      name: "Rajnikant patel",
      designation: "PHP Developer",
      url: "/about",
    },
    {
      image: team03,
      name: "Pushti Thakar",
      designation: "Software Engineer",
      url: "/about",
    },
    {
      image: team01,
      name: "Mihir Almaula",
      designation: "Ios Developer",
      url: "/about",
    },
    {
      image: Jalpa,
      name: "Jalpa Madhvani ",
      designation: "HR-Executive",
      url: "/about",
    },
    {
      image: team05,
      name: "Ritesh Prajapati",
      designation: "React Developer",
      url: "/about",
    },
    {
      image: team02,
      name: "Darshan Bhatt",
      designation: "Android Developer",
      url: "/about",
    },
    {
      image: Shruti,
      name: "Shruti Bhimani",
      designation: "DevOps Engineer",
      url: "/about",
    },
  ],
};

// import video01 from "@/images/about/3.jpg";

const video01 = "https://picsum.photos/932/617";

export const VideoOneData = {
  sectionContent: {
    title: "Make amazing websites without touching cod",
    subTitle: "the only design you need",
    text: "Tincidunt elit magnis nulla facilisis sagittis maecenas. Sapien nunc amet ultrices, dolores sit ipsum velit purus aliquet, massa fringilla leo orci. Lorem ipsum dolors sit amet elit magnis amet ultrices purus aliquet.",
  },
  video: {
    image: video01,
    ID: "y2Eqx6ys1hQ",
    title: "Watch Video",
  },
};

export const SubscribeFormData = {
  sectionContent: {
    title: "Subscribe us",
    subTitle: "don’t miss out our latest updates",
  },
};

import testimonial01 from "@/images/home_1/t1.jpg";
import testimonial02 from "@/images/home_1/t2.jpg";
import testimonial03 from "@/images/home_1/t3.jpg";

export const TestimonialsOneData = {
  sectionContent: {
    subTitle: "our testimonials",
    title: "happy customers",
  },
  posts: [
    {
      name: "Cecilia Colon",
      designation: "Director",
      image: testimonial01,
      content:
        "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. There are many variations of passages of available, but the majority have suffered alteration in some form by injected hum",
      date: "25 nov, 2018",
    },
    {
      name: "Chase Hanson",
      designation: "CO Founder",
      image: testimonial02,
      content:
        "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. There are many variations of passages of available, but the majority have suffered alteration in some form by injected hum",
      date: "25 nov, 2018",
    },
    {
      name: "Mittie Flores",
      designation: "Manager",
      image: testimonial03,
      content:
        "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. There are many variations of passages of available, but the majority have suffered alteration in some form by injected hum",
      date: "25 nov, 2018",
    },
    {
      name: "Carrie Sims",
      designation: "Director",
      image: testimonial01,
      content:
        "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. There are many variations of passages of available, but the majority have suffered alteration in some form by injected hum",
      date: "25 nov, 2018",
    },
    {
      name: "Anne Stone",
      designation: "CO Founder",
      image: testimonial02,
      content:
        "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. There are many variations of passages of available, but the majority have suffered alteration in some form by injected hum",
      date: "25 nov, 2018",
    },
    {
      name: "Hunter Brewer",
      designation: "Manager",
      image: testimonial03,
      content:
        "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. There are many variations of passages of available, but the majority have suffered alteration in some form by injected hum",
      date: "25 nov, 2018",
    },
    {
      name: "Carrie Sims",
      designation: "Director",
      image: testimonial01,
      content:
        "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. There are many variations of passages of available, but the majority have suffered alteration in some form by injected hum",
      date: "25 nov, 2018",
    },
    {
      name: "Anne Stone",
      designation: "CO Founder",
      image: testimonial02,
      content:
        "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. There are many variations of passages of available, but the majority have suffered alteration in some form by injected hum",
      date: "25 nov, 2018",
    },
    {
      name: "Hunter Brewer",
      designation: "Manager",
      image: testimonial03,
      content:
        "This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. There are many variations of passages of available, but the majority have suffered alteration in some form by injected hum",
      date: "25 nov, 2018",
    },
  ],
};

// import featureTab01 from "@/images/home_1/f1.jpg";
import featureTab01 from "@/images/home_1/f1_.jpg";
// import featureTab02 from "@/images/home_1/f2.jpg";
import featureTab02 from "@/images/home_1/f2_.jpg";
// import featureTab03 from "@/images/home_1/f3.jpg";
import featureTab03 from "@/images/home_1/f3_.jpg";

export const FeatureTabData = {
  sectionContent: {
    title: "why choose us",
    subTitle: "our benefits",
    text: "We are committed to providing our customers with exceptional service while\n offering our employees the best training.",
  },
  posts: [
    {
      title: "Our Objective",
      content:
        "We are committed to providing top-notch services to our clients regardless of project size and worth. Every project is special to us and for every engagement, whether large or small, we try to give our 100%. We have more than 10+ years of experience in planning, developing, maintaining and managing IT systems. Lead cross-functional teams with diverse technical backgrounds. Experience in business process, outsourcing",
      image: featureTab01,
      lists: [
        {
          item: "Self-contained, state-of-the-art time clock",
        },
        {
          item: "Scalability of up to 500 employees per time clock",
        },
        {
          item: "The ability to connect up to 32 time clocks",
        },
        {
          item: "Employee self-enrollment",
        },
        {
          item: "Payroll integration",
        },
        {
          item: "Built-in backup camera to verify failed punches",
        },
      ],
    },
    {
      title: "Our Mission & Vision",
      content:
        "Our mission is to help businesses adopt new technologies, resolve complex issues for better productivity, results, profits, and growth.We want to grow with our clients, along with our capability to build scalable and high performing apps our focus on customer satisfaction has been the key to our growth.",
      image: featureTab02,
      lists: [
        {
          item: "Self-contained, state-of-the-art time clock",
        },
        {
          item: "Scalability of up to 500 employees per time clock",
        },
        {
          item: "The ability to connect up to 32 time clocks",
        },
        {
          item: "Employee self-enrollment",
        },
        {
          item: "Payroll integration",
        },
        {
          item: "Built-in backup camera to verify failed punches",
        },
      ],
    },
    {
      title: "Value proposition",
      content:
        "IQ Infinite helps entrepreneurs, organizations, and product owners to develop their business or convert their ideas into products by providing various engagement models to work with. \n Digital Agencies hire us to scale their development team while entrepreneurs pick us for outsourced product development, upgrade, and support.",
      image: featureTab03,
      lists: [
        {
          item: "Self-contained, state-of-the-art time clock",
        },
        {
          item: "Scalability of up to 500 employees per time clock",
        },
        {
          item: "The ability to connect up to 32 time clocks",
        },
        {
          item: "Employee self-enrollment",
        },
        {
          item: "Payroll integration",
        },
        {
          item: "Built-in backup camera to verify failed punches",
        },
      ],
    },
  ],
};

export const ParallaxOneData = {
  iconName: "mei-team",
  title: "Great things in business are never done by one person.",
  specialText: "They’re done by a team of people.",
  text: "We are committed to providing our customers with exceptional service while \n offering our employees the best training.",
};

export const PortfolioHomeData = {
  sectionContent: {
    title: "work showcase",
    subTitle: "our portfolio",
    text: "We are committed to providing our customers with exceptional service while\n offering our employees the best training.",
  },
  url: "/portfolio",
  btnTitle: "Learn More",
};

// import video02 from "@/images/home_1/3.jpg";

const video02 = "https://picsum.photos/1170/550";

export const VideoTwoData = {
  sectionContent: {
    title: "Digital Experience",
    subTitle: "how do we works",
    text: "We are committed to providing our customers with exceptional service while\n offering our employees the best training.",
  },
  video: {
    title: "Watch Video",
    ID: "y2Eqx6ys1hQ",
    image: video02,
  },
};

import aboutTwo01 from "@/images/home_1/_1.jpeg";
import aboutTwo02 from "@/images/home_1/_2.jpg";

export const AboutTwoData = {
  sectionContent: {
    title: "We are the Best Website agency in The World",
    subTitle: "welcome to Iqinfinite Technologies",
    text: "IQ Infinite was founded in 2020 by a team of technical and top-rated experts in the industry, including Sagar Jagodara, Jignesh Kasundra, Harsh Patel, and Bhavin Solanki. Our mission is to provide innovative and efficient software solutions to businesses of all sizes, enabling them to grow and thrive in today's competitive marketplace.",
  },
  button: {
    label: "Learn More",
    url: "/about",
  },
  gallery: [aboutTwo01, aboutTwo02],
};

import featureTwo01 from "@/images/home_1/6.jpeg";

// const featureTwo01 = "https://picsum.photos/1032/661";

export const FeatureTwoData = {
  sectionContent: {
    title: "real experience",
    subTitle: "our core features",
    text: " We are committed to providing our customers with exceptional service while offering our employees the best training. ",
  },
  posts: [
    {
      title: "No Coding Skills Require",
      text: "There are many variations of passages of lorem ipsum available, but the majority have suffered.",
    },
    {
      title: "Online Documentation",
      text: "There are many variations of passages of lorem ipsum available, but the majority have suffered.",
    },
    {
      title: "SEO Optimized",
      text: "There are many variations of passages of lorem ipsum available, but the majority have suffered.",
    },
  ],
  image: {
    text: "Total design freedom \n for everyone.",
    path: featureTwo01,
  },
};

import Co_founder1 from "../assets/images/sagar.jpeg";
import Co_founder2 from "../assets/images/jignesh.jpeg";
import Co_founder3 from "../assets/images/harsh.jpeg";
import Co_founder4 from "../assets/images/bhavin.jpeg";

export const AboutData = {
  heading1: "About US",
  text1:
    "IQ Infinite was founded in 2020 by a team of technical and top-rated experts in the industry, including Sagar Jagodara, Jignesh Kasundra, Harsh Patel, and Bhavin Solanki. Our mission is to provide innovative and efficient software solutions to businesses of all sizes, enabling them to grow and thrive in today's competitive marketplace.",
  heading2: "Our Founders",
  text2:
    "Our founders are the driving force behind IQ Infinite. Each brings a unique set of skills and expertise to the table, allowing us to offer a comprehensive range of services to our clients.",
  founder: [
    {
      image: Co_founder1,
      // name: "Sagar Jagodhra",
      // designation: "Co-founder",
      // about:
      //   "Sagar has over 10 years of experience in software development, specializing in web and mobile app development. He is passionate about creating solutions that make a difference in people's lives.",
    },
    {
      image: Co_founder2,
      // name: "Jignesh Kasundra",
      // designation: "Co-founder",
      // about:
      //   "Jignesh is an expert in web development, with a focus on building scalable and robust applications. He has a keen eye for detail and is committed to delivering high-quality work that exceeds our clients' expectations.",
    },
    {
      image: Co_founder3,
      // name: "Harsh Patel",
      // designation: "Co-founder",
      // about:
      //   "Harsh is a seasoned UI/UX designer with extensive experience in creating user-centered designs that enhance the user experience. He is dedicated to creating designs that not only look great but also perform exceptionally well.",
    },
    {
      image: Co_founder4,
      // name: "Bhavin Solanki",
      // designation: "Co-founder",
      // about:
      //   "Bhavin is an expert in project management and quality assurance. He is responsible for ensuring that our projects are delivered on time, within budget, and to the highest standards.",
    },
    {
      image: Ronak,
    },
    {
      image: Jalpa,
    },
    {
      image: Nishit,
    },
    {
      image: Bhumi,
    },
    {
      image: Shruti,
    },
  ],
};

export const CallToActionTwoData = [
  {
    label: "View our Recent Work",
    url: "/portfolio",
  },
  {
    label: "Reqeust a free quote",
    url: "/contact",
  },
];

export const JobPostData = {
  sectionContent: {
    title: "Browse Our Latest Job Openings",
    subTitle: "we are hiring",
    text: "Straight launches branded products with a propriority systematic \n flow that give you the highest on investment in the online and advertising super world.",
  },
  post: [
    {
      id: 1,
      name: "ios-job-details",
      title: "IOS Developer",
      iconName: "fa fa-mobile",
      time: "Full Time",
      location: "Ahmedabad",
      category: "IOS",
      desc: "We are looking for a strong experience iOS Mobile App Developer who builds, enhances, and supports next-generation Mobile applications on iOS platform with very strong at Coding, bug fixing from scratch and should have worked hands- on in iOS Mobile App development life cycle as End-to-End single-handed multi hat role in an early-stage tech start-up highly scalable Tech Product development.",
      responsibilty: [
        "Design and build applications for the iOS platform.",
        "Ensure the performance, quality, and responsiveness of applications.",
        "Collaborate with a team to define, design, and ship new features.",
        "Fixing application bugs before the final release.",
        "Publishing application on App Store.",
        "Maintaining the code and automation of the application.",
      ],
      requirement: [
        "Bachelor’s or Master’s degree in computer science or software engineering.",
        "Minimum 1+ year of experience in building iOS applications using iOS SDK.",
        "Proficient in Objective-C, Swift, and Cocoa Touch.",
        "Extensive experience with iOS Frameworks such as Core Data and Core Animation.",
        "Knowledge of iOS back-end services.",
        "Knowledge of Apple’s design principles and application interface guidelines.",
        "Ability to understand and integrate third party libraries.",
        "Proficient in code versioning tools including Mercurial, Git, and SVN.",
        "Familiarity with push notifications, APIs, and cloud messaging.",
      ],
    },
    {
      id: 2,
      name: "bde-job-details",
      title: "BDE",
      iconName: "mei-pie-chart",
      time: "Full Time",
      location: "Ahmedabad",
      category: "Sales",
      desc: "Business development executives are responsible for driving company sales by sourcing new clients, and by convincing existing clients to purchase added offerings. As such, business development executives play an integral role in companies’ longevity.",
      responsibilty: [
        "Developing and executing sales plans to meet and exceed monthly and quarterly sales goals",
        "Growing business through the development of new leads and new contacts",
        "Identifying new revenue opportunities",
        "Building business relationships with current and potential clients",
        "Attending networking events to attract and retain clients",
        "Developing and executing sales and marketing strategies to grow business",
        "Maintaining and updating sales, marketing and business development documentation",
        "Assisting with marketing and promotional projects",
        "Collaborating with management on sales goals",
      ],
      requirement: [
        "Minimum of a Bachelor’s Degree in Business, Marketing, Finance or similar field",
        "Minimum of 1 to 5 Years of experience in sales, business development or similar role",
        "Experience with CRM software",
        "Proficiency in MS Office",
        "Experience in managing and growing sales teams",
        "Ability to prioritise tasks",
        "Excellent verbal and written communication skills",
        "Ability to present and explain ideas to a variety of audiences",
        "Strong organisational and time management skills",
        "Strong customer service skills",
        "Ability to sell value and create credibility",
      ],
    },
    {
      id: 3,
      name: "python-job-details",
      title: "Python Developer",
      iconName: "mei-settings",
      type: "Back-End Developer",
      time: "Full Time",
      location: "Ahmedabad",
      category: "Python",
      desc: "We are looking for strong experience in Python/Odoo. Who is responsible for writing effective and scalable python code. Designing and implementing robust applications. Debugging applications to ensure low latency and high-availability.",
      responsibilty: [
        "Design and create effective websites and applications.",
        "Write reusable, testable, and efficient Python code.",
        "Integrate data storage solutions.",
        "Create integrative systems.",
        "Integrate user-facing elements and understand end-user requirements.",
      ],
      requirement: [
        "Work experience as a Python Developer.",
        "Minimum 1+ year of experience developing projects/applicationsusing Angular.",
        "Expertise in at least one popular Python framework (like Django, Flask or Pyramid)",
        "Knowledge of object-relational mapping (ORM)",
        "Familiarity with front-end technologies (like JavaScript and HTML5)",
        "Team spirit.",
        "Good problem-solving skill",
      ],
    },
    {
      id: 4,
      name: "angular-job-details",
      title: "Angular Developer",
      iconName: "fa fa-desktop",
      type: "Front-End Developer",
      time: "Full Time",
      location: "Ahmedabad",
      category: "Front End Developer",
      desc: "We are looking for strong experience in Angular/React, JavaScript, jQuery and CSS with very strong Coding and bug fixing. Resolve customer problems by troubleshooting and problem-solving skills. Collaborate with the Development, QA and professional services team to ensure smooth deployment, stabilization and maintenance of applications.",
      responsibilty: [
        "Bachelor’s or Master’s degree in computer science or software engineering.",
        "Minimum 1+ year of experience developing projects/applications using Angular.",
        "Knowledge of Angular CLI.",
        "Experience with REST FULL services.",
        "Experience in JavaScript build tools like grunt or gulp.",
        "Proficient in code versioning tools including Mercurial, Git, and SVN.",
        "Have used state management libraries, state Integration of Web APIs, and other 3rd party frameworks.",
      ],
      requirement: [
        "Design and build applications for the Android platform.",
        "Ensure the performance, quality, and responsiveness of applications.",
        "Collaborate with a team to define, design, and ship new features.",
        "Fixing application bugs before the final release.",
        "Publishing application on Google Play Store.",
        "Maintaining the code and automation of the application.",
      ],
    },
    {
      id: 5,
      name: "react-job-details",
      title: "React Js developer",
      iconName: "fa fa-laptop",
      type: "Front-End Developer",
      time: "Full Time",
      location: "Ahmedabad",
      category: "Front-End Developer",
      desc: "We are looking for strong experience in Angular/React, JavaScript, jQuery and CSS with very strong Coding and bug fixing. Resolve customer problems by troubleshooting and problem-solving skills. Collaborate with the Development, QA and professional services team to ensure smooth deployment, stabilization and maintenance of applications.",
      responsibilty: [
        "Develop User interfaces for Modern Rich Internet Applications with the latest Front-End technologies like Angular/React.",
        "Ensure the performance and quality of the product.",
        "Perform product analysis and development tasks.",
        "Writing tested and documented JavaScript, HTML, and CSS.",
        "Make design and technical decisions for Angular projects.",
        "Develop application code and unit tests.",
      ],
      requirement: [
        "Bachelor’s or Master’s degree in computer science or software engineering.",
        "Minimum 1+ year of experience developing projects/applications using Angular.",
        "Experience with REST FULL services",
        "Knowledge of Angular CLI.",
        "Experience with REST FULL services.",
        "Experience in JavaScript build tools like grunt or gulp.",
        "Proficient in code versioning tools including Mercurial, Git, and SVN.",
        "Have used state management libraries, state Integration of Web APIs, and other 3rd party frameworks.",
      ],
    },
    {
      id: 6,
      name: "android-job-details",
      title: "Android Developer",
      iconName: "fa fa-mobile",
      type: "Android",
      time: "Full Time",
      location: "Ahmedabad",
      category: "Android",
      desc: "We are looking for a strong experience Android Mobile App Developer who builds, enhances, and supports next - generation Mobile applications using Android UI frameworks/SDK with very strong at Coding, bug fixing from scratch and should have worked hands-on in Android Mobile App development life cycle ascend to End single-handed multi hat role in an early-stage tech start-up highly scalable Tech Product Development.",
      responsibilty: [
        "Design and build applications for the Android platform.",
        "Ensure the performance, quality, and responsiveness of applications.",
        "Collaborate with a team to define, design, and ship new features.",
        "Fixing application bugs before the final release.",
        "Publishing application on Google Play Store.",
        "Maintaining the code and automation of the application.",
      ],
      requirement: [
        "Bachelor’s or Master’s degree in computer science or software engineering.",
        "Minimum 1+ year of experience in building iOS applications using iOS SDK.",
        "Proficient in Objective-C, Swift, and Cocoa Touch.",
        "Extensive experience with iOS Frameworks such as Core Data and Core Animation.",
        "Knowledge of iOS back-end services.",
        "Knowledge of Apple’s design principles and application interface guidelines.",
        "Ability to understand and integrate third party libraries.",
        "Proficient in code versioning tools including Mercurial, Git, and SVN.",
        "Familiarity with push notifications, APIs, and cloud messaging.",
      ],
    },
    {
      id: 7,
      name: "php-job-details",
      title: "PHP Developer",
      iconName: "mei-transfer",
      type: "Back-End Developer",
      time: "Full Time",
      location: "Ahmedabad",
      category: "Back-End Developer",
      desc: "We are looking for strong experience in understanding HTML5, CSS3, JavaScript, Core PHP, MySQL. Must have outstanding coding skills, Strong understanding of business logic and has a good learning curve.",
      responsibilty: [
        "Basic Knowledge in PHP Frameworks like CodeIgniter, Cake PHP, Laravel, Symphony etc.",
        "Hands-on experience in Apache, Xampp, Wamp Servers.",
        "Basic CMS Knowledge if any (Joomla/WordPress/Drupal).",
        "Basic OOPS Concepts in PHP.",
        "Implementing Payment Gateways as per project requirements like (Eg: PayUMoney, PayPal, Paytm, Razor Pay)",
        "Capturing values to database, email notifications for pending/Failed and success payments.",
        "Knowledge of different Project Life cycles.",
      ],
      requirement: [
        "Bachelor’s or Master’s degree in computer science or software engineering.",
        "Minimum 2+ year of experience developing projects/applications using Angular.",
        "Headless website development (Existing Headless website Updates, Fixing Backend Coding Issues, Integrating with RESTFUL API, Deployment to the Server, Taking Backup).",
        "Web services (REST, Soap).",
        "Working experience in multiple projects.",
        "Good communication verbal skills along with Process oriented.",
        "Experience in MySQL or MongoDB",
        "Strong debugging skills and the ability to easily and quickly read and modify existing code.",
        "Proficient in code versioning tools including Mercurial, Git, and SVN.",
      ],
    },
    {
      id: 8,
      name: "devops-job-details",
      title: "DevOps",
      iconName: "fa fa-cogs",
      type: "DevOps",
      time: "Full Time",
      location: "Ahmedabad",
      category: "DevOps",
      desc: "Use the latest cloud infrastructure and technologies to tackle security, deployment and scalability challenges for advanced applications in the areas of marketing analytics and real-world evidence analytics. \n You will be responsible to setup and maintain the infrastructure and resources for multiple projects depending upon the business requirement. \n You will be required to work in a cross-functional team consisting of UI designer, data scientists, UI developers, server-side developers and client facing team.",
      responsibilty: [
        "Interact with the team members and provide support and resources based on project needs",
        "Handle code deployments, fixes, updates and related processes in all environments Review, monitor and set up alerts for all the various services and deployments",
        "Design and implement build, deployment, and configuration management Perform root cause analysis for production errors",
        "Manage Continuous Integration and Continuous Deployment (CI/CD) tool.",
        "Manage Multi-tenant Virtual Private Cloud, Cluster, its resources and core security.",
        "Maintaining the code and automation of the application.",
        "Automate our operational processes as needed, with accuracy and in compliance with our security requirements",
        "Understand how various systems, application and infrastructure works Follow all best practices and procedures as established by the company Document and design various processes",
        "update existing processes Brainstorm for new ideas and ways to improve the processes",
        "Monitor metrics and develop ways to improve.",
        "Actively troubleshoot any issues that arise during testing and production, catching and solving issues before launch.",
      ],
      requirement: [
        "Bachelor’s or Master’s degree in computer science or software engineering.",
        "DevOps Engineer with 1 to 3 years of experience. Knowledge of Containers and Containerization, Docker, container orchestration",
        "services, especially Kubernetes.",
        "Experience with CI/CD tools such as Bitbucket Pipeline, or Jenkins",
        "Experience with maintaining and administering Cloud resources and services.",
        "Preferred AWS services like EKS, EC2, RDS, S3, EFS, Redshift, IAM, Cloud Formation, etc.",
        "Good to have experience with multiple cloud providers like AWS, Azure, GCP, Good to have knowledge on Database management, relational (MySQL) database and Data warehouse (Redshift).",
        "Knowledge of best practices and IT operations in an always-up, always-available service Learning new technologies and gathering new skills and related tools to introduce to the company to grow the agile development environment. Work with CI and CD tools, and source control such as GIT and SVN.",
        "Work with open-source technologies as needed Well versed in security principles, both system and network Provide Level 2 Level 3 technical support, Investigate and resolve deployment issues Design procedures for system troubleshooting and maintenance.",
        "Report security weaknesses and events or potential events or other security risks to the organization",
        "Process-oriented with great documentation skills Willing to learn new technologies and acquire new skills.",
      ],
    },
  ],
};

export const CareerFormData = {
  sectionContent: {
    title: "Apply for this position",
  },
};

export const JobInfoCardData = {
  benefits: [
    "5 Workings days",
    "Flexible Time",
    "Health Insurance",
    "Accidental Insurence",
    "On-Demand salary",
    "Certification reimbursement program",
    "Great working culture",
  ],
};

// import hireOne from "../assets/images/hire/h-1.jpg"
import hireOne from "../assets/images/hire/fun-3d-cartoon-teenage-kids.jpg";

export const AboutHireData = {
  sectionContent: {
    title: "Hire Dedicated Developer",
    text: "Your website is your business online. Hire experts who can creatively represent your business on the web and create a presence for your brand that cannot be missed! Developers and designers dedicated for your project ensure that your project gets the attention it requires to launch on time. Quality and expertise matter when it comes to success of a project. We offer comprehensive hiring options for web design and web development projects.",
  },
  button: {
    label: "Let's Connect",
    url: "/contact",
  },
  image: hireOne,
};

export const HireDeveloperData = {
  title: "Hire Offshore Developers",
  desc1:
    "Hire dedicated programmers for your project and customize the plan that fits in your budget. Hire dedicated developers in India from top. We have the gems who will reform the ideas into an extraordinary outcome.",
  desc2:
    "Are you in a need to develop web applications? We provide our expert web developers on hourly, monthly and part-time basis who can work exclusively on your project is an IT outsourcing company located in Ahmedabad, India.Our different hiring models of website developers are guaranteed to save you at least 75% of cost against having on-site team/resources.If you are in a need of web developers for you application development contact us today. We provide our dedicated web developer at minimal cost and assures for 100% satisfaction.",
  label: "Hire Me",
};

export const ServiceHireData = [
  {
    title: "Experienced Developers with Agile Mindset",
    text: "Phaseus sit amet tristique lorem ipsum is simply free text ligua donec culis leo sus cipit.",
    iconName: "fa fa-users",
  },
  {
    title: "Highly skilled and qualified developers team",
    text: "Phaseus sit amet tristique lorem ipsum is simply free text ligua donec culis leo sus cipit.",
    iconName: "fa fa-handshake-o",
  },
  {
    title: "Efficient and time saving management",
    text: "Phaseus sit amet tristique lorem ipsum is simply free text ligua donec culis leo sus cipit.",
    iconName: "fa fa-clock-o",
  },
  {
    title: "Available in your investment budget",
    text: "Phaseus sit amet tristique lorem ipsum is simply free text ligua donec culis leo sus cipit.",
    iconName: "fa fa-money",
  },
  {
    title: "Perfect analysis and daily reporting",
    text: "Phaseus sit amet tristique lorem ipsum is simply free text ligua donec culis leo sus cipit.",
    iconName: "mei-pie-chart",
  },
  {
    title: "Hybrid Model On-Site & Offshore Support",
    text: "Phaseus sit amet tristique lorem ipsum is simply free text ligua donec culis leo sus cipit.",
    iconName: "mei-transfer",
  },
];

export const ServiceHireData1 = {
  subTitle: "welcome to Iq Infinite Technologies",
  title: "Benefits of Hiring",
};

export const HireFeatureData = {
  sectionContent: {
    title: "Hiring Process",
    subTitle: "",
    text: " We are committed to providing our customers with exceptional service while offering our employees the best training. ",
  },
  posts: [
    {
      title: "Share your project",
      text: "Share a detailed project copy with us to give us an understanding of your project needs.",
    },
    {
      title: "Interview the resources",
      text: "Once we have the details, we would share with you the best available resources that fit your needs.",
    },
    {
      title: "Select the resources",
      text: "Select the resources and knowledge about our pricing models, time of development, and finalize.",
    },
    {
      title: "Sign a contract",
      text: "Last, sign an NDA with our company, and we get started on the development of the project.",
    },
  ],
  image: {
    text: "Total design freedom \n for everyone.",
    path: featureTwo01,
  },
};

import Time1 from "../assets/images/hire/timer1.svg";
import Time2 from "../assets/images/hire/timer2.svg";
import Time3 from "../assets/images/hire/timer3.svg";

// Hire Model data
export const HireModelData = {
  heading: "Our Hiring Model",
  text: "Hire as per the unique needs of your development project and provide you different hiring models to accommodate\n your needs better and get complete control over your development budget and time.",
  cardsData: [
    {
      image: Time1,
      title: "Full Time Hiring",
      houreTile: "Hours Per Day",
      hour: "9 Hour/Day",
      dayTitle: "Minimum Days",
      day: "2 Weeks",
    },
    {
      image: Time2,
      title: "Part Time Hiring",
      houreTile: "Hours Per Day",
      hour: "4 Hour/Day",
      dayTitle: "Minimum Days",
      day: "2 Weeks",
    },
    {
      image: Time3,
      title: "Hourly Time Hiring",
      houreTile: "Hours Per Day",
      hour: "Flexible",
      dayTitle: "Minimum Days",
      day: "50 Hours",
    },
  ],
};

//FrontEnd
import FeatureTabImg1 from "../assets/images/hire/angular-js.svg";
import FeatureTabImg2 from "../assets/images/hire/react-js.svg";
import FeatureTabImg3 from "../assets/images/hire/html-5.svg";
import FeatureTabImg4 from "../assets/images/hire/css-3.svg";
import FeatureTabImg5 from "../assets/images/hire/javascript.svg";
import FeatureTabImg6 from "../assets/images/hire/vue-js.svg";

// BackEnd
import FeatureTabImg7 from "../assets/images/hire/node-js.svg";
import FeatureTabImg8 from "../assets/images/hire/php-logo.svg";
import FeatureTabImg9 from "../assets/images/hire/python-logo.svg";
import FeatureTabImg10 from "../assets/images/hire/django-color.svg";
import FeatureTabImg27 from "../assets/images/hire/laravel1.svg";
import FeatureTabImg28 from "../assets/images/hire/symfony.svg";

//mobile
import FeatureTabImg11 from "../assets/images//hire/android-os.svg";
import FeatureTabImg12 from "../assets/images/hire/ios-logo.svg";
import FeatureTabImg13 from "../assets/images/hire/flutter-logo.svg";
import FeatureTabImg14 from "../assets/images/hire/react-js.svg";

// database
import FeatureTabImg15 from "../assets/images//hire/sql-server.svg";
import FeatureTabImg16 from "../assets/images/hire/mysql-logo.svg";
import FeatureTabImg17 from "../assets/images/hire/mongodb.svg";
import FeatureTabImg18 from "../assets/images/hire/postgresql.svg";

// CMS
import FeatureTabImg19 from "../assets/images/hire/wordpress-logo.svg";
import FeatureTabImg20 from "../assets/images/hire/shopify-logo.svg";
import FeatureTabImg21 from "../assets/images/hire/magento-logo.svg";
import FeatureTabImg22 from "../assets/images/hire/woocommerce-logo.svg";

// Cloud
import FeatureTabImg23 from "../assets/images/hire/amazon-web-services.svg";
import FeatureTabImg24 from "../assets/images/hire/google-cloud.svg";
import FeatureTabImg25 from "../assets/images/hire/azure.svg";
import FeatureTabImg26 from "../assets/images/hire/digitalOcean-logo.svg";

export const HireFeatureTabData = {
  sectionContent: {
    title: "Tool and Technologies",
  },
  posts: [
    {
      title: "Front End",
      content:
        "We are committed to providing top-notch services to our clients regardless of project size and worth. Every project is special to us and for every engagement, whether large or small, we try to give our 100%. We have more than 10+ years of experience in planning, developing, maintaining and managing IT systems. Lead cross-functional teams with diverse technical backgrounds. Experience in business process, outsourcing",
      image: [
        { image: FeatureTabImg1, name: "Angular" },
        { image: FeatureTabImg2, name: "React JS" },
        { image: FeatureTabImg6, name: "Vue JS" },
        { image: FeatureTabImg3, name: "HTML" },
        { image: FeatureTabImg4, name: "CSS" },
        { image: FeatureTabImg5, name: "Javascript" },
      ],
    },
    {
      title: "Backend",
      content:
        "Our mission is to help businesses adopt new technologies, resolve complex issues for better productivity, results, profits, and growth.We want to grow with our clients, along with our capability to build scalable and high performing apps our focus on customer satisfaction has been the key to our growth.",
      image: [
        { image: FeatureTabImg8, name: "PHP" },
        { image: FeatureTabImg9, name: "Python" },
        { image: FeatureTabImg7, name: "Node Js" },
        { image: FeatureTabImg27, name: "Laravel" },
        { image: FeatureTabImg10, name: "Django" },
        { image: FeatureTabImg28, name: "Symfony" },
      ],
    },
    {
      title: "Mobile",
      content:
        "IQ Infinite helps entrepreneurs, organizations, and product owners to develop their business or convert their ideas into products by providing various engagement models to work with. \n Digital Agencies hire us to scale their development team while entrepreneurs pick us for outsourced product development, upgrade, and support.",
      image: [
        { image: FeatureTabImg11, name: "Android" },
        { image: FeatureTabImg12, name: "Ios" },
        { image: FeatureTabImg13, name: "Flutter" },
        { image: FeatureTabImg14, name: "React Native" },
      ],
    },
    {
      title: "Database",
      content:
        "IQ Infinite helps entrepreneurs, organizations, and product owners to develop their business or convert their ideas into products by providing various engagement models to work with. \n Digital Agencies hire us to scale their development team while entrepreneurs pick us for outsourced product development, upgrade, and support.",
      image: [
        { image: FeatureTabImg16, name: "My Sql" },
        { image: FeatureTabImg17, name: "MongoDB" },
        { image: FeatureTabImg18, name: "Postgress" },
        { image: FeatureTabImg15, name: "Sql Server" },
      ],
    },
    {
      title: "CMS",
      content:
        "IQ Infinite helps entrepreneurs, organizations, and product owners to develop their business or convert their ideas into products by providing various engagement models to work with. \n Digital Agencies hire us to scale their development team while entrepreneurs pick us for outsourced product development, upgrade, and support.",
      image: [
        { image: FeatureTabImg19, name: "Worpress" },
        { image: FeatureTabImg20, name: "Shopify" },
        { image: FeatureTabImg21, name: "Majento" },
        { image: FeatureTabImg22, name: "Woocommerce" },
      ],
    },
    {
      title: "Cloud",
      content:
        "IQ Infinite helps entrepreneurs, organizations, and product owners to develop their business or convert their ideas into products by providing various engagement models to work with. \n Digital Agencies hire us to scale their development team while entrepreneurs pick us for outsourced product development, upgrade, and support.",
      image: [
        { image: FeatureTabImg23, name: "AWS" },
        { image: FeatureTabImg24, name: "Google Cloud" },
        { image: FeatureTabImg25, name: "Azure" },
        { image: FeatureTabImg26, name: "Digital Ocean" },
      ],
    },
  ],
};

import Svg1 from "@/images/career/positive.svg";
import Svg2 from "@/images/career/meeting.svg";
import Svg3 from "@/images/career/team.svg";
import Svg4 from "@/images/career/party.svg";

export const CareerHeaders = {
  header1: {
    heading: "Join Us to build a bright feature.",
    desc: "IQ Infinite Technologies established in 2019 with its web & mobile development proficiency to make a stamp in the domain of IT industry. It constantly went on expanding & augmenting its wings with worldwide customers & built up a firm reputation.The best company to take your career to new heights. Build Your right career with a leader in Information Technology services with IQ Infinite Technologies.",
    title: "Benifits with IQ Infinite Technologies",
    list1: [
      { list: "Friendly Atmosphare" },
      { list: "Flexible Time" },
      { list: "5 Working Days" },
      // { list: "Certification reimbursement program" },
    ],
    list2: [
      { list: "Health & Accidental Insurense" },
      // { list: "Accidental Insurence" },
      { list: "On-Demand Salary" },
      { list: "Smooth Reporting System" },
    ],
  },
  header2: [
    {
      image: Svg1,
      head: "Positive Environment",
      text: "When you have a dream, you've got to grab it and never let go.",
    },
    {
      image: Svg2,
      head: "Transparent Communication",
      text: "As bright and spirited as it gets to work and learn.",
    },
    {
      image: Svg3,
      head: "Training & Development",
      text: "The more that you read, the more things you will know.",
    },
    {
      image: Svg4,
      head: "Fun Connect",
      text: "Annual picnics, festival celebrations, fun and Connect activities.",
    },
  ],
};

export const ServiceCommonData = {
  list1: [
    {
      list: "One design for your desktop, tab and mobile.",
      icon: "fa fa-desktop",
    },
    {
      list: "Beautiful and modern design that makes difference.",
      icon: "fa fa-id-badge",
    },
    {
      list: "Boost your sales with strategically built user experience.",
      icon: "fa fa-users",
    },
  ],
  head: "planning & strategy",
  line: "We start work from prototyping to end product delivery and scaling to next millions users.",
  list2: [
    "Research beyond the business plan",
    "Marketing options and rates",
    "The ability to turnaround consulting",
    "Help companies into more profitable",
    "Customer engagement matters",
  ],
};

import serviceS9 from "@/images/s3_.jpg";
import serviceS10 from "@/images/s4_.jpg";
import serviceS3 from "@/images/s3_.jpg";
import serviceS4 from "@/images/s4_.jpg";
import serviceS7 from "@/images/s7_.jpg";
import serviceS8 from "@/images/s8_.jpg";
import serviceS11 from "@/images/s11_.jpg";
import serviceS12 from "@/images/s12_.jpg";
import serviceS5 from "@/images/s5_.jpg";
import serviceS6 from "@/images/s6_.jpg";
import serviceS1 from "@/images/s1_.jpg";
import serviceS2 from "@/images/s2_.jpg";

export const ServiceList = {
  service: [
    {
      id: 1,
      name: "website-design",
      url: "/service/website-design",
      image1: serviceS9,
      image2: serviceS10,
      heading: "Website Design",
      text: [
        "IQ Infinite Technologies is an emerging star in the web development field. We strive to fuel all kinds and scales of enterprises with our performance-driven, robust, and reliable web development services. \nOur team of dedicated developers uses different frameworks and technologies for your static or dynamic website requirements. With our unique approach to website development, we will let our clients have an advanced web identity. \nWe have experienced team having years of hands on experience in working with PHP,Symfony, Laravel & WordPress and other open source php frameworks. PHP frameworks are simple yet powerful open-source frameworks widely used for Web development for developing dynamic and interactive websites and web applications.",
      ],
    },
    {
      id: 2,
      name: "application-modernization",
      url: "/service/application-modernization",
      image1: serviceS1,
      image2: serviceS2,
      heading: "Application & Modernization",
      text: [
        "Accelerate modernisation with software and platform-driven solutions.",
        "Facing a new normal, today’s enterprises must modernise their business, fuel innovation and become more agile. That may require compressing years of change into months.",
        "At IQ Infinite Technologies, our application modernisation services help you achieve agility for an increasingly digital world. Integrate a combination of accelerators, platforms and strategic partners to modernise core business applications. The result: An enterprise that’s ready for whatever the new normal has in store for you.",
      ],
    },
    {
      id: 3,
      name: "ui-ux-design",
      url: "/service/ui-ux-design",
      image1: serviceS5,
      image2: serviceS6,
      heading: "UI/UX Design",
      text: [
        "IQ Infinite Technologies – A globally professional, expert and powerful UI/UX design and development company. When it comes to the UI/UX design and development we create well-designed user interfaces and enjoyable user-experience. In today’s competitive generation we are providing a rich feel and great look for your business and brands. User Interface(UI) and User Experience(UX) are a crucial and necessary part of Web, Mobile and Software Development to create a lasting impression on the user’s mind. Our developers don’t just create standard designs, they come up with innovation and unique designs which create experiences that last for a lifetime.",
      ],
    },
    {
      id: 4,
      name: "mobile-app-development",
      url: "/service/mobile-app-development",
      image1: serviceS7,
      image2: serviceS8,
      heading: "Mobile App Development",
      text: [
        "At IQ Infinite Technologies, we have a skilled and expert team of mobile application developers. Hire our remote mobile app developers or choose our app development services. We assure you to provide efficient iOS, Android and cross- platform application development services that will take your business and brands to the new heights. Mobile applications have verified to be the most effective when it comes to improving customer engagement and generating revenue.",
      ],
    },
    {
      id: 5,
      name: "devops-development",
      url: "/service/devops-development",
      image1: serviceS3,
      image2: serviceS4,
      heading: "DevOps Developer",
      text: [
        "We as a leading DevOps development company have initiatives that are focused on gaining management of the complete software development and deployment cycle, as well as streaming essential workflow phases. As a result the DevOps team will ensure that each software builds through code review and automated testing and that the products are uploaded to the cloud and pushed out the production.",
        "We thrive on fulfilling the requirements of our clients and it is our firm endeavour to deliver the most prudent development solutions most suitable for your business.",
      ],
    },
    {
      id: 6,
      name: "product-development",
      url: "/service/product-development",
      image1: serviceS11,
      image2: serviceS12,
      heading: "Product Development",
      text: [
        "A good product evolves gradually and keeps its end-users engaged forever. Software, mobile, desktop and web applications all need to be enhanced as per the changing industry trends. If it fails at it, even the best product of its time will be thrown out of the competition by new innovative products. That’s why IQ Infinite Technologies puts its whole focus on keeping your world-class digital products engaging, well-functioning, secured and updated. Our product enhancement services are fully-comprehensive and flexible.",
      ],
    },
  ],
};

import Approch from "../assets/images/approch2.jpg";

export const ApprochData = {
  sectionContent: {
    title: "Our Approch",
    subTitle: "",
    text: " At IQ Infinite, we believe that every client is unique and deserves a tailored approach. We take the time to understand your business goals and requirements before developing a customized solution that meets your needs. \n \n We follow a proven development process that includes ",
  },
  posts: [
    {
      title: "Consultation",
      text: "We meet with you to discuss your goals and requirements.",
    },
    {
      title: "Planning",
      text: "We create a roadmap and timeline for the project.",
    },
    {
      title: "Design",
      text: "We create wireframes, mockups, and prototypes to ensure we're on the same page.",
    },
    {
      title: "Development",
      text: "Our team develops your website or app, keeping you informed every step of the way.",
    },
    {
      title: "Testing",
      text: "We rigorously test the website or app to ensure it meets your requirements and is bug-free.",
    },
    {
      title: "Launch",
      text: "We launch your website or app and provide ongoing support to ensure it continues to function as expected.",
    },
  ],
  image: {
    text: "Total design freedom \n for everyone.",
    path: Approch,
  },
};

export const WhyChooseUsData = {
  sectionContent: {
    title: "Why Choose Us",
    text: " At IQ Infinite, we are committed to delivering exceptional results that exceed our clients' expectations. Here are a few reasons why you should choose us ",
  },
  cards: [
    {
      icon: "fa fa-database",
      title: "Technical Expertise",
      desc: "Our founders and team members are technical experts with years of experience in their respective fields.",
    },
    {
      icon: "fa fa-upload",
      title: "Innovative solutions",
      desc: "We use the latest technologies and best practices to create innovative solutions that help businesses grow and thrive.",
    },
    {
      icon: "fa fa-camera",
      title: "Customized approach",
      desc: "We take the time to understand our clients' unique needs and requirements and develop customized solutions to meet them.",
    },
    {
      icon: "fa fa-hourglass-half",
      title: "Proven process",
      desc: "Our development process has been proven and the proven way we provide our service or product to our customers.",
    },
  ],
};

export const Address = {
  address: [
    {
      icon: "map-marker",
      title: "Office",
      text: "806, Elite Business Park, \n Opp. Shapath Hexa, Sola, \n Ahmedabad, Gujrat - 380060.",
    },
    {
      icon: "envelope",
      title: "Email",
      text: "info@iqinfinite.in",
    },
    {
      icon: "phone",
      title: "Phone",
      text: "+91 8160125447",
    },
  ],
};

export const API = "http://192.168.1.54:8000/api/v1";

export const config = {
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
    type: "formData",
  },
};
