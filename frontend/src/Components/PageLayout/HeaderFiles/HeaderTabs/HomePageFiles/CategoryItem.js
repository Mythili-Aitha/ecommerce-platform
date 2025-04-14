import { Box, Avatar, Typography } from "@mui/material";
import { avatar, categoryName } from "../../../../../Utils/Styles";

const CategoryItem = ({ category, onClick }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <Avatar src={category.image} sx={avatar} />
    <Typography variant="body1" sx={categoryName}>
      {category.name}
    </Typography>
  </Box>
);

export default CategoryItem;
