import { Project } from "../interfaces/project";

const apiUrl = process.env.NODE_ENV === "production"
    ? "https://favorited-project-server.vercel.app/api"
    : "http://localhost:5000/api";

export const getProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${apiUrl}/projects`);
    if (!response.ok) throw new Error("Failed to fetch projects");
    return response.json();
};

export const fetchProject = async (id: string): Promise<Project> => {
    const response = await fetch(`${apiUrl}/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
};

export const createProject = async (project: Project): Promise<Project> => {
    const response = await fetch(`${apiUrl}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("Failed to add project");
    return response.json();
};

export const editProject = async (id: string, project: Project): Promise<Project> => {
    const response = await fetch(`${apiUrl}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
    });

    if (!response.ok) throw new Error("Failed to edit project");

    return response.json();
};