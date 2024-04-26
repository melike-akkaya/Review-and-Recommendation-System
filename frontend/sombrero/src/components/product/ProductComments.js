import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Rating from "@mui/material/Rating";
import DeleteIcon from "@mui/icons-material/Delete";

export function ProductComments(props) {
  const { username, text, rating, onDelete } = props;

  return (
    <Card sx={{ maxWidth: 700, marginTop: "40px", marginBottom: "40px" }}>
      <CardHeader
         avatar={
           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
           </Avatar>
         }
         action={
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>}
        title={username}
        subheader={<Rating name="read-only" value={rating} readOnly />}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
