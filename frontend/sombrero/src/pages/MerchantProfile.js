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
import AnalyticsDialog from "../components/merchant/AnalyticsDialog";
import ProductList from "../components/merchant/ProductList";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useLocalStorageUser } from "../commonMethods";

export default function MerchantProfile() {
  const { merchantId } = useParams();
  const user = useLocalStorageUser();

  const [initialMerchant, setInitialMerchant] = useState(null);
  const [initialAuthorizedPerson, setInitialAuthorizedPerson] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [isAnalyticsDialogOpen, setAnalyticsDialogOpen] = useState(false);

  const fetchProducts = (merchantId) => {
    getProductsByMerchantId(merchantId)
      .then(setProducts)
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    getMerchantInfo(merchantId)
      .then((response) => {
        setInitialMerchant({
          name: response.data.merchantName,
          id: response.data.id,
          country: response.data.country,
          image: response.data.image,
        });
        setInitialAuthorizedPerson({
          id: response.data.id,
          name: response.data.name,
          surname: response.data.surname,
          email: response.data.email,
          country: response.data.country,
        });
        fetchProducts(merchantId);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const isEditable = initialMerchant && initialMerchant.id === user.id;

  return (
    <div>
      <Header />
      <div style={{ padding: "0 200px" }}>
        {isEditable && (
          <>
            <AddProductDialog
              open={isAddProductDialogOpen}
              setOpen={setAddProductDialogOpen}
              refreshProducts={() => fetchProducts(merchantId)}
            />
            <AnalyticsDialog
              open={isAnalyticsDialogOpen}
              setOpen={setAnalyticsDialogOpen}
              products={products}
            />
          </>
        )}
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Stack direction="column" spacing={2}>
                {isEditable && (
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    spacing={2}
                  >
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setAnalyticsDialogOpen(true);
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
                )}
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
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            PRODUCTS
          </Typography>

          {products.length > 0 && (
            <ProductList
              products={products}
              refreshProducts={() => fetchProducts(merchantId)}
            />
          )}
        </Stack>
      </div>
    </div>
  );
}
