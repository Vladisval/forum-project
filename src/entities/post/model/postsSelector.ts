import { EnhancedPost } from "./PostModel.ts";
import { RootState } from "../../../app/store/store.ts";


export const selectEnhancedPosts = (state: RootState): EnhancedPost[] => {
  const posts = state.posts.posts;
  const users = state.users.users;

  return posts.map((post) => {
    const author = users.find((user) => user.id === post.authorId) || {
      id: 0,
      name: 'Unknown User',
    };
    return {
      ...post,
      author,
    };
  });
};