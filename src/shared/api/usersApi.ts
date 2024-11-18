import { UserModel } from "../../entities/user/model/UserModel.ts";

export async function fetchUsersApi(): Promise<UserModel[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data.map((user: any) => ({
    ...user,
    id: user.id.toString(),
    avatarUrl: `https://i.pravatar.cc/150?u=${user.id}`,
  })) as UserModel[];
}