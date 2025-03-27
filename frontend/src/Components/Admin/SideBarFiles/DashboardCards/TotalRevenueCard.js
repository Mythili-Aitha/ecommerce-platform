import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { getRevenueBreakdown } from "../../../../Utils/Api";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const TotalRevenueCard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRevenueBreakdown()
      .then((response) => {
        setRevenueData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch revenue data");
        setLoading(false);
      });
  }, []);

  const pieData = {
    labels: revenueData.map((item) => item.categoryName),
    datasets: [
      {
        data: revenueData.map((item) => item.totalRevenue),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Revenue Breakdown
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        ) : (
          <Pie data={pieData} />
        )}
      </CardContent>
    </Card>
  );
};

export default TotalRevenueCard;
