import React from "react";
import MainLayout from "../layouts/MainLayout";
import ProjectListTable from "../components/ProjectListTable/ProjectListTable";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Projects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Box
        sx={{
          maxWidth: "1028px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Favorites Projects</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/add-project");
            }}
            sx={{ height: "fitContent" }}
          >
            Add Project
          </Button>
        </Box>
        <ProjectListTable />
      </Box>
    </MainLayout>
  );
};

export default Projects;
