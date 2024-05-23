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
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  getReviewVoteTotal,
  updateReviewVote,
} from "../../services/ReviewService";
import { useLocalStorageUser } from "../../commonMethods";

export function ProductComments(props) {
  const { username, authorId, text, rating, onDelete, onUpdate, reviewId } =
    props;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(text);
  const [updatedRating, setUpdatedRating] = useState(rating);
  const [originalComment, setOriginalComment] = useState(text);
  const [originalRating, setOriginalRating] = useState(rating);
  const [isEditable, setIsEditable] = useState(false);
  const user = useLocalStorageUser();

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

  const [votes, setVotes] = React.useState(0);
  const [voteClicked, setVoteClicked] = React.useState(null);
  const [firstRun, setFirstRun] = React.useState(true);

  const handleUpvote = async () => {
    if (voteClicked === "up") {
      setVotes(votes - 1);
      setVoteClicked(null);
    } else if (voteClicked === "down") {
      setVotes(votes + 2);
      setVoteClicked("up");
    } else {
      setVotes(votes + 1);
      setVoteClicked("up");
    }
  };

  const handleDownvote = async () => {
    if (voteClicked === "down") {
      setVotes(votes + 1);
      setVoteClicked(null);
    } else if (voteClicked === "up") {
      setVotes(votes - 2);
      setVoteClicked("down");
    } else {
      setVotes(votes - 1);
      setVoteClicked("down");
    }
  };

  const updateVotes = async () => {
    console.log(votes);
    const formData = new FormData();
    formData.append("votes", votes);
    updateReviewVote(reviewId, formData);
  };

  React.useEffect(() => {
    const fetchInitialVote = async () => {
      const vote = await getReviewVoteTotal(reviewId);
      setVotes(vote);
      setFirstRun(false);
    };

    if (firstRun) {
      fetchInitialVote();
    }
  }, [firstRun]);

  React.useEffect(() => {
    if (user == null) {
      setIsEditable(false);
    } else {
      if (user.id == authorId) {
        setIsEditable(true);
      } else {
        setIsEditable(false);
      }
    }
  }, [user?.id, authorId]);

  React.useEffect(() => {
    if (!firstRun) {
      updateVotes();
    }
  }, [votes]);

  return (
    <Card sx={{ maxWidth: 700, marginTop: "40px", marginBottom: "40px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username.charAt(0)}
          </Avatar>
        }
        action={
          isEditable ? (
            <>
              <IconButton aria-label="edit" onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          ) : null
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
          <div>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <IconButton onClick={handleUpvote} aria-label="upvote">
                <ArrowDropUpIcon
                  color={voteClicked === "up" ? "primary" : "default"}
                />
              </IconButton>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ margin: "0 10px" }}
              >
                {votes}
              </Typography>
              <IconButton onClick={handleDownvote} aria-label="downvote">
                <ArrowDropDownIcon
                  color={voteClicked === "down" ? "primary" : "default"}
                />
              </IconButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
