import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Box,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Collapse,
  TextField,
  Button,
} from "@mui/material";
import {
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { getUserById } from "../../services/UserService";
import { addReply } from "../../services/CommunityService";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReplyCard from "./ReplyCard";
import { deletePost, updatePost } from "../../services/CommunityService";
import { useLocalStorageUser } from "../../commonMethods";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post, replies, refresh }) => {
  const { authorId, type, date, title, content, image, postId } = post;
  const [userName, setUserName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const user = useLocalStorageUser();
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (user == null) {
      navigate("/login");
    } else {
      const newComment = {
        authorId: user.id,
        postId: postId,
        comment: comment,
      };
      const formData = new FormData();
      formData.append("comment", JSON.stringify(newComment));
      addReply(formData);
    }
  };

  const handleDelete = async () => {
    await deletePost(postId);
    handleSettingClose();
    refresh();
  };

  const truncateContent = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  const handleSettingClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    setIsEditing(true);
    handleSettingClose();
  };

  const handleSave = async () => {
    setNewTitle(newTitle);
    setNewContent(newContent);
    setIsEditing(false);
    const updatedPost = new FormData();
    updatedPost.append(
      "post",
      JSON.stringify({ title: newTitle, content: newContent })
    );
    await updatePost(postId, updatedPost);
    refresh();
  };

  const handleCancel = () => {
    setNewTitle(title);
    setNewContent(content);
    setIsEditing(false);
  };

  useEffect(() => {
    try {
      getUserById(post.authorId).then((temp) => {
        setUserName(temp.name);
      });
    } catch (error) {
      console.error(error);
    }
  }, [userName, authorId]);

  return (
    <Card sx={{ mb: 2, borderRadius: "20px", border: "1px solid #ff7e5f" }}>
      <CardHeader
        style={{ marginTop: "10px", marginLeft: "10px" }}
        avatar={
          <Link
            to={`/user/${userName}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Avatar />
          </Link>
        }
        title={
          <Link
            to={`/user/${userName}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {userName}
          </Link>
        }
        subheader={new Date(date).toLocaleDateString()}
      />
      <CardContent>
        <div>
          {!isEditing ? (
            <Link
              to={`/post/${postId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h5"
                component="div"
                style={{ marginLeft: "10px", marginBottom: "10px" }}
              >
                {title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "20px",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {truncateContent(content, 300)}
                  </Typography>
                </Box>
                {image && (
                  <Box sx={{ marginLeft: "10px" }}>
                    <img
                      src={image}
                      alt="Post thumbnail"
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                  </Box>
                )}
              </Box>
            </Link>
          ) : (
            <div>
              <TextField
                label="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="bookmark">
          <BookmarkIcon />
        </IconButton>
        <div>
          <IconButton aria-label="settings" onClick={handleSettingClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleSettingClose}
          >
            <MenuItem onClick={handleUpdate}>Update</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider />
          <ReplyCard
            replies={replies}
            comment={comment}
            handleCommentChange={handleCommentChange}
            handleCommentSubmit={handleCommentSubmit}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
