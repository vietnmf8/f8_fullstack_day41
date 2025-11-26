import React from "react";
import { Outlet } from "react-router";

function DefaultLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
