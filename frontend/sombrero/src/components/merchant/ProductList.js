import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { deleteLabel, deleteProduct } from "../../services/ProductService";
import { useState } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ConfirmationDialog from "./ConformationDialog";

const ProductList = ({ products, refreshProducts }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleOpenConfirmation = (id) => {
    setCurrentProductId(id);
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
    setCurrentProductId(null);
  };

  const handleDelete = async () => {
    if (currentProductId) {
      await deleteProduct(currentProductId);
      await deleteLabel(currentProductId);
      setCurrentProductId(null);
      setOpenConfirmation(false);
      refreshProducts();
    }
  };

  const handleEdit = async (productId) => {
    //setIsEditableTrue();
    window.location.href = "/product/" + productId;
  };

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
            <div style={{ display: "flex", alignItems: "center" }}>
              {product.image ? (
                <img
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={product.name}
                  className="rounded-md object-cover"
                  style={{
                    height: "80px",
                    width: "80px",
                    marginRight: "20px",
                  }}
                />
              ) : (
                <ShoppingBasketIcon />
              )}

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
              onClick={() => handleOpenConfirmation(product.productId)}
            >
              Delete
            </Button>
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

      {openConfirmation && (
        <ConfirmationDialog
          open={openConfirmation}
          onClose={handleCloseConfirmation}
          onConfirm={handleDelete}
          title="Confirm Deletion"
        >
          Are you sure you want to delete this product?
        </ConfirmationDialog>
      )}
    </div>
  );
};

export default ProductList;
