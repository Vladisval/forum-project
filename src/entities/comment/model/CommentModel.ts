
export interface CommentModel {
  id: string;
  postId: string;
  userId: string;
  body: string;
  createdAt: string;
}

export  interface CommentFormInput {
  body: string;
}
