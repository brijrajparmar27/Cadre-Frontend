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
import CreateProject from "./Pages/Dashboard/SubRoutes/CreateProject/CreateProject";
import CreateTask from "./Pages/Dashboard/SubRoutes/Project/subRoutes/CreateTask";
import Project from "./Pages/Dashboard/SubRoutes/Project/Project";
import Projects from "./Pages/Dashboard/SubRoutes/Projects/Projects";
import Settings from "./Pages/Dashboard/SubRoutes/Settings/Settings";
import TimeSheets from "./Pages/Dashboard/SubRoutes/TimeSheets.jsx/TimeSheets";
import Root from "./Pages/Root";
import Details from "./Pages/Dashboard/SubRoutes/Project/subRoutes/Details";
import AddTimeSheet from "./Pages/Dashboard/SubRoutes/TimeSheets.jsx/AddTimeSheet";
import EditProject from "./Pages/Dashboard/SubRoutes/EditProject/EditProject";
import Chat from "./Pages/Dashboard/SubRoutes/Chat/Chat";
import AllUsers from "./Pages/Dashboard/SubRoutes/Admin/AllUsers";

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
          <Route index element={<Projects />}></Route>
          <Route path="project" element={<Project />}></Route>
          <Route
            path="project/createTask"
            element={<CreateTask></CreateTask>}
          ></Route>

          <Route path="project/details" element={<Details></Details>}></Route>
          <Route path="addProject" element={<CreateProject></CreateProject>} />
          <Route
            path="project/EditProject"
            element={<EditProject></EditProject>}
          />
          <Route path="settings" element={<Settings />} />
          <Route path="time-sheet" element={<TimeSheets />} />
          <Route path="chats" element={<Chat />} />
          <Route path="time-sheet/addTimesheet" element={<AddTimeSheet />} />
          <Route path="all-users" element={<AllUsers />} />
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
