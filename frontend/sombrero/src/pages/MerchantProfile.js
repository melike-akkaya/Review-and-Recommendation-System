import React, { useEffect, useState } from "react";
<<<<<<< Updated upstream
=======
import { getMerchantInfo } from "../services/MerchantService";
import { getProductsByMerchantId } from "../services/ProductService";
>>>>>>> Stashed changes
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getMerchantInfo } from "../services/MerchantService";
import { AuthorizedPersonInformation } from "../components/merchant/AuthorizedPersonInformation";
import { MerchantInfo } from "../components/merchant/MerchantInfo";
import Header from "./Header";
import AddProductDialog from "../components/merchant/AddProductDialog";
<<<<<<< Updated upstream
=======
import ProductList from "../components/merchant/ProductList";
>>>>>>> Stashed changes

export default function MerchantProfile() {
  const [initialMerchant, setInitialMerchant] = useState(null);
  const [initialAuthorizedPerson, setInitialAuthorizedPerson] = useState(null);
<<<<<<< Updated upstream
  const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false);

  useEffect(() => {
    getMerchantInfo(1)
=======
  const [products, setProducts] = useState([]);
  const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false);

  useEffect(() => {
    const merchantId = 1;
    getMerchantInfo(merchantId)
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      })
      .catch((error) => {
        console.error("Error fetching merchant info:", error);
=======
        return getProductsByMerchantId(merchantId);
      })
      .then((productsResponse) => {
        setProducts(productsResponse);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
>>>>>>> Stashed changes
      });
  }, []);

  return (
    <Header>
      <AddProductDialog
        open={isAddProductDialogOpen}
        setOpen={setAddProductDialogOpen}
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
<<<<<<< Updated upstream
                    // click action for View Analytics button
=======
                    // Placeholder for analytics button click action
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
        {products.length > 0 && <ProductList products={products} />}
>>>>>>> Stashed changes
      </Stack>
    </Header>
  );
}
