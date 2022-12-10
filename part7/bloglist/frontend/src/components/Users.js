import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <Typography variant="h3" sx={{ mb: 5, mt: 5 }}>
        Users
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Typography>
                <strong>Blogs created</strong>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Button component={Link} to={`/users/${user.id}`}>
                  {user.name}
                </Button>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Users;
