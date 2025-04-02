import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { Actions } from "../../Utils/Actions";
import { historyBox } from "../../Utils/Styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function History() {
  const { history, setHistory } = Actions();
  const [searchTerm, setSearchTerm] = useState("");
  // const [filterOption, setFilterOption] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  const filteredHistory = history.filter((entry) => {
    const searchMatch =
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase());
    let dateMatch = true;
    if (startDate || endDate) {
      const entryDate = new Date(entry.date);
      if (startDate && entryDate < startDate) dateMatch = false;
      if (endDate && entryDate > endDate) dateMatch = false;
    }

    return searchMatch && dateMatch;
  });

  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={historyBox}>
        <Typography variant="h5">User Activity History</Typography>
        <TextField
          label="Search History"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          style={{ marginBottom: "20px" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          variant="outlined"
          onClick={handleClearHistory}
          style={{ marginBottom: "20px" }}
        >
          Clear History
        </Button>
      </Box>
      {filteredHistory.length === 0 ? (
        <Box>
          <Typography>No history available</Typography>
        </Box>
      ) : (
        <>
          <Box>
            <List>
              {paginatedHistory.map((entry, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${entry.action}: ${entry.details}`}
                    secondary={entry.date}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
              count={Math.ceil(filteredHistory.length / itemsPerPage)}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}
