import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { updateUser, userById } from "../../entities/user/model/userSlice.ts";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { UserModel } from "../../entities/user/model/UserModel.ts";


const UserProfilePage: React.FC = () => {
  const user = useSelector(userById);
  const dispatch = useDispatch();

  const [editableUser, setEditableUser] = useState<UserModel | null>(user!);
  const [editingField, setEditingField] = useState<keyof UserModel | null>(null);

  if (!editableUser) {
    return <Typography variant="h6">Пользователь не найден</Typography>;
  }

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof UserModel
  ) => {
    setEditableUser({
      ...editableUser,
      [field]: event.target.value,
    });
  };

  const saveField = () => {
    if (editableUser) {
      dispatch(updateUser(editableUser));
      setEditingField(null);
    }
  };

  // Список примитивных полей для отображения
  const userFields: Array<{ label: string; field: keyof UserModel }> = [
    { label: "Full Name", field: "name" },
    { label: "Username", field: "username" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Website", field: "website" },
  ];

  return (
    <Paper
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
      }}
    >
      <Avatar
        src={editableUser.avatarUrl}
        alt={editableUser.name}
        sx={{
          width: 100,
          height: 100,
          boxShadow: 2,
        }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Профиль пользователя
      </Typography>
      <Grid container direction="column" spacing={2}>
        {userFields.map(({ label, field }) => (
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
                    <SaveIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
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
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default UserProfilePage