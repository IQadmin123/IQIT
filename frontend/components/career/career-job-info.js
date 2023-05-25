import React from 'react'
import {JobInfoCardData} from "@/data"

const CareerJobInfo = () => {
    const {benefits} = JobInfoCardData
  return (
    <div className='mt-3'>    
      <div className='location'>
        <h4>Location & Commitments</h4>
        <p>
          Permanent full-time role based at our Ahmedabad, Gujarat office Monday – Friday
        </p>
      </div>
      <div className='salary'>
      <h4>Salary Package</h4>
      <p>No bars for the right candidate.</p>
      </div>

      <div className="why-work">
      {benefits.map((benefit, index)=>(
        <>
            <li key={index}>{benefit}</li>
        </>
      ))}       
      </div>
    </div>
  );
}

export default CareerJobInfo