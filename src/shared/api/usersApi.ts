import { UserModel } from "../../entities/user/model/UserModel.ts";

export async function fetchUsersApi(): Promise<UserModel[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  return data.map((user: any) => ({
    id: user.id,
    name: user.name,
    avatarUrl: `https://i.pravatar.cc/150?u=${user.id}`, // Используем фейковый URL для аватара
  })) as UserModel[];
}