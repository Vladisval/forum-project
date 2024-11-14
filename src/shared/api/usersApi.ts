import { UserModel } from "../../entities/user/model/UserModel.ts";

export async function fetchUsersApi(): Promise<UserModel[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  return data.map((user: any) => ({
    id: user.id,
    name: user.name,
    avatarUrl: `https://i.pravatar.cc/150?u=${user.id}`,
    email: user.email,
    phone: user.phone,
    address: user.address,
    website: user.website,


  })) as UserModel[];
}