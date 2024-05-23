import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Rating from "@mui/material/Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function ProductComments(props) {
  const { username, text, rating, onDelete, onUpdate, reviewId } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(text);
  const [updatedRating, setUpdatedRating] = useState(rating);
  const [originalComment, setOriginalComment] = useState(text);
  const [originalRating, setOriginalRating] = useState(rating);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(reviewId, updatedComment, updatedRating);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setUpdatedComment(originalComment);
    setUpdatedRating(originalRating);
    setIsEditing(false);
  };

  return (
    <Card sx={{ maxWidth: 700, marginTop: "40px", marginBottom: "40px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username.charAt(0)}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="edit" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        }
        title={username}
        subheader={
          isEditing ? (
            <Rating
              name="editable-rating"
              value={updatedRating}
              onChange={(event, newValue) => {
                setUpdatedRating(newValue);
              }}
            />
          ) : (
            <Rating name="read-only" value={rating} readOnly />
          )
        }
      />
      <CardContent>
        {isEditing ? (
          <div>
            <TextField
              fullWidth
              multiline
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            />
            <Button onClick={handleSaveClick}>Save</Button>
            <Button onClick={handleCancelClick}>Cancel</Button>
          </div>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
