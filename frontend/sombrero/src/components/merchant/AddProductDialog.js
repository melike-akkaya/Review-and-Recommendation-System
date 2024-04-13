import React, { useState } from "react";
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

export default function AddProductDialog({ open, setOpen, refreshProducts}) {
  const [categories, setCategories] = React.useState([]);
  const labels = ["elegant", "luxury", "ergonomic", "antique", "modern"];

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

  const handleImageChange = (event) => {
    setProduct({ ...product, image: event.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      //adding product:
      const { label, ...productWithoutLabel } = product;

      const categoryId = categories.find(
        (cat) => cat.name === product.category
      )?.id;

      productWithoutLabel.category = categoryId;
      productWithoutLabel.merchant = 1;

      await addProduct(productWithoutLabel);

      //getting product id:
      const response = await getLastProductId();
      const productId = response.data;

      //adding label:
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

      handleClose();
      refreshProducts();
    } catch (error) {
      console.error("Error adding product:", error);
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
            { name: "Price", type: "number" },
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
                      {product.image ? product.image.name : "Choose Image"}
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
                  onChange={handleChange}
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
      </Dialog>
    </div>
  );
}
