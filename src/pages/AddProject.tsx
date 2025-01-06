import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Box } from "@mui/material";
import ProjectForm from "../components/ProjectForm/ProjectForm";

const AddProject: React.FC = () => {
  return (
    <MainLayout>
      <Box
        sx={{
          maxWidth: "1028px",
        }}
      >
        <ProjectForm />
      </Box>
    </MainLayout>
  );
};

export default AddProject;
