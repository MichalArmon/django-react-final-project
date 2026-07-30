import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../providers/UserProvider";

function UsersAdminPage() {
  const navigate = useNavigate();
  const { handleGetAllUsers } = useUser();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersFromServer = await handleGetAllUsers();
        setUsers(usersFromServer);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: "text.primary",
        }}
      >
        Users Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((currentUser) => (
              <TableRow key={currentUser.id}>
                <TableCell>{currentUser.id}</TableCell>

                <TableCell>{currentUser.username}</TableCell>

                <TableCell>
                  {currentUser.first_name} {currentUser.last_name}
                </TableCell>

                <TableCell>{currentUser.email}</TableCell>

                <TableCell>{currentUser.profile?.role}</TableCell>

                <TableCell>{currentUser.profile?.city}</TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      navigate(`/admin/users/${currentUser.id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UsersAdminPage;
