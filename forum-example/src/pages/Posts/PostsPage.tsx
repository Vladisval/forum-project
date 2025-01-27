import { EnhancedPost } from "../../entities/post/model/PostModel.ts";
import { Alert, AlertTitle, Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import PostCard from "../../entities/post/ui/PostCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store.ts";
import { deletePost, fetchPosts } from "../../entities/post/model/postSlice.ts";
import { fetchUsers } from "../../entities/user/model/userSlice.ts";
import { useCallback, useEffect, useState } from "react";
import { selectEnhancedPosts } from "../../entities/post/model/postsSelector.ts";
import PaginationComponent from "../../shared/ui/PaginationComponent/PaginationComponent.tsx";
import UserFilter from "../../shared/ui/Filters/usersFilter.tsx";
import { ThunkDispatch } from "@reduxjs/toolkit";
import CreatePostModal from "../../entities/post/ui/CreatePostModal.tsx";


const PostsPage = () => {
  const dispatch = useDispatch<ThunkDispatch<never, never, never>>();
  const posts = useSelector(selectEnhancedPosts);
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const {users, status:usersStatus} = useSelector((state: RootState) => state.users);
  const itemsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUserId, setSelectedUserId] = useState<string | 'all'>('all');
  const [openModal, setOpenModal] = useState(false);

  const filteredPosts = selectedUserId === 'all'
    ? posts
    : posts.filter((post) => post.userId === Number(selectedUserId));

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


  const handleDeletePost = useCallback(
    (postId: string) => {
      dispatch(deletePost(postId));
    },
    [dispatch]
  );

  const handleClickOpenModel = () => {
    setOpenModal(true);
  }

  if (postsStatus === 'loading' || usersStatus === 'loading') {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', pt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (postsStatus === 'failed' || usersStatus === 'failed') {
    return <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Alert variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        Произошла ошибка загрузки данных
      </Alert>
    </Container>
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" >
        Posts
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{padding: "15px 0"}}>
        <UserFilter
          users={users}
          selectedUserId={selectedUserId}
          onUserChange={handleUserChange}
        />
        <Button onClick={handleClickOpenModel}  variant="contained" color="secondary"> Create Post </Button>
      </Box>

      {filteredPosts.length ?
        paginatedPosts.map((post: EnhancedPost) => (
          <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
        )) :
        <Box display="flex" justifyContent="center">
          <Typography variant='h5'>Здесь пока ничего нет</Typography>
        </Box>
      }


      {filteredPosts.length > itemsPerPage ? <PaginationComponent
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> : <> </>}
      <CreatePostModal setOpenModal={setOpenModal} openModal={openModal} />
    </Container>
  );
};

export default PostsPage;