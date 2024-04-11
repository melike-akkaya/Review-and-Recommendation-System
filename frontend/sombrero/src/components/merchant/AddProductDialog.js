import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { addProduct } from "../../services/ProductService";

export default function AddProductDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    style: [],
    images: [],
    category: "",
    price: "",
    merchantID: 1, 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStyleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData({ ...formData, style: [...formData.style, value] });
    } else {
      setFormData({ ...formData, style: formData.style.filter(style => style !== value) });
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", formData.name);
    formData.append("price", formData.price);
    formData.append("category", formData.category);
    formData.append("merchant_id", formData.merchantID);
    try {
      await addProduct(formData);
      handleClose();
    } catch (error) {
      console.error('Error adding product:', error);
      // Optionally show error message to user
    }
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add Product</DialogTitle>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              fullWidth
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox
                    checked={formData.style.includes("style1")}
                    onChange={handleStyleChange}
                    value="style1"
                    name="style"
                    key="style1"
                  />}
                  label="Style 1"
                />
                <FormControlLabel
                  control={<Checkbox
                    checked={formData.style.includes("style2")}
                    onChange={handleStyleChange}
                    value="style2"
                    name="style"
                    key="style2"
                  />}
                  label="Style 2"
                />
                <FormControlLabel
                  control={<Checkbox
                    checked={formData.style.includes("style3")}
                    onChange={handleStyleChange}
                    value="style3"
                    name="style"
                    key="style3"
                  />}
                  label="Style 3"
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={formData.category}
                onChange={handleChange}
                name="category"
              >
                <MenuItem value="category1">Category 1</MenuItem>
                <MenuItem value="category2">Category 2</MenuItem>
                <MenuItem value="category3">Category 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="image-upload">Upload Images</InputLabel>
            <Input
              id="image-upload"
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </Grid>


          <Grid item xs={12} align="right">
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button>
          </Grid>
        </Grid>

      </Dialog>
    </div>
  );
}
