import React from "react";
import { CircularProgress, Box, Skeleton } from "@mui/material";

type LoaderProps = {
  type?: "skeleton" | "spinner";
};

const Loader: React.FC<LoaderProps> = ({ type = "spinner" }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      minHeight="100vh"
    >
      {type === "skeleton" ? (
        <Box sx={{ width: "100%", padding: "20px" }}>
          <Skeleton
            variant="text"
            width="80%"
            height={40}
            sx={{ marginBottom: "10px" }}
          />

          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ marginBottom: "20px" }}
          />

          <Skeleton
            variant="text"
            width="60%"
            height={30}
            sx={{ marginBottom: "10px" }}
          />

          <Skeleton
            variant="text"
            width="90%"
            height={30}
            sx={{ marginBottom: "10px" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={150}
            sx={{ marginBottom: "20px" }}
          />
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default Loader;
