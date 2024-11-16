import { CommentModel } from "../../entities/comment/model/CommentModel.ts";

export const fetchCommentsByPostId = async (postId: string): Promise<CommentModel[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке комментариев');
  }
  return response.json();
};

export const addComment = async (newComment: Omit<CommentModel, 'id' | 'createdAt'>): Promise<CommentModel> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...newComment,
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error('Ошибка при добавлении комментария');
  }
  return response.json();
};