import { EnhancedPost } from "../../entities/post/model/PostModel.ts";


export async function fetchPostsApi(): Promise<EnhancedPost[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    content: post.body,
    authorId: post.userId,
    createdAt: new Date().toISOString(),
  })) as EnhancedPost[];
}