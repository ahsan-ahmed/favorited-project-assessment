import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/StarOutlined";

import { Typography, Box } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import { fetchProject } from "../utils/api";
import { Project } from "../interfaces/project";
import { useProjects } from "../context/ProjectContext";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const { updateProject } = useProjects();

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId)
        .then((data) => setProject(data))
        .catch((error) =>
          console.error("Failed to fetch project details:", error)
        );
    }
  }, [projectId, project]);

  if (!project) {
    return <Typography>Loading project details...</Typography>;
  }

  return (
    <MainLayout>
      <Box sx={{ padding: "20px" }}>
        <Box className="flex items-center gap-4">
          <Typography variant="h4" className="mb-4">
            Project Details
          </Typography>

          <IconButton
            color={project.favorited ? "primary" : "default"}
            onClick={() => {
              const updatedRow = { ...project, favorited: !project.favorited };
              updateProject(project.id, updatedRow);
            }}
          >
            {!project.favorited ? (
              <StarBorderIcon fontSize="large" />
            ) : (
              <StarIcon sx={{ color: "red" }} fontSize="large" />
            )}
          </IconButton>
        </Box>

        <Box className="flex mb-4 items-center gap-4">
          <Typography variant="h6" className="text-right">
            Project ID
          </Typography>
          <Typography className="w-[350px] self-center">
            {project.id}
          </Typography>
        </Box>

        <Box className="flex mb-4 items-center gap-4">
          <Typography variant="h6" className="text-right">
            Project Name
          </Typography>
          <Typography className="w-[350px] self-center">
            {project.name}
          </Typography>
        </Box>

        <Box className="flex mb-4 items-center gap-4">
          <Typography variant="h6" className="text-right self-start">
            Description
          </Typography>
          <Typography className="w-[350px] self-center">
            {project.description}
          </Typography>
        </Box>

        <Box className="flex mb-4 items-center gap-4">
          <Typography variant="h6" className="text-right">
            Start Date
          </Typography>
          <Typography className="w-[350px] self-center">
            {project.startDate}
          </Typography>
        </Box>

        <Box className="flex mb-4 items-center gap-4">
          <Typography variant="h6" className="text-right">
            End Date
          </Typography>
          <Typography className="w-[350px] self-center">
            {project.endDate}
          </Typography>
        </Box>

        <Box className="flex mb-4 items-center gap-4">
          <Typography variant="h6" className="text-right">
            Project Manager
          </Typography>
          <Typography className="w-[350px] self-center">
            {project.manager}
          </Typography>
        </Box>

        <Box className="flex gap-4 mt-10">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/projects");
            }}
            className="!capitalize !shadow-none !bg-[#0075ff] !rounded-none w-[100px]"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/projects/${project.id}/edit`);
            }}
            className="!capitalize !shadow-none !bg-[#0075ff] !rounded-none w-[100px]"
          >
            Edit
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default ProjectDetail;
