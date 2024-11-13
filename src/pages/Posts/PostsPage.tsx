import { UserModel } from "../../entities/user/model/UserModel.ts";
import { PostModel } from "../../entities/post/model/PostModel.ts";
import { Container, Typography } from "@mui/material";
import PostCard from "../../entities/post/ui/PostCard.tsx";


const mockUser: UserModel = {
  id: 1,
  name: 'John Doe',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
};

const mockPosts: PostModel[] = [
  {
    userId: 1,
    id: 1,
    author: mockUser,
    title: 'My First Post',
    body: 'This is the content of the first post.',
    createdAt: new Date(),
  },
  {
    userId: 1,
    id: 2,
    author: mockUser,
    title: 'Another Post',
    body: 'Here is some more content for another post.',
    createdAt: new Date(),
  },
];
const PostsPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        User Posts
      </Typography>
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default PostsPage;