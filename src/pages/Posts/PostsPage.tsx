import { EnhancedPost } from "../../entities/post/model/PostModel.ts";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import PostCard from "../../entities/post/ui/PostCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store.ts";
import { addPost, deletePost, fetchPosts } from "../../entities/post/model/postSlice.ts";
import { fetchUsers } from "../../entities/user/model/userSlice.ts";
import { useCallback, useEffect, useState } from "react";
import { selectEnhancedPosts } from "../../entities/post/model/postsSelector.ts";
import PaginationComponent from "../../shared/ui/PaginationComponent/PaginationComponent.tsx";
import UserFilter from "../../shared/ui/Filters/usersFilter.tsx";
import PostForm, { PostFormData } from "../../features/PostForm.tsx";
import { ThunkDispatch } from "@reduxjs/toolkit";


const PostsPage = () => {
  const dispatch = useDispatch<ThunkDispatch<never, never, never>>();
  const posts = useSelector(selectEnhancedPosts);
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const {users, status:usersStatus} = useSelector((state: RootState) => state.users);
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUserId, setSelectedUserId] = useState<string | 'all'>('all');


  const filteredPosts = selectedUserId === 'all'
    ? posts
    : posts.filter((post) => post.userId === selectedUserId);

  const pageCount = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(1);
    }
  }, [pageCount, currentPage]);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, postsStatus, usersStatus]);

  const handleAddPost = useCallback(
    (data: PostFormData) => {
      dispatch(
        addPost({
          title: data.title,
          body: data.body,
          userId: '1',
          createdAt: new Date().toISOString(),
        })
      );
    },
    [dispatch]
  );

  const handleDeletePost = useCallback(
    (postId: string) => {
      dispatch(deletePost(postId));
    },
    [dispatch]
  );

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
      <UserFilter
        users={users}
        selectedUserId={selectedUserId}
        onUserChange={handleUserChange}
      />
      <Box mt={4}>
        <PostForm onSubmit={handleAddPost} />
      </Box>

      {paginatedPosts.map((post: EnhancedPost) => (
        <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
      ))}

      <PaginationComponent
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default PostsPage;