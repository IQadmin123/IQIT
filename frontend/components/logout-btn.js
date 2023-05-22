import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const logout = () => {    
    localStorage.removeItem('token')
    router.push("/login/");    
  };

  return (    
    <button 
      type="submit" 
      className="btn btn-light logoutBtn " 
      onClick={logout}
      >
      Logout
    </button>    
  );
};

export default LogoutButton;
