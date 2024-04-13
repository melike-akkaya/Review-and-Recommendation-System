import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { deleteLabel, deleteProduct } from "../../services/ProductService";

const ProductList = ({ products }) => {
  const handleDelete = async (id) => {
    await deleteProduct(id);
    await deleteLabel(id);
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
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography color="text.secondary">
              Price: ${product.price}
            </Typography>
          </CardContent>
          <CardActions style={{ position: "relative" }}>
            <Button
              size="small"
              color="primary"
              onClick={() => handleDelete(product.productId)}
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
    </div>
  );
};

export default ProductList;
