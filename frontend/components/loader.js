import React from "react";
import Image from "next/image";
import Spinner from "@/images/loader1.svg"

const Loader = () => {
  return (
      <div className="loader">
        <Image src={Spinner} alt="Spinner" />
        </div>    
  );
};

export default Loader;
