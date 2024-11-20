import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { addPost } from "../model/postSlice.ts";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

export interface PostFormData {
  title: string;
  body: string;
}

interface CreatePostModalProps {
  setOpenModal: (open: boolean) => void;
  openModal: boolean;
}

const CreatePostModal = ({setOpenModal, openModal}: CreatePostModalProps) => {
  const dispatch = useDispatch<ThunkDispatch<never, never, never>>();

  const { control, handleSubmit, reset } = useForm<PostFormData>({
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const onSubmit = useCallback(
    (data: PostFormData) => {
      dispatch(
        addPost({
          title: data.title,
          body: data.body,
          userId: 1,
          createdAt: new Date().toISOString(),
        })
      );
      reset();
      setOpenModal(false);

    }, [dispatch,reset]);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog maxWidth="lg" open={openModal} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogContent sx={{display:"flex", flexDirection: "column", gap: "10px", width: '500px'}}>
          <Typography variant="h5" gutterBottom>
            Добавить новый пост
          </Typography>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Заголовок обязателен' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              size="small"
              label="Заголовок"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="body"
          control={control}
          rules={{ required: 'Содержимое обязательно' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              size="small"
              label="Содержимое"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              multiline
              rows={4}
              fullWidth
            />
          )}
        />
      </DialogContent>
      <DialogActions sx={{padding: "0 24px 20px 24px"}}>
        <Button onClick={handleClose} variant="contained">Cancel</Button>
        <Button type="submit" variant="contained" color="secondary">
          Добавить пост
        </Button>
      </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreatePostModal;