import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';

export interface PostFormData {
  title: string;
  body: string;
}

interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
}

const PostForm = ({ onSubmit }: PostFormProps) => {
  const { control, handleSubmit, reset } = useForm<PostFormData>({
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const handleFormSubmit = useCallback(
    (data: PostFormData) => {
      onSubmit(data);
      reset();
    },
    [onSubmit, reset]
  );

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} display="flex" flexDirection="column" gap={2} mt={2}>
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
      <Button type="submit" variant="contained" color="primary">
        Добавить пост
      </Button>
    </Box>
  );
};

export default PostForm;
