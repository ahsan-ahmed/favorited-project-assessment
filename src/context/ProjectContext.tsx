import React, { createContext, useState, ReactNode, useContext } from "react";

export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  manager: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updatedProject: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const updateProject = (id: string, updatedProject: Project) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
