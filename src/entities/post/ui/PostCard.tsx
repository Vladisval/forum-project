import { PostModel } from "../model/PostModel.ts";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";

interface PostCardProps {
  post: PostModel;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Avatar src={post.author?.avatarUrl} alt={post.author?.name} />}
        title={post.title}
        subheader={`by ${post.author?.name} - ${post.createdAt?.toLocaleDateString()}`}
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