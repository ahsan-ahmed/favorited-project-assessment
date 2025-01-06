import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import { drawerWidth } from "../../utils/constant";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "None",
          borderBottom: "1px solid #dddddd",
        }}
        color="transparent"
      >
        <Toolbar>
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Favorited Project
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
