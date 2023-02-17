import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import NotFound from "./Pages/404";
import Auth from "./Pages/Auth/Auth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Projects from "./Pages/Dashboard/SubRoutes/Projects/Projects";
import Settings from "./Pages/Dashboard/SubRoutes/Settings/Settings";
import Root from "./Pages/Root";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Auth />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Projects />} />
          <Route path="settings" element={<Settings />} />
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
