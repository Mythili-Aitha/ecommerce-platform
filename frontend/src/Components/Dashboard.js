import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <div>
          <p>
            <strong>Dashboard</strong>{" "}
          </p>
        </div>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Skeleton variant="rounded" width={450} height={500} />
          <Skeleton variant="rounded" width={150} height={500} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Skeleton variant="rectangle" width={600} height={50} />
          <Skeleton variant="rectangle" width={600} height={50} />
          <Skeleton variant="rectangle" width={600} height={50} />
        </Box>
      </Box>
    </>
  );
}
