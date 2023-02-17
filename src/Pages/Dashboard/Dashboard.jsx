import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <NavLink to="/dashboard">projects</NavLink>
      <NavLink to="/dashboard/settings">settings</NavLink>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default Dashboard;
