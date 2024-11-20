import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface UserFilterProps {
  users: { id: number; name: string }[];
  selectedUserId: string | 'all';
  onUserChange: (userId: string) => void;
}

const UserFilter = ({ users, selectedUserId, onUserChange } : UserFilterProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onUserChange(event.target.value);
  };

  return (
    <Box sx={{maxWidth: 300}}>
      <Select
        variant="outlined"
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