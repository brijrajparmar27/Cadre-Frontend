import "./Dashboard.css";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { setLoginData } from "../redux/logindataslice";
import Sidebar from "./Components/Sidebar/Sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className="dashboard">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
