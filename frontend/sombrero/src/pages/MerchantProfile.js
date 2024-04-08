import React, { useEffect, useState } from "react";
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

export default function MerchantProfile() {
  const [initialMerchant, setInitialMerchant] = useState(null);
  const [initialAuthorizedPerson, setInitialAuthorizedPerson] = useState(null);
  const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false);

  useEffect(() => {
    getMerchantInfo(1)
      .then((response) => {
        setInitialMerchant({
          name: response.data.name,
          id: response.data.id,
          country: response.data.country,
          imagePath: response.data.imagePath,
        });
        setInitialAuthorizedPerson({
          id: response.data.id,
          authorizedPersonName: response.data.authorizedPersonName,
          authorizedPersonSurname: response.data.authorizedPersonSurname,
          email: response.data.email,
          country: response.data.country,
        });
      })
      .catch((error) => {
        console.error("Error fetching merchant info:", error);
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
                    // click action for View Analytics button
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
      </Stack>
    </Header>
  );
}
