import { UserModel } from "../../user/model/UserModel.ts";

export interface PostModel {
  userId: string,
  id: number,
  title: string,
  body: string,
  createdAt: string;
}

export interface EnhancedPost extends PostModel {
  author: UserModel;
}