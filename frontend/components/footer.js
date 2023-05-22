import React from "react";
import { LogoImage } from "@/data";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { dark } = LogoImage;
  return (
    <footer className="footer_1">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-sm-6 col-md-5">
            <aside className="widget aboutwidget">
              <Link href="/">
                <Image src={dark} alt="Logo" />                
              </Link>              
            </aside>
          </div>
          <div className="col-lg-4 col-sm-4 col-md-4">
            <aside className="widget contact_widgets">
              <h3 className="widget_title">contact</h3>
              <p>
                806, Elite Business Park, Opp. Shapath Hexa,
                <br />
                Sola, Ahmedabad, Gujrat - 380060.
              </p>
              <p>P: +91 81601 25447</p>
              <p>
                E: <a href="#">info@iqinfinite.in</a>
              </p>
            </aside>
          </div>
          <div className="col-lg-3 col-sm-2 col-md-3">
            <aside className="widget social_widget">
              <h3 className="widget_title">social</h3>
              <ul>
                <li>
                  <Link href="https://twitter.com/IQInfiniteTech" target="_blank">
                    <i className="fa fa-twitter"></i>Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/iq_infinite_technologies/" target="_blank">
                    <i className="fa fa-instagram"></i>Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/iq-infinite-technologies/" target="_blank">
                    <i className="fa fa-linkedin"></i>Linkedin
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-sm-12 text-center">
            <div className="copyright">
              © copyright {new Date().getFullYear()} by{" "}
              <a href="#">iqinfinite.in</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
