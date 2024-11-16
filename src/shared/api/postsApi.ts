import { EnhancedPost } from "../../entities/post/model/PostModel.ts";
import axios from "axios";

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPostsApi = async (): Promise<EnhancedPost[]> => {
  const response = await axios.get(BASE_URL);
  return response.data.map((post: any) => ({
    ...post,
    id:post.id.toString(),
    createdAt: new Date().toISOString(),
  })) as EnhancedPost[];
};

export const addPostToApi = async (newPost: Omit<EnhancedPost, 'id' | 'author' | 'createdAt'>): Promise<EnhancedPost> => {
  const response = await axios.post(BASE_URL, newPost);
  const post = {...response.data, id: response.data.id.toString()};
  return post as EnhancedPost;
};

export const deletePostFromApi = async (postId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${postId}`);
};