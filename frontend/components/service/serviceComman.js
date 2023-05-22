import React from 'react'
import Image from "next/image";
import { ServiceCommonData } from '@/data';

const serviceComman = ({image}) => {
    const{list1, head, line, list2} = ServiceCommonData
  return (
    <>
     <ul>
        {list1.map(({ list, icon }, index) => (
          <>
            <li style={{ display: "block" }}>
              <i className={icon} aria-hidden="true"></i>
              {list}
            </li>
          </>
        ))}
      </ul>
      <div className="row gaping">
        <div className="col-lg-6 col-sm-12 col-md-6">
          <Image src={image} alt="" style={{ filter: "grayscale(100%)" }} />
        </div>
        <div className="col-lg-6 col-sm-12 col-md-6">
          <h3>{head}</h3>
          <p>{line}</p>
          <ul>
            {list2.map((list , index) => (
              <>
                <li style={{ display: "block" }} key={index}>
                  <i className="fa fa-check-square" aria-hidden="true"></i>
                  {list}
                </li>
              </>
            ))}            
          </ul>
        </div>
      </div>
    </>
  )
}

export default serviceComman