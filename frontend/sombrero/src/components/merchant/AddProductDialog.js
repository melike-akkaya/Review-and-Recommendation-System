import React, { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { getCategories } from "../../services/CategoryService";
import {
  addLabel,
  addProduct,
  getLastProductId,
} from "../../services/ProductService";
import { fileToBlob } from "../../commonMethods";
import { Alert } from "../alert/Alert";

export default function AddProductDialog({ open, setOpen, refreshProducts }) {
  const [categories, setCategories] = React.useState([]);
  const labels = ["elegant", "luxury", "ergonomic", "antique", "modern"];
  const [fileName, setFileName] = React.useState("");

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [pendingAlertOpen, setPendingAlertOpen] = useState(false);

  React.useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const resetProductState = () => {
    setProduct(initialProductState);
    setFileName("");
  };

  const initialProductState = {
    name: "",
    label: [],
    category: "",
    price: "",
    image: null,
  };

  const [product, setProduct] = useState(initialProductState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    const updatedOptions = checked
      ? [...product[name], value]
      : product[name].filter((option) => option !== value);
    setProduct({ ...product, [name]: updatedOptions });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    const blob = await fileToBlob(file);

    setProduct((prevProduct) => ({
      ...prevProduct,
      image: blob,
    }));
  };

  const handleSubmit = async () => {
    try {
      setPendingAlertOpen(true);

      if (
        product.name.trim() === "" ||
        product.price.trim() === "" ||
        product.category.trim() === ""
      ) {
        setErrorAlertOpen(true);
        setPendingAlertOpen(false);
        return;
      }

      // Adding product
      const { label, ...productWithoutLabel } = product;

      const categoryId = categories.find(
        (cat) => cat.name === product.category
      )?.id;

      productWithoutLabel.image = null;
      productWithoutLabel.category = categoryId;
      productWithoutLabel.merchant = 1;

      const formData = new FormData();
      formData.append("image", product.image);
      formData.append("product", JSON.stringify(productWithoutLabel));

      await addProduct(formData);

      // Getting product id
      const response = await getLastProductId();
      const productId = response.data;

      // Adding label
      const labelObject = {};
      labelObject.productId = productId;
      label.forEach((labelId) => {
        labelObject[labelId] = 1;
      });

      labels.forEach((labelId) => {
        if (!label.includes(labelId)) {
          labelObject[labelId] = 0;
        }
      });

      await addLabel(labelObject);

      setSuccessAlertOpen(true);
      handleClose();
      refreshProducts();
      resetProductState();
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorAlertOpen(true);
    } finally {
      setPendingAlertOpen(false);
    }
  };

  const handlePriceChange = (event) => {
    const { value } = event.target;
    // Check if the value is a valid float or integer
    if (/^\d*\.?\d*$/.test(value)) {
      setProduct({ ...product, price: value });
    }
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ style: { padding: "1cm" } }}
      >
        <DialogTitle>Add Product</DialogTitle>
        <Grid container spacing={2}>
          {[
            { name: "Name", type: "text" },
            { name: "Price", type: "text" },
            {
              name: "Category",
              type: "combo",
              options: categories.map((category) => category.name),
            },
            {
              name: "Label",
              type: "checkbox",
              options: labels,
            },
            { name: "Image", type: "file" },
          ].map((field) => (
            <Grid item xs={12} key={field.name}>
              {field.type === "combo" ? (
                <Autocomplete
                  options={field.options}
                  renderInput={(params) => (
                    <TextField {...params} label={field.name} fullWidth />
                  )}
                  onChange={(event, value) =>
                    handleChange({
                      target: { name: field.name.toLowerCase(), value: value },
                    })
                  }
                />
              ) : field.type === "checkbox" ? (
                <div>
                  {field.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={product.label.includes(option)}
                          onChange={handleCheckboxChange}
                          name="label"
                          value={option}
                        />
                      }
                      label={option}
                    />
                  ))}
                </div>
              ) : field.type === "file" ? (
                <div>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-file"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-file">
                    <Button variant="contained" component="span">
                      {product.image ? fileName : "Choose Image"}
                    </Button>
                  </label>
                </div>
              ) : (
                <TextField
                  label={field.name}
                  name={field.name.toLowerCase()}
                  fullWidth
                  type={field.type}
                  value={product[field.name.toLowerCase()]}
                  onChange={
                    field.name === "Price" ? handlePriceChange : handleChange
                  } // Apply price change handler
                />
              )}
            </Grid>
          ))}
          <Grid item xs={12} align="right">
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Grid>
        </Grid>
        <Alert
          open={successAlertOpen}
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          message="Product added successfully"
        />
        <Alert
          open={errorAlertOpen}
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          message="Error adding product"
        />
        <Alert
          open={pendingAlertOpen}
          severity="info"
          message="Adding product..."
        />
      </Dialog>
    </div>
  );
}
