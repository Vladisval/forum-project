import { UserModel } from "../../user/model/UserModel.ts";

export interface PostModel {
  userId: number;
  id: string;
  title: string;
  body: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  isFavorite: boolean;
  likedByUser: boolean;
  dislikedByUser: boolean;
}

export interface EnhancedPost extends PostModel {
  author: UserModel;
}