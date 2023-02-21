import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { setLoginData } from "../redux/logindataslice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLoginData(null));
  };
  return (
    <div className="dashboard">
      <NavLink to="/dashboard">projects</NavLink>
      <NavLink to="/dashboard/settings">settings</NavLink>
      <h1 onClick={logout}>Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default Dashboard;
