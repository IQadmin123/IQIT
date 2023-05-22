import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const NotFound = () => {
  const [count, setCount] = useState(6)

  useEffect(()=>{
    setInterval(()=>{
      setCount(count - 1)
    }, 1000)
  })
  return (
    <div className='not-found'>
        <h1 className='text'>404</h1>  
        <h4>oops! Page Not Found</h4> 
        <h6 className='text-center'>Sorry, the page you're looking for doesn't exist. if you think <br /> something is broken report a problem</h6>  
        <Link href="/">
        <button className='btn btn-info'>Return Home</button>        
        </Link>   

        <p>Redirecting to the homepage...{count}</p>
    </div>
  )
}

export default NotFound