import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate, useParams } from "react-router-dom";
import { drawerWidth } from "../../utils/constant";
import { useProjects } from "../../context/ProjectContext";

interface MenuItem {
  name: string;
  url?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface Props {
  window?: () => Window;
}

export default function SideBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { projects } = useProjects();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      name: "Home",
      url: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Favorite Projects",
      icon: <WorkIcon />,
      url: "/projects",
      children: projects.map((project) => ({
        name: project.name,
        url: "/projects",
      })),
    },
  ];

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderMenuItems = (items: MenuItem[]) =>
    items.map((item) => (
      <div key={item.name}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(item.url || "");
            }}
            component={item.url ? "a" : "div"}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
        {item.children && (
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {renderMenuItems(item.children)}
          </List>
        )}
      </div>
    ));

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <List>{renderMenuItems(menuItems)}</List>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <List>{renderMenuItems(menuItems)}</List>
      </Drawer>
    </Box>
  );
}
