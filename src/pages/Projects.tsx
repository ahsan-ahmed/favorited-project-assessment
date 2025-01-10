import React from "react";
import MainLayout from "../layouts/MainLayout";
import ProjectListTable from "../components/ProjectListTable/ProjectListTable";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Projects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Box className="flex justify-between items-center py-6">
        <h1 className="text-xl sm:text-2xl">Favorite Projects</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/projects/new");
          }}
          className="!capitalize !shadow-none !bg-[#0075ff] !rounded-none"
        >
          Create Project
        </Button>
      </Box>
      <ProjectListTable />
    </MainLayout>
  );
};

export default Projects;
