import React from 'react'
import {Container} from "react-bootstrap"
import Link from 'next/link';
import {HireDeveloperData} from "@/data"

const HireDeveloper = () => {
    const {title, desc1, desc2, label} = HireDeveloperData
  return (
    <section className="commonSection res-common-section" style={{ backgroundColor: "hsl(0deg 0% 96%)" }}>
      <Container className="">
        <h2 className="sec_title MB_45 text-center">
          {title}
        </h2>
        <p>{desc1}</p>
        <p>{desc2}</p>
        <div className='text-center'>
          <Link className="common_btn red_bg" href="/contact">
            <span>{label}</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default HireDeveloper