import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sideBarSx } from "../../../Utils/Styles";

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState("/admin");
  const items = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Users", icon: <PeopleAltIcon />, path: "/admin/users" },
    { text: "Products", icon: <ShoppingCartIcon />, path: "/admin/products" },
    { text: "Orders", icon: <InventoryIcon />, path: "/admin/orders" },
    { text: "Discounts", icon: <StarIcon />, path: "/admin/discounts" },
  ];
  const handleClick = (path) => {
    setSelectedItem(path);
  };
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List sx={{ width: 240, paddingTop: 2 }}>
        {items.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={selectedItem === item.path}
            onClick={() => handleClick(item.path)}
            sx={sideBarSx}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
