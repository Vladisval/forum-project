import { EnhancedPost } from "../model/PostModel.ts";
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import { formatDate } from "../../../utils/formatDate.ts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dislikePost, likePost, toggleIsFavorite } from "../model/postSlice.ts";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { userById } from "../../user/model/userSlice.ts";
import { RootState } from "../../../app/store/store.ts";

interface PostCardProps {
  post: EnhancedPost,
  onDelete: (postId: string) => void
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => userById(state, 1))

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
    <Card sx={{ mb: 2 }}>
      <CardHeader
        component={Link}
        to={`/post/${post.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
        avatar={<Avatar src={post.author.avatarUrl} alt={post.author.name} />}
        title={post.title}
        subheader={`by ${post.author?.name} - ${formatDate(post.createdAt)}`}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary">
          {post.body}
        </Typography>
        <Box display="flex" justifyContent="space-between" paddingTop='20px'>
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
            color={post.dislikedByUser ? 'primary' : 'default'}
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
          {post.userId === user!.id ?
            <Button variant="outlined" color="error" onClick={() => onDelete(post.id)}>
              Удалить
            </Button> :
            <></>
          }

        </Box>

      </CardContent>
    </Card>
  );
};

export default PostCard;