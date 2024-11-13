import { UserModel } from "../../user/model/UserModel.ts";

export interface PostModel {
  userId: UserModel["id"],
  author?: UserModel,
  id: number,
  title: string,
  body: string,
  createdAt?: Date;
}
