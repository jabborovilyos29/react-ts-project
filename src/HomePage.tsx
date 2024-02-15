import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function HomePage() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", overflow: "hidden" }}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
