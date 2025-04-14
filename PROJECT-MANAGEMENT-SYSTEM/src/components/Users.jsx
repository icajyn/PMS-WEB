import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Chip,
  Button,
  Pagination,
  Stack,
} from "@mui/material";
import { Search, MoreVert, Edit, Delete } from "@mui/icons-material";
import AdminLayout from "./AdminLayout";

// Mock data for users
const initialUsers = [
  {
    name: "Ehrica Jynne Espada",
    role: "Student",
    email: "ehricajynne.espada@cit.edu",
    status: "Active",
  },
  {
    name: "Miggshy Jaca",
    role: "Student",
    email: "miggshy.jaca@cit.edu",
    status: "Active",
  },
  {
    name: "Joemarie Amparo",
    role: "Faculty",
    email: "joemarie.amparo@cit.edu",
    status: "Active",
  },
  {
    name: "Ragnar Geila",
    role: "Student",
    email: "ragnar.geila@cit.edu",
    status: "Inactive",
  },
  {
    name: "Frederick Revilleza",
    role: "Faculty",
    email: "frederick.revilleza@cit.edu",
    status: "Active",
  },
  {
    name: "Primo Blue",
    role: "Student",
    email: "primo.blue@cit.edu",
    status: "Active",
  },
  {
    name: "Mrc Paraiso",
    role: "Student",
    email: "mrc.paraiso@cit.edu",
    status: "Inactive",
  },
  {
    name: "Leah Barbaso",
    role: "Faculty",
    email: "leah.barbaso@cit.edu",
    status: "Active",
  },
];

// Color palette for avatars
const avatarColors = [
  "#8B0000", // Maroon
  "#D4A017", // Golden Brown
  "#2E5090", // Navy Blue
  "#8B4513", // Saddle Brown
  "#006400", // Dark Green
  "#800080", // Purple
  "#FF8C00", // Dark Orange
  "#4B0082", // Indigo
  "#B22222", // Fire Brick
  "#2F4F4F", // Dark Slate Gray
];

// Function to get color based on name
const getAvatarColor = (name) => {
  // Special case for Primo Blue
  if (name === "Primo Blue") {
    return "#2563eb"; // Royal Blue
  }
  const index = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[index % avatarColors.length];
};

const Users = () => {
  const [users] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(8);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          px: 3,
          py: 2,
          width: "100%",
          maxWidth: "100%",
          overflowX: "hidden",
          bgcolor: "#f8fafc",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1a1f36",
              fontSize: "1.5rem",
            }}
          >
            Users
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#8B0000",
              "&:hover": {
                bgcolor: "#6B0000",
              },
              textTransform: "none",
              px: 3,
              py: 1,
              borderRadius: 2,
            }}
          >
            Add User
          </Button>
        </Box>

        {/* Search and Filter Section */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              maxWidth: 300,
              bgcolor: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#E2E8F0",
                },
                "&:hover fieldset": {
                  borderColor: "#8B0000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8B0000",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#64748B" }} />
                </InputAdornment>
              ),
            }}
          />
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              minWidth: 150,
              bgcolor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E2E8F0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#8B0000",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#8B0000",
              },
            }}
          >
            <MenuItem value="Newest">Sort by: Newest</MenuItem>
            <MenuItem value="Oldest">Sort by: Oldest</MenuItem>
            <MenuItem value="Name">Sort by: Name</MenuItem>
          </Select>
        </Box>

        {/* Users Table */}
        <Paper
          sx={{
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
            overflow: "hidden",
            transition:
              "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2.5fr 1fr 2fr 1fr 1fr",
              borderBottom: "1px solid #E2E8F0",
              bgcolor: "#F8FAFC",
              p: 2,
            }}
          >
            <Typography
              sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.875rem" }}
            >
              Name
            </Typography>
            <Typography
              sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.875rem" }}
            >
              Role
            </Typography>
            <Typography
              sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.875rem" }}
            >
              Email
            </Typography>
            <Typography
              sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.875rem" }}
            >
              Status
            </Typography>
            <Typography
              sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.875rem" }}
            >
              Action
            </Typography>
          </Box>

          {currentUsers.map((user, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "2.5fr 1fr 2fr 1fr 1fr",
                borderBottom: "1px solid #E2E8F0",
                p: 2,
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "#F8FAFC",
                },
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: getAvatarColor(user.name),
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    border: "2px solid #fff",
                  }}
                >
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Typography
                  sx={{
                    color: "#1a1f36",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  {user.name}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#64748B",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user.role}
              </Typography>
              <Typography sx={{ color: "#64748B", fontSize: "0.875rem" }}>
                {user.email}
              </Typography>
              <Box>
                <Chip
                  label={user.status}
                  size="small"
                  sx={{
                    bgcolor: user.status === "Active" ? "#dcfce7" : "#fee2e2",
                    color: user.status === "Active" ? "#16a34a" : "#ef4444",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: "#D4A017",
                    "&:hover": {
                      bgcolor: "rgba(212, 160, 23, 0.1)",
                    },
                  }}
                >
                  <Edit sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "#8B0000",
                    "&:hover": {
                      bgcolor: "rgba(139, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Delete sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>

        {/* Pagination */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
          }}
        >
          <Typography sx={{ color: "#64748B", fontSize: "0.875rem" }}>
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}{" "}
            entries
          </Typography>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#64748B",
                  borderRadius: 1,
                  "&.Mui-selected": {
                    bgcolor: "#8B0000",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#6B0000",
                    },
                  },
                  "&:hover": {
                    bgcolor: "rgba(139, 0, 0, 0.1)",
                  },
                },
                "& .MuiPaginationItem-previousNext": {
                  border: "1px solid #E2E8F0",
                  "&:hover": {
                    bgcolor: "rgba(139, 0, 0, 0.1)",
                    borderColor: "#8B0000",
                  },
                },
                "& .MuiPaginationItem-firstLast": {
                  border: "1px solid #E2E8F0",
                  "&:hover": {
                    bgcolor: "rgba(139, 0, 0, 0.1)",
                    borderColor: "#8B0000",
                  },
                },
                "& .Mui-disabled": {
                  opacity: 0.5,
                  border: "1px solid #E2E8F0",
                },
              }}
            />
          </Stack>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default Users;
