import { EnhancedPost, PostModel } from "./PostModel.ts";
import { RootState } from "../../../app/store/store.ts";


export const selectEnhancedPosts = (state: RootState): EnhancedPost[] => {
  const posts = state.posts.posts;
  const users = state.users.users;

  return posts.map((post: PostModel) => {
    const author = users.find((user) => user.id === post.userId) || {
      id: '0',
      name: 'Unknown User',
      username: '-',
      email: '-',
      avatarUrl: '',
      phone: '-',
      website: '-',
    };
    return {
      ...post,
      author,
    };
  });
};