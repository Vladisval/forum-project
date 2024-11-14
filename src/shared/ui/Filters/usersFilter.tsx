import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface UserFilterProps {
  users: { id: string; name: string }[];
  selectedUserId: string | 'all';
  onUserChange: (userId: string) => void;
}

const UserFilter = ({ users, selectedUserId, onUserChange } : UserFilterProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onUserChange(event.target.value);
  };

  return (
    <Box sx={{marginBottom: 2, maxWidth: 300}}>
      <Select
        value={selectedUserId}
        onChange={handleChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="all">Все пользователи</MenuItem>
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
);
};

export default UserFilter;