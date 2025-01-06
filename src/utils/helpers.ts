import { Project } from "../context/ProjectContext";

export const generateProjectId = (projects: Project[]) => {
    const nextId = projects.length + 1;
    return `project_${nextId}`;
};