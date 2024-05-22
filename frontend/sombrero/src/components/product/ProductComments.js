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
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export function ProductComments(props) {
  const { username, text, rating, onDelete } = props;
  const [votes, setVotes] = React.useState(0);
  const [voteClicked, setVoteClicked] = React.useState(null); 

  const handleUpvote = () => {
    if (voteClicked === 'up') {
      setVotes(votes - 1);
      setVoteClicked(null);
    } else if (voteClicked === 'down') {
      setVotes(votes + 2);
      setVoteClicked('up');
    } else {
      setVotes(votes + 1);
      setVoteClicked('up');
    }
  };

  const handleDownvote = () => {
    if (voteClicked === 'down') {
      setVotes(votes + 1);
      setVoteClicked(null);
    } else if (voteClicked === 'up') {
      setVotes(votes - 2);
      setVoteClicked('down');
    } else {
      setVotes(votes - 1);
      setVoteClicked('down');
    }
  };

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
          </IconButton>
        }
        title={username}
        subheader={<Rating name="read-only" value={rating} readOnly />}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <IconButton onClick={handleUpvote} aria-label="upvote">
            <ArrowDropUpIcon color={voteClicked === 'up' ? 'primary' : 'default'} />
          </IconButton>
          <Typography variant="body2" color="text.primary" sx={{ margin: '0 10px' }}>
            {votes}
          </Typography>
          <IconButton onClick={handleDownvote} aria-label="downvote">
            <ArrowDropDownIcon color={voteClicked === 'down' ? 'primary' : 'default'} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}