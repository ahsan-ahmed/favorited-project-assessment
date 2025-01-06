import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Home</h1>
      </Box>
    </MainLayout>
  );
}
