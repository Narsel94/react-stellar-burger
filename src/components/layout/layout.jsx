import React from "react";
import AppHeader from "../app-header/app-header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default Layout;
