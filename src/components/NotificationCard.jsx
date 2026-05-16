import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

function NotificationCard({ notification }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {notification.Message}
        </Typography>

        <Chip
          label={notification.Type}
          color="primary"
          sx={{ mt: 1 }}
        />

        <Typography
          variant="body2"
          sx={{ mt: 2 }}
        >
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;