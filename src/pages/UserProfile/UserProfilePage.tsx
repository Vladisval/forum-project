import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { updateUser, userById } from "../../entities/user/model/userSlice.ts";
import { useCallback, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { UserModel } from "../../entities/user/model/UserModel.ts";
import { RootState } from "../../app/store/store.ts";
import { EnhancedPost } from "../../entities/post/model/PostModel.ts";
import PostCard from "../../entities/post/ui/PostCard.tsx";
import { deletePost } from "../../entities/post/model/postSlice.ts";
import { selectEnhancedPosts } from "../../entities/post/model/postsSelector.ts";
import { ThunkDispatch } from "@reduxjs/toolkit";


const UserProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<ThunkDispatch<never, never, never>>();
  const user = useSelector((state: RootState) => userById(state,1));
  const posts = useSelector(selectEnhancedPosts)
  const favoritePosts = posts.filter(post=> post.isFavorite)
  const [editableUser, setEditableUser] = useState<UserModel | null>(user!);
  const [editingField, setEditingField] = useState<keyof UserModel | null>(null);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof UserModel
  ) => {
    setEditableUser({
      ...editableUser!,
      [field]: event.target.value,
    });
  };

  const saveField = () => {
    if (editableUser) {
      dispatch(updateUser(editableUser));
      setEditingField(null);
    }
  };

  const handleDeletePost = useCallback(
    (postId: string) => {
      thunkDispatch(deletePost(postId));
    },
    [dispatch]
  );

  const userFields: Array<{ label: string; field: keyof UserModel }> = [
    {label: "Full Name", field: "name"},
    {label: "Username", field: "username"},
    {label: "Email", field: "email"},
    {label: "Phone", field: "phone"},
    {label: "Website", field: "website"},
  ];

  if (!editableUser) {
    return <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        Пользователь не найден
      </Alert>
    </Container>
  }

  return (
    <Paper
      sx={{
        margin: "auto",
        padding: 3,
        boxShadow: 3,
      }}
    >

      <Box display="flex"
           flexDirection="column"
           alignItems="center"
           gap="10px"
           paddingBottom="10px">
        <Typography variant="h4" component="h1">
          Профиль пользователя
        </Typography>
        <Avatar
          src={editableUser.avatarUrl}
          alt={editableUser.name}
          sx={{
            width: 100,
            height: 100,
            boxShadow: 2,
          }}
        />
      </Box>

      <Grid container direction="column" spacing={2}>
        {userFields.map(({label, field}) => (
          <Grid item key={field}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              {editingField === field ? (
                <>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={label}
                    value={editableUser[field]}
                    onChange={(e) => handleFieldChange(e, field)}
                  />
                  <IconButton
                    color="primary"
                    onClick={saveField}
                    aria-label="Сохранить"
                  >
                    <SaveIcon/>
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="body1" sx={{flexGrow: 1}}>
                    <strong>{label}:</strong>
                    {typeof editableUser[field] === "string" || typeof editableUser[field] === "number"
                      ? editableUser[field]
                      : ""}
                  </Typography>
                  <IconButton
                    color="default"
                    onClick={() => setEditingField(field)}
                    aria-label="Редактировать"
                  >
                    <EditIcon/>
                  </IconButton>
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ marginY: 3 }} />

      <Box>
        <Typography variant="h5" gutterBottom>Избранное</Typography>
        <Box display="flex" justifyContent="center" flexDirection="column">
          {favoritePosts.length ?
            favoritePosts.map((post: EnhancedPost) => (
              <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
            )) :
            <Typography variant="h6">Пока ничего нет</Typography>
          }
        </Box>
      </Box>
    </Paper>
  );
};

export default UserProfilePage