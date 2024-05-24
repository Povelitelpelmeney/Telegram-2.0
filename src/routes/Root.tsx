import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "../hooks";
import Sidebar from "../components/Sidebar";

const Root = () => {
  const navigate = useNavigate();
  const isHome = useMatch("/");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth");
  }, [navigate]);

  useEffect(() => {
    console.log("hi");
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <>
          <Sidebar />
          <Outlet />
        </>
      ) : isHome ? (
        <Sidebar />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Root;
