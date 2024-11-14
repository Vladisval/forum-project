import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store.ts";
import { useEffect } from "react";
import { fetchUsers } from "../../entities/user/model/userSlice.ts";
import { CircularProgress, Container, Typography } from "@mui/material";
import UserCard from "../../entities/user/ui/UserCard.tsx";


const UsersPage = () => {
  const dispatch = useDispatch();
  const usersStatus = useSelector((state: RootState) => state.users.status )
  const users = useSelector((state: RootState) => state.users.users)
  useEffect(() => {
    if (usersStatus === 'idle') {
      // @ts-ignore
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  if (usersStatus === 'loading') {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', pt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
 <Container maxWidth="md">
   <Typography variant="h4" component="h1" align="center" gutterBottom>
     User Posts
   </Typography>
   {users.map((user) => (
     <UserCard key={user.id} user={user} />
   ))}
 </Container>
  );
};

export default UsersPage;