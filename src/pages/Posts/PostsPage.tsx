import { EnhancedPost } from "../../entities/post/model/PostModel.ts";
import { CircularProgress, Container, Typography } from "@mui/material";
import PostCard from "../../entities/post/ui/PostCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store.ts";
import { fetchPosts } from "../../entities/post/model/postSlice.ts";
import { fetchUsers } from "../../entities/user/model/userSlice.ts";
import { useEffect, useState } from "react";
import { selectEnhancedPosts } from "../../entities/post/model/postsSelector.ts";
import PaginationComponent from "../../shared/ui/PaginationComponent/PaginationComponent.tsx";
import UserFilter from "../../shared/ui/Filters/usersFilter.tsx";


const PostsPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectEnhancedPosts);
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const usersStatus = useSelector((state: RootState) => state.users.status);
  const users = useSelector((state: RootState) => state.users.users);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
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
      <UserFilter
        users={users}
        selectedUserId={selectedUserId}
        onUserChange={handleUserChange}
      />
      {paginatedPosts.map((post: EnhancedPost) => (
        <PostCard key={post.id} post={post} />
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