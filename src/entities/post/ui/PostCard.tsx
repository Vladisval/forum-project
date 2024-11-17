import { EnhancedPost } from "../model/PostModel.ts";
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import { formatDate } from "../../../utils/formatDate.ts";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dislikePost, likePost, toggleIsFavorite } from "../model/postSlice.ts";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface PostCardProps {
  post: EnhancedPost,
  onDelete: (postId: string) => void
}

const PostCard = ({ post, onDelete }: PostCardProps) => {

  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likePost(post.id));
  };

  const handleDislike = () => {
    dispatch(dislikePost(post.id));
  };

  const handleFavorite = () => {
    dispatch(toggleIsFavorite(post.id));
  };

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
        <Box display="flex" alignItems="center">
          <IconButton
            color={post.likedByUser ? 'primary' : 'default'}
            onClick={handleLike}
          >
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2" sx={{ marginRight: 2 }}>
            {post.likes}
          </Typography>
          <IconButton
            color={post.dislikedByUser ? 'secondary' : 'default'}
            onClick={handleDislike}
          >
            <ThumbDownIcon />
          </IconButton>
          <Typography variant="body2">{post.dislikes}</Typography>
          <Tooltip title={post.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}>
            <IconButton onClick={handleFavorite} color={post.isFavorite ? 'warning' : 'default'}>
              {post.isFavorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Button variant="outlined" color="error" onClick={() => onDelete(post.id)}>
          Удалить
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;