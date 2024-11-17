import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store.ts";
import { Box, Button, CircularProgress, TextField, Divider, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { postById } from "../../entities/post/model/postSlice.ts";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createComment, fetchComments } from "../../entities/comment/model/commentSlice.ts";
import { CommentFormInput } from "../../entities/comment/model/CommentModel.ts";
import { ThunkDispatch } from "@reduxjs/toolkit";


const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch<ThunkDispatch<never, never, never>>();

  const post = useSelector((state: RootState) => postById(state, postId!));
  const comments = useSelector((state: RootState) => state.comments.comments);
  const loading = useSelector((state: RootState) => state.comments.loading);

  const { register, handleSubmit, reset } = useForm<CommentFormInput>();

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]);

  const onSubmit = (data: CommentFormInput) => {
    if (postId) {
      dispatch(createComment({ ...data, postId: postId, userId: "1" }));
      reset();
    }
  };

  if (!post) {
    return <Typography variant="h6">Пост не найден</Typography>;
  }

  return (
    <Box p={4}>
      {/* Пост */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1">{post.body}</Typography>
      </Paper>

      {/* Комментарии */}
      <Typography variant="h5" gutterBottom>
        Комментарии
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        comments.map((comment) => (
          <Paper key={comment.id} elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="body1">{comment.body}</Typography>
            <Typography variant="caption" color="textSecondary">
              Создано: {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </Paper>
        ))
      )}

      {/* Форма добавления комментария */}
      <Divider sx={{ marginY: 3 }} />
      <Typography variant="h6">Оставить комментарий</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Комментарий"
          variant="outlined"
          multiline
          rows={4}
          {...register('body', { required: 'Комментарий обязателен' })}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Добавить комментарий
        </Button>
      </Box>
    </Box>
  );
};
export default PostDetailPage;