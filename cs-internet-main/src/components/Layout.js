import Hero from "./Hero";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NavbarAdmin from "./NavbarAdmin";
import NavbarTeknisi from "./NavbarTeknisi";
import NavbarCustomer from "./NavbarCustomer";
import { useAuth } from "../hooks/AuthProvider";
import React, { useEffect } from "react";

export default function Layout({ children, withHero }) {
  const { token, getUser, role } = useAuth();
  useEffect(() => {
    if (token) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <>
      {role === "admin" ? (
        <NavbarAdmin />
      ) : role === "technician" ? (
        <NavbarTeknisi />
      ) : role === "customer" ? (
        <NavbarCustomer />
      ) : (
        <Navbar />
      )}
      {withHero ? <Hero /> : ""}
      <div className="container">{children}</div>
      <Footer />
    </>
  );
}
