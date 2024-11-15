import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store.ts";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { selectors } from "../../entities/post/model/postSlice.ts";
import { formatDate } from "../../utils/formatDate.ts";


const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const post = useSelector((state: RootState) => selectors.postById(state, postId!));


  if (!post) {
    return <Typography variant="h6">Пост не найден</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ maxWidth: 800, margin: '0 auto' }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {post.body}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {/*Автор: {user ? user.name : 'Неизвестный автор'}*/}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Дата публикации: {formatDate(post.createdAt)}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {post.body}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostDetailPage;