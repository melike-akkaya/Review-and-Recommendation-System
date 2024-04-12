import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";

export default function AddProductDialog({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };

    const initialProductState = {
        name: "",
        style: "",
        imagePaths: "",  
        category: "",
        price: "",
        merchantId: 1,  
    };

    const [product, setProduct] = useState(initialProductState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/product/add', product);
            console.log('Product added successfully:', response.data);
            handleClose();
        } catch (error) {
            console.error('Error adding product:', error);
          
        }
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add Product</DialogTitle>
                <Grid container spacing={2} alignItems="center">
                    {["name", "price", "category", "style", "imagePaths"].map((field) => (
                        <Grid item xs={12} key={field}>
                            <TextField
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                name={field}
                                fullWidth
                                value={product[field]}
                                onChange={handleChange}
                            />
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
