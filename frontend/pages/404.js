import {useRouter} from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Error from "../components/not-found"

const NotFound = () => {
    const router = useRouter()

    useEffect(()=>{        
        setTimeout(()=>{           
            router.push("/")
        }, 5000)
    }, [])
  return (
    <div className='main-error-conatinaer'>
        <Error/>
    </div>
  )
}

export default NotFound