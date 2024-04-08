import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { getCategories } from "../../services/CategoryService";

const CategorySelector = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="Basic button group">
        {categories.map((category, index) => (
          <Button
            key={category.id}
            sx={{
              fontSize: "1.2rem",
              color: "#007bff",
              minWidth: "120px",
              width: `${category.name.length * 10 + 40}px`,
              "&:hover": { color: "#ff4500" },
            }}
          >
            {category.name}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default CategorySelector;
