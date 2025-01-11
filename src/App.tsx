import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const AddProject = React.lazy(() => import("./pages/AddProject"));
const ProjectDetail = React.lazy(() => import("./pages/ProjectDetail"));

import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import AppProvider from "./context/providers/AppProvider";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<Loader type="skeleton" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/new" element={<AddProject />} />
              <Route
                path="/projects/:projectId/edit"
                element={<AddProject />}
              />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </AppProvider>
  );
};

export default App;
