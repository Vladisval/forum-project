import { EnhancedPost } from "../model/PostModel.ts";
import { Avatar, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { formatDate } from "../../../utils/formatDate.ts";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: EnhancedPost,
  onDelete: (postId: string) => void
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader
        component={Link}
        to={`/posts/${post.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
        avatar={<Avatar src={post.author.avatarUrl} alt={post.author.name} />}
        title={post.title}
        subheader={`by ${post.author?.name} - ${formatDate(post.createdAt)}`}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {post.body}
        </Typography>
        <Button variant="outlined" color="error" onClick={() => onDelete(post.id)}>
          Удалить
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;