import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Actions } from "../../Utils/Actions";

export default function History() {
  const { history } = Actions();

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5">User Activity History</Typography>
      {history.length === 0 ? (
        <Typography>No history available</Typography>
      ) : (
        <List>
          {history.map((entry, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${entry.action}: ${entry.details}`}
                secondary={entry.date}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
