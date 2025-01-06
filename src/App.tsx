import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import { ProjectProvider } from "./context/ProjectContext";

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/add-project/:id?" element={<AddProject />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
};

export default App;
