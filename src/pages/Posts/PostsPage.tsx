import { EnhancedPost } from "../../entities/post/model/PostModel.ts";
import { CircularProgress, Container, Typography } from "@mui/material";
import PostCard from "../../entities/post/ui/PostCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store.ts";
import { fetchPosts } from "../../entities/post/model/postSlice.ts";
import { fetchUsers } from "../../entities/user/model/userSlice.ts";
import { useEffect } from "react";
import { selectEnhancedPosts } from "../../entities/post/model/postsSelector.ts";


const PostsPage = () => {
  const dispatch = useDispatch();
  const enhancedPosts = useSelector(selectEnhancedPosts);
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const usersStatus = useSelector((state: RootState) => state.users.status);
  console.log(enhancedPosts)
  useEffect(() => {
    if (postsStatus === 'idle') {
      // @ts-ignore
      dispatch(fetchPosts());
    }
    if (usersStatus === 'idle') {
      // @ts-ignore
      dispatch(fetchUsers());
    }
  }, [dispatch, postsStatus, usersStatus]);

  if (postsStatus === 'loading' || usersStatus === 'loading') {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', pt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        User Posts
      </Typography>
      {enhancedPosts.map((post: EnhancedPost) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default PostsPage;