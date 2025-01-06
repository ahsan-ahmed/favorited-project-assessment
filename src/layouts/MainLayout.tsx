import React from "react";
import Header from "../components/Header/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import SideBar from "../components/SideBar/SideBar";
import { drawerWidth } from "../utils/constant";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
