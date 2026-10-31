import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  ArrowForwardRounded,
  AutoAwesomeRounded,
  EditOutlined,
  GroupOutlined,
  ManageAccountsOutlined,
  PersonOutlineRounded,
  SearchRounded,
} from "@mui/icons-material";

import { useUser } from "../../providers/UserProvider";

const MotionBox = motion.create(Box);

const colors = {
  background: "#FCFBFD",
  ink: "#201D2A",
  muted: "#817B8C",
  purple: "#8460B6",
  lavender: "#F1EBF9",
  border: "#ECE9F0",
};

const roleColors = {
  admin: { bg: "#F2E8FC", text: "#7040A7" },
  manager: { bg: "#E8F0FF", text: "#365DAB" },
  editor: { bg: "#E8F0FF", text: "#365DAB" },
  author: { bg: "#E6F6EE", text: "#287552" },
  reader: { bg: "#F1F1F4", text: "#686575" },
};

function StatCard({ icon, label, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${colors.border}`,
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 2.5,
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 2.5,
          bgcolor: colors.lavender,
          color: colors.purple,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 32,
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: "-0.05em",
            color: colors.ink,
          }}
        >
          {value}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: colors.muted }}>
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function UsersAdminPage() {
  const navigate = useNavigate();
  const { handleGetAllUsers } = useUser();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      try {
        const result = await handleGetAllUsers();
        if (mounted) {
          setUsers(Array.isArray(result) ? result : result?.results || []);
        }
      } catch (err) {
        if (mounted) {
          setError("Unable to load users.");
        }
        console.error(err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  const availableRoles = useMemo(
    () => [...new Set(users.map((u) => u.profile?.role).filter(Boolean))],
    [users],
  );

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return users.filter((user) => {
      const fullName = `${user.first_name || ""} ${user.last_name || ""}`;

      const matchesSearch = [
        user.username,
        fullName,
        user.email,
        user.profile?.city,
      ].some((value) => (value || "").toLowerCase().includes(term));

      const matchesRole =
        roleFilter === "all" || user.profile?.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const authors = users.filter(
    (user) => user.profile?.role === "author",
  ).length;

  const editors = users.filter((user) =>
    ["editor", "manager"].includes(user.profile?.role),
  ).length;

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: colors.background,
        pt: { xs: 5, md: 9 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <AutoAwesomeRounded sx={{ color: colors.purple, fontSize: 18 }} />
            <Typography
              variant="overline"
              sx={{
                color: colors.purple,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              ADMINISTRATION
            </Typography>
          </Stack>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 42, md: 64 },
              fontWeight: 800,
              letterSpacing: "-0.065em",
              lineHeight: 1.1,
              color: colors.ink,
            }}
          >
            People &{" "}
            <Box component="span" sx={{ color: colors.purple }}>
              Permissions.
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: colors.muted,
              maxWidth: 630,
              lineHeight: 1.8,
              fontSize: { xs: 15, md: 17 },
            }}
          >
            Manage your community, review user roles, and keep everything
            organized in one place.
          </Typography>
        </MotionBox>

        {/* STATISTICS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2.5,
            mb: 5,
          }}
        >
          <StatCard
            icon={<GroupOutlined />}
            label="Total Users"
            value={users.length}
          />
          <StatCard
            icon={<PersonOutlineRounded />}
            label="Authors"
            value={authors}
          />
          <StatCard
            icon={<ManageAccountsOutlined />}
            label="Editors & Managers"
            value={editors}
          />
        </Box>

        {/* USERS TABLE */}
        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${colors.border}`,
            borderRadius: 4,
            bgcolor: "#fff",
            overflow: "hidden",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            gap={2.5}
            sx={{ p: { xs: 2.5, md: 3.5 } }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: colors.ink,
                }}
              >
                Community Members
              </Typography>

              <Typography variant="body2" sx={{ color: colors.muted, mt: 0.5 }}>
                {filteredUsers.length} of {users.length} users
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
              <TextField
                size="small"
                placeholder="Search users..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  minWidth: { sm: 260 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    bgcolor: "#FCFBFD",
                  },
                }}
              />

              <TextField
                select
                size="small"
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                sx={{
                  minWidth: 150,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    bgcolor: "#FCFBFD",
                  },
                }}
              >
                <MenuItem value="all">All Roles</MenuItem>
                {availableRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mx: 3, mb: 2 }}>
              {error}
            </Alert>
          )}

          {isLoading ? (
            <Stack alignItems="center" sx={{ py: 9 }}>
              <CircularProgress />
            </Stack>
          ) : (
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 850 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "#FAF9FC",
                      "& th": {
                        color: colors.muted,
                        fontWeight: 750,
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: 0.8,
                        borderBottom: `1px solid ${colors.border}`,
                        py: 2,
                      },
                    }}
                  >
                    <TableCell>Member</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredUsers.map((currentUser) => {
                    const role = currentUser.profile?.role || "reader";
                    const roleStyle = roleColors[role] || roleColors.reader;

                    const name =
                      `${currentUser.first_name || ""} ${currentUser.last_name || ""}`.trim() ||
                      currentUser.username;

                    return (
                      <TableRow
                        key={currentUser.id}
                        hover
                        sx={{
                          "& td": {
                            py: 2,
                            borderColor: "#F0EDF4",
                          },
                          "&:hover": {
                            bgcolor: "#FCFAFF",
                          },
                        }}
                      >
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                          >
                            <Avatar
                              sx={{
                                width: 42,
                                height: 42,
                                bgcolor: colors.lavender,
                                color: colors.purple,
                                fontWeight: 800,
                                fontSize: 15,
                              }}
                            >
                              {name.charAt(0).toUpperCase()}
                            </Avatar>

                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: 750,
                                  color: colors.ink,
                                  fontSize: 14,
                                }}
                              >
                                {name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: colors.muted }}
                              >
                                @{currentUser.username}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2">
                            {currentUser.email || "—"}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Chip
                            size="small"
                            label={role}
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: 750,
                              bgcolor: roleStyle.bg,
                              color: roleStyle.text,
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ color: colors.muted }}
                          >
                            {currentUser.profile?.city || "—"}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            size="small"
                            endIcon={<EditOutlined fontSize="small" />}
                            onClick={() =>
                              navigate(`/admin/users/${currentUser.id}/edit`)
                            }
                            sx={{
                              textTransform: "none",
                              fontWeight: 750,
                              color: colors.purple,
                              borderRadius: 2,
                              px: 2,
                              "&:hover": {
                                bgcolor: colors.lavender,
                              },
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 7 }}>
                        <Typography color="text.secondary">
                          No matching users found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
