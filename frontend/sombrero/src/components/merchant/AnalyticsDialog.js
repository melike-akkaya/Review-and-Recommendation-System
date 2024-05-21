import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { getVisitCount } from "../../services/ProductService";
import { getWishlistCount } from "../../services/WishlistService";
import { useEffect, useState } from "react";
import React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const AnalyticsDialog = ({ open, setOpen, products }) => {
  const [wishlistCounts, setWishlistCounts] = useState([]);
  const [visitCounts, setVisitCounts] = useState([]);
  const [chartDataReady, setChartDataReady] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      const localWishListCounts = [];
      const localVisitCounts = [];

      await Promise.all(
        products.map(async (product) => {
          if (product && product.productId) {
            try {
              const wishCountResponse = await getWishlistCount(
                product.productId
              );
              const visitCountResponse = await getVisitCount(product.productId);

              localWishListCounts.push(wishCountResponse);
              if (visitCountResponse.data === "") {
                localVisitCounts.push(0);
              } else {
                localVisitCounts.push(visitCountResponse.data);
              }
            } catch (error) {
              console.error(
                `Error getting counts for product ${product.productId}:`,
                error
              );
              // assuming 0 for simplicity:
              localWishListCounts.push(0);
              localVisitCounts.push(0);
            }
          }
        })
      );

      setWishlistCounts(localWishListCounts);
      setVisitCounts(localVisitCounts);
      setChartDataReady(true);
    };

    if (products.length > 0) {
      fetchCounts();
    }
  }, [products]);

  const handleClose = () => {
    setOpen(false);
  };

  const renderBarChart = () => {
    if (
      products.length === 0 ||
      wishlistCounts.length === 0 ||
      visitCounts.length === 0
    ) {
      return null;
    }

    return (
      <BarChart
        series={[
          {
            data: wishlistCounts,
            label: "Wishlist Counts",
            color: "#ff9ff3",
          },
          {
            data: visitCounts,
            label: "Visit Counts",
            color: "#48dbfb",
          },
        ]}
        height={400}
        width={600}
        layout="horizontal"
        xAxis={[
          {
            scaleType: "linear",
          },
        ]}
        yAxis={[
          {
            data: products.map((product) => product.name),
            scaleType: "band",
            tickSize: 10,
          },
        ]}
        margin={{ left: 150 }}
      />
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Analytics</DialogTitle>
        <DialogContent
          dividers
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          {chartDataReady ? (
            renderBarChart()
          ) : (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>
          )}
          <Grid item xs={12} align="right" style={{ marginTop: "16px" }}>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnalyticsDialog;
