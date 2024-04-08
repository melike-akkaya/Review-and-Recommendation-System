import React, { useEffect, useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import DifferenceIcon from "@mui/icons-material/Difference";
import { editMerchantInfo } from "../../services/MerchantService";
import { Alert } from "../alert/Alert";

export function MerchantInfo(initialMerchant) {
  const [merchant, setMerchant] = useState(initialMerchant.merchant);
  const [editMode, setEditMode] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleUploadImage = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      const file = event.target.files[0];
      console.log("Selected file:", file);
    };

    input.click(); // click on the input element programmatically to trigger the file selection dialog
  };

  const handleSave = () => {
    if (!merchant.name || !merchant.country) {
      setOpenError(true);
      return;
    }

    const capitalizedCountry =
      merchant.country.charAt(0).toUpperCase() + merchant.country.slice(1);

    setMerchant({ ...merchant, country: capitalizedCountry });

    setEditMode(false);
    editMerchantInfo(merchant.id, { ...merchant, avatar: uploadedImage })
      .then(() => {
        setOpenSuccess(true);
      })
      .catch(() => {
        setOpenError(true);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <StoreIcon
              src={
                uploadedImage
                  ? URL.createObjectURL(uploadedImage)
                  : merchant.avatar
              }
              sx={{
                height: "80px",
                width: "80px",
                cursor: editMode ? "pointer" : "default",
              }}
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                }}
              />
            )}
            {editMode && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "#fff",
                  zIndex: 2,
                }}
                onClick={handleUploadImage}
                size="small"
              >
                <UploadIcon />
              </IconButton>
            )}
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">
              {editMode ? (
                <input
                  type="text"
                  value={merchant.name}
                  onChange={(e) =>
                    setMerchant({ ...merchant, name: e.target.value })
                  }
                />
              ) : (
                merchant.name
              )}
            </Typography>
            {/* <Typography color="text.secondary" variant="body2">
              {editMode ? (
                <input
                  type="text"
                  value={merchant.country}
                  onChange={(e) =>
                    setMerchant({ ...merchant, country: e.target.value })
                  }
                />
              ) : (
                `${merchant.country}`
              )}
            </Typography> */}
            <Typography color="text.secondary" variant="body2">
              {merchant.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {merchant.id}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        {!editMode ? (
          <Button
            fullWidth
            variant="text"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button
              fullWidth
              variant="text"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </>
        )}
      </CardActions>
      <Alert
        open={openSuccess}
        onClose={handleCloseSuccess}
        severity="success"
        message="Saved successfully!"
      />
      <Alert
        open={openError}
        onClose={handleCloseError}
        severity="error"
        message="Saving failed! Please make sure fields are not empty."
      />
    </Card>
  );
}

export default MerchantInfo;
