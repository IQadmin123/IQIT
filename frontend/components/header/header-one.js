import React, { useState, useEffect, useContext } from "react";
import { LogoImage, NavLinks } from "@/data";
import { Col, Container, Row, } from "react-bootstrap";
import { SearchContext } from "@/context/search-context";
import { MenuContext } from "@/context/menu-context";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from 'next/router';

const HeaderOne = () => {
  const [sticky, setSticky] = useState(false);
  const { searchStatus, updateSearchStatus } = useContext(SearchContext);
  const { menuStatus, updateMenuStatus } = useContext(MenuContext);
  const router = useRouter();

  const handleSearchClick = (e) => {
    e.preventDefault();
    updateSearchStatus(!searchStatus);
  };
  const handleMenuClick = (e) => {
    e.preventDefault();
    updateMenuStatus(!menuStatus);
  };

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setSticky(true);
    } else if (window.scrollY < 70) {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sticky]);

  console.log("Current Path",router.pathname)

  return (
    <header
      className={`header_01 ${
        true === sticky ? "fixedHeader animated flipInX" : null
      }`}
      id="header"      
    >
      <Container fluid >
        <Row className="justify-content-between">
          <Col className="col-6" lg={2} md={3} sm={3}>
            <div className="logo">
              <Link href="/">
                <span>
                  <Image src={true === sticky ? LogoImage.dark :LogoImage.light } alt="logo" />
                </span>                
              </Link>
            </div>
          </Col>
          <Col lg={8} sm={8} md={7} className="d-none d-lg-block ">
            <nav className="mainmenu text-right">
              <ul>
                {NavLinks.map((links, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        undefined !== links.subItems
                          ? "menu-item-has-children"
                          : ""
                      }` + router.pathname == links.url ? "active" : ""} 
                    >
                      <Link href={links.url} style={true === sticky ? {color:"#fff"}:{color:"#000"} }>
                        <span>{links.name}</span>
                      </Link>
                      {undefined !== links.subItems ? (
                        <ul className="sub-menu">
                          {links.subItems.map((subLinks, index) => (
                            <li key={index}>
                              <Link href={subLinks.url}>
                                <span>{subLinks.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Col>
          <Col lg={2} md={2} sm={4} className="col-6 navigator-menu">
            <div className="navigator text-right" >              
              <Link
                href="#"
                className="menu mobilemenu d-none d-md-none d-lg-none"
              >
                <i className="mei-menu"></i>
              </Link>
              <Link
                id="open-overlay-nav"
                className="menu hamburger"
                onClick={handleMenuClick}
                href="#"
                style={true === sticky ? {color:"#fff"}:{color:"#000"} }
              >
                <i className="mei-menu"></i>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default HeaderOne;
