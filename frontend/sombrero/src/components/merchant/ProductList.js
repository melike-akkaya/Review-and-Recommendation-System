import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { deleteLabel, deleteProduct } from "../../services/ProductService";
import ConfirmationDialog from "../merchant/ConformationDialog";
import { useState } from "react";

//Declare a default image
const defaultImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAfElEQVR42u3QMREAAAgEIE1u9LeD5wgR6EqmOGuBAgUKFIhAgQIFIlCgQIEIFChQIAIFChSIQIECBSJQoECBCBQoUCACBQoUiECBAgUiUKBAgQIFChQoUCACBQoUiECBAgUiUKBAgQgUKFAgAgUKFIhAgQIFIlCgQIEI/LNvE8dhTC3llgAAAABJRU5ErkJggg==";


const ProductList = ({ products }) => {
  const [openConformation, setOpenConformation] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleOpenConformation = (id) => {
    setCurrentProductId(id);
    setOpenConformation(true);
  };

  const handleCloseConformation= () => {
    setOpenConformation(false);
  };

  const handleDelete = async (id) => {
    if (currentProductId) {
      await deleteProduct(currentProductId);
      await deleteLabel(currentProductId);
    }
    handleCloseConformation();
  };

  const handleEdit = (id) => {};

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={product.image ? `data:image/jpeg;base64,${product.image}` : `data:image/png;base64,${defaultImageBase64}`}
            alt={product.name}
            className="rounded-md object-cover"
            style={{
              height: "80px",
              width: "80px",
              marginRight: "20px" 
            }}
          />
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
          </div>
            <Typography color="text.secondary">
              Price: ${product.price}
            </Typography>
          </CardContent>
          <CardActions style={{ position: "relative" }}>
            <Button
              size="small"
              color="primary"
              onClick={() => handleOpenConformation(product.productId)}
            >
              Delete
            </Button>
            <ConfirmationDialog
              open={openConformation}
              onClose={handleCloseConformation}
              onConfirm={handleDelete}
              title="Confirm Deletion"
            >
              Are you sure you want to delete this product?
            </ConfirmationDialog>

            <Button
              style={{ position: "absolute", top: 0, right: 0 }}
              size="small"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(product.productId)}
            ></Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
