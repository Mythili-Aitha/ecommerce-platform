import { Box, Avatar, Typography } from "@mui/material";
import { avatar } from "../../../../../Utils/Styles";

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
    <Typography
      variant="body1"
      sx={{ mt: 1, fontSize: "14px", fontWeight: 500 }}
    >
      {category.name}
    </Typography>
  </Box>
);

export default CategoryItem;
