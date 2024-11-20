
export interface CommentModel {
  id: string;
  postId: string;
  userId: number;
  body: string;
  createdAt: string;
}

export  interface CommentFormInput {
  body: string;
}
