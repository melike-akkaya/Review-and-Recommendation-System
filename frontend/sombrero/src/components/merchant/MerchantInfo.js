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
import { editMerchantInfo } from "../../services/MerchantService";
import { Alert } from "../alert/Alert";
import { fileToBlob, useLocalStorageUser } from "../../commonMethods";

export function MerchantInfo(initialMerchant) {
  const user = useLocalStorageUser();
  const [merchant, setMerchant] = useState(initialMerchant.merchant);
  const [editMode, setEditMode] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [editable, setEditable] = useState(
    initialMerchant.merchant.id === user.id
  );

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleUploadImage = async () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event) => {
      try {
        const file = event.target.files[0];

        const blob = await fileToBlob(file);

        setMerchant((prevMerchant) => ({
          ...prevMerchant,
          image: blob,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    input.click();
  };

  const handleSave = async () => {
    if (!merchant.name || !merchant.country) {
      setOpenError(true);
      return;
    }

    setEditMode(false);

    const formData = new FormData();
    formData.append("name", merchant.name);
    formData.append("image", merchant.image);

    try {
      await editMerchantInfo(merchant.id, formData);
      setOpenSuccess(true);
    } catch (error) {
      setOpenError(true);
    }
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
            {merchant.image ? (
              <img
                src={`data:image/jpeg;base64,${merchant.image}`}
                className="rounded-md w-full object-cover"
                style={{
                  height: "80px",
                  width: "80px",
                  cursor: editable && editMode ? "pointer" : "default",
                }}
              />
            ) : (
              <StoreIcon
                sx={{
                  height: "80px",
                  width: "80px",
                  cursor: editable && editMode ? "pointer" : "default",
                }}
              />
            )}
            {editable && editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
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
            {editable && editMode && (
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
              {editable && editMode ? (
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
        {!editMode && editable ? (
          <Button
            fullWidth
            variant="text"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          editable && (
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
          )
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
