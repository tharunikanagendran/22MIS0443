import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Campus Notifications
        </Typography>

        <Box>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Priority Inbox</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;