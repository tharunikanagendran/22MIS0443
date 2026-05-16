import { useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  TextField,
  Button,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
  Modal,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { fetchNotifications } from "./services/notificationService";

function App() {
  const [notifications, setNotifications] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [darkMode, setDarkMode] =
    useState(false);

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedNotification,
    setSelectedNotification] =
    useState(null);

  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  const notificationsPerPage = 4;

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await fetchNotifications();
    setNotifications(data);
  };

  const handleOpenModal = (
    notification
  ) => {
    setSelectedNotification(notification);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // SEARCH

  const searchedNotifications =
    notifications.filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // FILTER

  const filteredNotifications =
    filter === "All"
      ? searchedNotifications
      : searchedNotifications.filter(
          (item) =>
            item.priority === filter
        );

  // PAGINATION

  const indexOfLastNotification =
    currentPage * notificationsPerPage;

  const indexOfFirstNotification =
    indexOfLastNotification -
    notificationsPerPage;

  const currentNotifications =
    filteredNotifications.slice(
      indexOfFirstNotification,
      indexOfLastNotification
    );

  const totalPages = Math.ceil(
    filteredNotifications.length /
      notificationsPerPage
  );

  // COUNTS

  const highCount = notifications.filter(
    (item) => item.priority === "High"
  ).length;

  const mediumCount =
    notifications.filter(
      (item) =>
        item.priority === "Medium"
    ).length;

  const lowCount = notifications.filter(
    (item) => item.priority === "Low"
  ).length;

  // CHART DATA

  const chartData = [
    {
      name: "High",
      count: highCount,
    },
    {
      name: "Medium",
      count: mediumCount,
    },
    {
      name: "Low",
      count: lowCount,
    },
  ];

  const COLORS = [
    "#d32f2f",
    "#ed6c02",
    "#2e7d32",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: darkMode
          ? "#121212"
          : "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}

      <Drawer
        variant="permanent"
        sx={{
          width: 220,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 220,
            boxSizing: "border-box",
            backgroundColor: "#1976d2",
            color: "white",
          },
        }}
      >
        <Toolbar />

        <List>
          {/* DASHBOARD */}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                setActiveMenu(
                  "Dashboard"
                )
              }
            >
              <ListItemText primary="📊 Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* INBOX */}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                setActiveMenu("Inbox")
              }
            >
              <ListItemText primary="📥 Inbox" />
            </ListItemButton>
          </ListItem>

          {/* SETTINGS */}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                setActiveMenu(
                  "Settings"
                )
              }
            >
              <ListItemText primary="⚙️ Settings" />
            </ListItemButton>
          </ListItem>

          {/* LOGOUT */}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                setActiveMenu(
                  "Logout"
                )
              }
            >
              <ListItemText primary="🚪 Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* MAIN CONTENT */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1 }}
            >
              Campus Notifications
              Dashboard
            </Typography>

            {/* DARK MODE */}

            <Typography
              sx={{ marginRight: 1 }}
            >
              Dark Mode
            </Typography>

            <Switch
              checked={darkMode}
              onChange={() =>
                setDarkMode(
                  !darkMode
                )
              }
            />
          </Toolbar>
        </AppBar>

        <Container
          sx={{ marginTop: 4 }}
        >
          {/* PAGE TITLE */}

          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: darkMode
                ? "white"
                : "black",
            }}
          >
            {activeMenu ===
              "Dashboard" &&
              "NOTIFICATION DASHBOARD"}

            {activeMenu ===
              "Inbox" && "INBOX"}

            {activeMenu ===
              "Settings" &&
              "SETTINGS"}

            {activeMenu ===
              "Logout" &&
              "LOGOUT PAGE"}
          </Typography>

          {/* DASHBOARD PAGE */}

          {activeMenu ===
            "Dashboard" && (
            <>
              {/* SEARCH BAR */}

              <TextField
                label="Search Notifications"
                variant="outlined"
                fullWidth
                sx={{
                  marginBottom: 3,
                  backgroundColor:
                    darkMode
                      ? "#1e1e1e"
                      : "white",
                  borderRadius: 1,
                }}
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

              {/* FILTER BUTTONS */}

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  marginBottom: 4,
                }}
              >
                <Button
                  variant={
                    filter === "All"
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() =>
                    setFilter("All")
                  }
                >
                  All
                </Button>

                <Button
                  variant={
                    filter === "High"
                      ? "contained"
                      : "outlined"
                  }
                  color="error"
                  onClick={() =>
                    setFilter("High")
                  }
                >
                  High
                </Button>

                <Button
                  variant={
                    filter ===
                    "Medium"
                      ? "contained"
                      : "outlined"
                  }
                  color="warning"
                  onClick={() =>
                    setFilter(
                      "Medium"
                    )
                  }
                >
                  Medium
                </Button>

                <Button
                  variant={
                    filter === "Low"
                      ? "contained"
                      : "outlined"
                  }
                  color="success"
                  onClick={() =>
                    setFilter("Low")
                  }
                >
                  Low
                </Button>
              </Stack>

              {/* STATISTICS */}

              <Grid
                container
                spacing={3}
                sx={{
                  marginBottom: 4,
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={3}
                >
                  <Card
                    sx={{
                      backgroundColor:
                        "#1976d2",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        Total Notifications
                      </Typography>

                      <Typography variant="h4">
                        {
                          notifications.length
                        }
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={3}
                >
                  <Card
                    sx={{
                      backgroundColor:
                        "#d32f2f",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        High Priority
                      </Typography>

                      <Typography variant="h4">
                        {highCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={3}
                >
                  <Card
                    sx={{
                      backgroundColor:
                        "#ed6c02",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        Medium Priority
                      </Typography>

                      <Typography variant="h4">
                        {mediumCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={3}
                >
                  <Card
                    sx={{
                      backgroundColor:
                        "#2e7d32",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        Low Priority
                      </Typography>

                      <Typography variant="h4">
                        {lowCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* CHARTS */}

              <Grid
                container
                spacing={3}
                sx={{
                  marginBottom: 5,
                }}
              >
                {/* BAR CHART */}

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Card
                    sx={{
                      padding: 2,
                      backgroundColor:
                        darkMode
                          ? "#1e1e1e"
                          : "white",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        marginBottom: 2,
                        color:
                          darkMode
                            ? "white"
                            : "black",
                      }}
                    >
                      Priority Overview
                    </Typography>

                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <BarChart
                        data={
                          chartData
                        }
                      >
                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                          dataKey="count"
                          fill="#1976d2"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Grid>

                {/* PIE CHART */}

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Card
                    sx={{
                      padding: 2,
                      backgroundColor:
                        darkMode
                          ? "#1e1e1e"
                          : "white",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        marginBottom: 2,
                        color:
                          darkMode
                            ? "white"
                            : "black",
                      }}
                    >
                      Notifications
                      Distribution
                    </Typography>

                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <PieChart>
                        <Pie
                          data={
                            chartData
                          }
                          cx="50%"
                          cy="50%"
                          outerRadius={
                            100
                          }
                          dataKey="count"
                          label
                        >
                          {chartData.map(
                            (
                              entry,
                              index
                            ) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  COLORS[
                                    index %
                                      COLORS.length
                                  ]
                                }
                              />
                            )
                          )}
                        </Pie>

                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Grid>
              </Grid>

              {/* NOTIFICATION CARDS */}

              <Grid
                container
                spacing={3}
              >
                {currentNotifications.map(
                  (item) => (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      key={item.id}
                    >
                      <Card
                        elevation={4}
                        onClick={() =>
                          handleOpenModal(
                            item
                          )
                        }
                        sx={{
                          cursor:
                            "pointer",
                          backgroundColor:
                            darkMode
                              ? "#1e1e1e"
                              : "white",
                          color:
                            darkMode
                              ? "white"
                              : "black",
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6">
                            {
                              item.title
                            }
                          </Typography>

                          <Typography
                            sx={{
                              marginTop: 1,
                            }}
                          >
                            {
                              item.message
                            }
                          </Typography>

                          <Box
                            sx={{
                              marginTop: 2,
                            }}
                          >
                            <Chip
                              label={
                                item.priority
                              }
                              color={
                                item.priority ===
                                "High"
                                  ? "error"
                                  : item.priority ===
                                    "Medium"
                                  ? "warning"
                                  : "success"
                              }
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                )}
              </Grid>

              {/* PAGINATION */}

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  marginTop: 4,
                  justifyContent:
                    "center",
                }}
              >
                <Button
                  variant="contained"
                  disabled={
                    currentPage ===
                    1
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage -
                        1
                    )
                  }
                >
                  Previous
                </Button>

                <Typography
                  sx={{
                    marginTop: 1,
                    color:
                      darkMode
                        ? "white"
                        : "black",
                  }}
                >
                  Page{" "}
                  {currentPage} of{" "}
                  {totalPages}
                </Typography>

                <Button
                  variant="contained"
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage +
                        1
                    )
                  }
                >
                  Next
                </Button>
              </Stack>
            </>
          )}

          {/* INBOX PAGE */}

          {activeMenu ===
            "Inbox" && (
            <Typography
              variant="h5"
              sx={{
                color: darkMode
                  ? "white"
                  : "black",
                marginTop: 4,
              }}
            >
              📥 You have{" "}
              {
                notifications.length
              }{" "}
              notifications.
            </Typography>
          )}

          {/* SETTINGS PAGE */}

          {activeMenu ===
            "Settings" && (
            <Box
              sx={{
                marginTop: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: darkMode
                    ? "white"
                    : "black",
                }}
              >
                ⚙️ Settings Panel
              </Typography>

              <Typography
                sx={{
                  marginTop: 2,
                  color: darkMode
                    ? "white"
                    : "black",
                }}
              >
                Enable or disable dark
                mode using the switch
                in the navbar.
              </Typography>
            </Box>
          )}

          {/* LOGOUT PAGE */}

          {activeMenu ===
            "Logout" && (
            <Box
              sx={{
                marginTop: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: darkMode
                    ? "white"
                    : "black",
                }}
              >
                🚪 Logout Successful
              </Typography>
            </Box>
          )}

          {/* MODAL */}

          <Modal
            open={openModal}
            onClose={
              handleCloseModal
            }
          >
            <Box
              sx={{
                position:
                  "absolute",
                top: "50%",
                left: "50%",
                transform:
                  "translate(-50%, -50%)",
                width: 400,
                backgroundColor:
                  darkMode
                    ? "#1e1e1e"
                    : "white",
                color: darkMode
                  ? "white"
                  : "black",
                borderRadius: 2,
                boxShadow: 24,
                padding: 4,
              }}
            >
              {selectedNotification && (
                <>
                  <Typography
                    variant="h5"
                    gutterBottom
                  >
                    {
                      selectedNotification.title
                    }
                  </Typography>

                  <Typography
                    sx={{
                      marginBottom: 2,
                    }}
                  >
                    {
                      selectedNotification.message
                    }
                  </Typography>

                  <Chip
                    label={
                      selectedNotification.priority
                    }
                    color={
                      selectedNotification.priority ===
                      "High"
                        ? "error"
                        : selectedNotification.priority ===
                          "Medium"
                        ? "warning"
                        : "success"
                    }
                  />

                  <Box
                    sx={{
                      marginTop: 3,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={
                        handleCloseModal
                      }
                    >
                      Close
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Modal>
        </Container>
      </Box>
    </Box>
  );
}

export default App;