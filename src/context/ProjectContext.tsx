import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Project } from "../interfaces/project";
import { createProject, editProject, getProjects } from "../utils/api";

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

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, []);

  const addProject = (project: Project) => {
    createProject(project)
      .then((addedProject) =>
        setProjects((prevProjects) => [...prevProjects, addedProject])
      )
      .catch((error) => console.error(error));
  };

  const updateProject = (id: string, updatedProject: Project) => {
    editProject(id, updatedProject)
      .then((updatedProject) =>
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          )
        )
      )
      .catch((error) => console.error("Error updating project:", error));
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
