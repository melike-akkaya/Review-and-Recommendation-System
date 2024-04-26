import * as React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { addReview } from "../../services/ReviewService";

export default function MakeComment({ productId }) {
  const [text, setText] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [isSent, setIsSent] = React.useState(false);


  const handleComment = async () => {
    setIsSent(true);

    const commentObject = {
      productId: productId.id,
      authorId: 1, 
      authorName: "Taylor Swift",
      rating: rating,
      comment: text,
      createdAt: new Date().toISOString(),
    };

    try {
      await addReview(commentObject);
      setText("");
      setRating(0);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardContent>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={handleRatingChange}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "55ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Write here..."
            variant="outlined"
            value={text}
            onChange={handleTextChange}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleComment}>
          Comment
        </Button>
      </CardActions>
    </Card>
  );
}