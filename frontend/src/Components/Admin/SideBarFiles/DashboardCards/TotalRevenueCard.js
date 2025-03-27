import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { getRevenueBreakdown, getRevenueByStatus } from "../../../../Utils/Api";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const TotalRevenueCard = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getRevenueBreakdown(), getRevenueByStatus()])
      .then(([categoryRes, statusRes]) => {
        setCategoryData(categoryRes.data);
        setStatusData(statusRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch revenue data");
        setLoading(false);
      });
  }, []);

  const pieChartData = (labels, values) => ({
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#9966FF",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  });

  return (
    <Card sx={{ minWidth: 275, p: 2 }}>
      <CardContent>
        <Typography variant="h5">Revenue Breakdown</Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            <Box sx={{ width: 300 }}>
              <Typography variant="subtitle1" align="center">
                By Category
              </Typography>
              <Pie
                data={pieChartData(
                  categoryData.map((item) => item.categoryName),
                  categoryData.map((item) => item.totalRevenue)
                )}
              />
            </Box>
            <Box sx={{ width: 300 }}>
              <Typography variant="subtitle1" align="center">
                By Order Status
              </Typography>
              <Pie
                data={pieChartData(
                  statusData.map((item) => item.status),
                  statusData.map((item) => item.revenue)
                )}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalRevenueCard;
