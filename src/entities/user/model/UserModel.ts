
export interface UserModel {
  id: number,
  name: string,
  username: string,
  email: string,
  avatarUrl: string,
  address: {
    street?: string,
    suite?: string,
    city?: string,
    zipcode?: string,
    geo?: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name?: string,
    catchPhrase?: string,
    bs?: string
  }
}