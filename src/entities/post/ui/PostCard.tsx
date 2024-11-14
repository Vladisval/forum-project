import { EnhancedPost } from "../model/PostModel.ts";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";

interface PostCardProps {
  post: EnhancedPost;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Avatar src={post.author?.avatarUrl} alt={post.author?.name} />}
        title={post.title}
        subheader={`by ${post.author?.name} - ${post.createdAt}`}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;