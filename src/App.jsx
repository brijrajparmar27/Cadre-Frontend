import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import NotFound from "./Pages/404";
import Auth from "./Pages/Auth/Auth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Project from "./Pages/Dashboard/SubRoutes/Project/Project";
import Projects from "./Pages/Dashboard/SubRoutes/Projects/Projects";
import Settings from "./Pages/Dashboard/SubRoutes/Settings/Settings";
import TimeSheets from "./Pages/Dashboard/SubRoutes/TimeSheets.jsx/TimeSheets";
import Root from "./Pages/Root";

function App() {
  const { userData } = useSelector((state) => state.logindataslice);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          index
          element={
            userData && userData.jwt ? <Navigate to="/dashboard" /> : <Auth />
          }
        />
        <Route
          path="dashboard"
          element={
            userData && userData.jwt ? <Dashboard /> : <Navigate to="/" />
          }
        >
          <Route index element={<Projects />} />
          <Route path="project" element={<Project />} />
          <Route path="settings" element={<Settings />} />
          <Route path="time-sheet" element={<TimeSheets />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
