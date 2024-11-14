import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { UserModel } from "../model/UserModel.ts";

interface UsersCardProps {
  user: UserModel
}

const UserCard = ({user}: UsersCardProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} alt={user.username} />}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
         Name: {user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          City: {user.address?.city}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Phone: {user.phone}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Website: {user.website}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;