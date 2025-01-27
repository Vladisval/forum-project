import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { UserModel } from "../model/UserModel.ts";

interface UsersCardProps {
  user: UserModel
}

const UserCard = ({user}: UsersCardProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, display: "flex" }}>
      <CardHeader
        avatar={<Avatar  src={user.avatarUrl} alt={user.username} sx={{width: 72, height: 72}} />}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
         Name: {user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
         Nickname: {user.username}
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