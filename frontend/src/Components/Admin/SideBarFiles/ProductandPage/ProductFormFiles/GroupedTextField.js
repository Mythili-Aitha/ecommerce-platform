import React from "react";
import { TextField } from "@mui/material";

const GroupedTextField = ({
  group,
  product,
  handleChange,
  fields,
  type = "text",
}) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      {fields.map((field) => (
        <TextField
          key={field}
          label={capitalize(field)}
          name={field}
          fullWidth
          type={type}
          value={product[group][field]}
          onChange={handleChange(group)}
          required
          sx={{ mb: 2 }}
          multiline={field === "description"}
        />
      ))}
    </>
  );
};

export default GroupedTextField;
