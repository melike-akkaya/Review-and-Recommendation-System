import React, { useEffect, useState } from "react";
import { getMerchantInfo } from "../services/MerchantService";
import { getProductsByMerchantId } from "../services/ProductService";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AuthorizedPersonInformation } from "../components/merchant/AuthorizedPersonInformation";
import { MerchantInfo } from "../components/merchant/MerchantInfo";
import Header from "./Header";
import AddProductDialog from "../components/merchant/AddProductDialog";
import ProductList from "../components/merchant/ProductList";

export default function MerchantProfile() {
  const [initialMerchant, setInitialMerchant] = useState(null);
  const [initialAuthorizedPerson, setInitialAuthorizedPerson] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false);

  const fetchProducts = (merchantId) => {
    getProductsByMerchantId(merchantId)
      .then(setProducts)
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    const merchantId = 1;
    getMerchantInfo(merchantId)
      .then((response) => {
        setInitialMerchant({
          name: response.data.name,
          id: response.data.id,
          country: response.data.country,
          image: response.data.image,
        });
        setInitialAuthorizedPerson({
          id: response.data.id,
          authorizedPersonName: response.data.authorizedPersonName,
          authorizedPersonSurname: response.data.authorizedPersonSurname,
          email: response.data.email,
          country: response.data.country,
        });
        fetchProducts(merchantId);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div style={{ padding: "0 20px" }}>
        <AddProductDialog
          open={isAddProductDialogOpen}
          setOpen={setAddProductDialogOpen}
          refreshProducts={() => fetchProducts(1)}
        />
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="flex-start" spacing={2}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      // Placeholder for analytics button click action
                    }}
                  >
                    <AnalyticsIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      setAddProductDialogOpen(true);
                    }}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Stack>
                {initialMerchant && <MerchantInfo merchant={initialMerchant} />}
              </Stack>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              {initialAuthorizedPerson && (
                <AuthorizedPersonInformation
                  initialAuthorizedPerson={initialAuthorizedPerson}
                />
              )}
            </Grid>
          </Grid>
          {products.length > 0 && (
            <ProductList
              products={products}
              refreshProducts={() => fetchProducts(1)}
            />
          )}
        </Stack>
      </div>
    </div>
  );
}
