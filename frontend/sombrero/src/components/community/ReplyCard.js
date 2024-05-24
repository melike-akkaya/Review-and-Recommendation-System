import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { deleteReply, getReplies } from "../../services/CommunityService";
import { useLocalStorageUser } from "../../commonMethods";

const ReplyCard = ({
  replies,
  comment,
  handleCommentChange,
  handleCommentSubmit,
}) => {
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [updatedReply, setUpdatedReply] = useState("");
  const user = useLocalStorageUser();

  const handleEdit = (replyId, replyContent) => {
    setEditingReplyId(replyId);
    setUpdatedReply(replyContent);
  };

  const handleSave = (replyId) => {
    setEditingReplyId(null);
  };

  const handleCancel = () => {
    setEditingReplyId(null);
    setUpdatedReply("");
  };

  const handleDelete = (repl) => {
    deleteReply(repl);
  };

  return (
    <div>
      <Box mt={2}>
        {replies.map((reply) => (
          <Box
            key={reply.id}
            sx={{
              mt: 1,
              pl: 2,
              borderLeft: "2px solid #ccc",
              position: "relative",
            }}
          >
            {editingReplyId === reply.id ? (
              <>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={updatedReply}
                  onChange={(e) => setUpdatedReply(e.target.value)}
                  sx={{
                    borderRadius: "20px",
                    "& fieldset": {
                      borderRadius: "20px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave(reply.id)}
                  sx={{ marginLeft: "10px" }}
                >
                  <SaveIcon />
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                  sx={{ marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary">
                  <strong>{reply.authorName}: </strong> {reply.comment}
                </Typography>
                {user.id === reply.authorId && (
                  <>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(reply.commentId, reply.content)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "36px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(reply.commentId)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "12px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </>
            )}
          </Box>
        ))}
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Add a comment"
        value={comment}
        onChange={handleCommentChange}
        sx={{
          mt: 2,
          borderRadius: "20px",
          "& fieldset": {
            borderRadius: "20px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCommentSubmit}
                sx={{
                  borderRadius: "20px",
                  marginRight: "-1px",
                  backgroundColor: "#feb31d",
                  "&:hover": { backgroundColor: "#ffca28" },
                }}
              >
                Submit
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default ReplyCard;
