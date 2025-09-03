// pages/customer-dashboard/profile/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@component/pagination";
import {
  Title,
  // Button, // ❌ remove clash with MUI Button
  Description,
  ToolbarWrapper,
  // BaseSelect,
  // BaseInput,
  TableHeader,
  Table,
  TableRow,
  TableCell,
  Container,
  Icon,
  Arrow,
  SortArrows,
  HeaderRow,
  Pill,
  Heading,
} from "./styledComponents";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { userData } from "./constants";
import Avatar from "@component/avatar";
import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  type SelectChangeEvent,
} from "@mui/material";
import { ChevronDown, TrendingUp, Users, ShieldCheck, Clock4 } from "lucide-react";

type User = { id: number; name: string; email: string; role: string; avatar: string };

const CONTROL_HEIGHT = 40; // keep all controls same height

const fieldRootSx = {
  borderRadius: 2,
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#bdbdbd" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 2px rgba(59,130,246,.2)",
  },
};

const selectSx = {
  minWidth: 140,
  ...fieldRootSx,
  height: CONTROL_HEIGHT,
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    py: 1.25,
    pl: 1.75,
    pr: 5, // space for chevron
    lineHeight: 1.4,
    fontSize: 16,
    color: "#5c5c6a",
  },
  "& .MuiSelect-icon": {
    right: 12,
    top: "calc(50% - 12px)", // 24px icon -> 12px offset
    color: "#6b7280",
  },
};

const textFieldSx = {
  minWidth: 220,
  ...fieldRootSx,
  height: CONTROL_HEIGHT,
  "& .MuiInputBase-root": { height: CONTROL_HEIGHT, borderRadius: 2 },
  "& .MuiInputBase-input": {
    py: 1.25,
    pl: 1.75,
    pr: 1.75,
    fontSize: 16,
    color: "#5c5c6a",
  },
};

const primaryBtnSx = {
  height: CONTROL_HEIGHT,
  borderRadius: 1.5,
  textTransform: "none",
  fontSize: 14,
  px: 2.5,
  background: "#0030E3",
  boxShadow: "none",
  "&:hover": { background: "#1e40af" },
  "&:focus-visible": { boxShadow: "0 0 0 2px rgba(59,130,246,.2)" },
};

const menuProps = {
  PaperProps: {
    sx: {
      mt: 1,
      borderRadius: 2,
      boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      overflow: "hidden",
    },
  },
  MenuListProps: { sx: { py: 0 } },
};

const itemSx = { px: 2, py: 1.25, fontSize: 15, color: "#333" };

const UserGrid = () => {
  const [users, setUsers] = useState<User[]>(userData as User[]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sortField, setSortField] = useState<"name" | "role" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>(""); // "" = show all (placeholder)
  const [activeTab, setActiveTab] = useState<"roleList" | "businessManagement">("roleList");
  type HeaderTab = "role" | "bm";
  const [headerTab, setHeaderTab] = useState<HeaderTab>("role");
  const pillBlue = "rgba(0, 48, 227, 0.12)";
  const brandBlue = "#0030E3";

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query || u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query);
    const matchesRole = roleFilter === "" ? true : u.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    const valA = (a[sortField] ?? "").toLowerCase();
    const valB = (b[sortField] ?? "").toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const pageCount = Math.ceil(sortedUsers.length / pageSize);

  useEffect(() => {
    if (currentPage >= pageCount) setCurrentPage(0);
  }, [pageCount, currentPage]);

  const displayedUsers = sortedUsers.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handlePageSizeChange = (e: SelectChangeEvent<string | number>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0);
  };

  const editUser = (updatedUser: {
    id: number;
    name: string;
    role: string;
    email?: string;
    avatar?: string;
  }) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u)));
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSort = (field: "name" | "role") => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <Container>
      <Tabs
        value={headerTab}
        onChange={(_, v: HeaderTab) => setHeaderTab(v)}
        aria-label="Management header tabs"
        sx={{
          minHeight: 0,
          mb: 2.5,
          // hide default underline indicator
          "& .MuiTabs-indicator": { display: "none" },
          // base tab style
          "& .MuiTab-root": {
            textTransform: "none",
            minHeight: 0,
            fontSize: "1.125rem",   // 18px
            fontWeight: 300,
            lineHeight: 1.25,
            px: 0,
            mr: 3,                  // gap between tabs
            borderRadius: "14px",
            // inactive look (plain text)
            color: "#111113",
            "&:hover": { background: "rgba(0,0,0,0.04)" },
          },
          // active pill look
          "& .Mui-selected": {
            background: pillBlue,
            color: brandBlue,
            px: 2,                  // pill horizontal padding
            py: 1.25,
            "&:hover": { background: "rgba(0, 48, 227, 0.16)" },
          },
        }}
      >
        <Tab value="role" label="Role List" disableRipple />
        <Tab value="bm" label="Business Management" disableRipple />
      </Tabs>
      {headerTab === "role" && (
        <div style={{ border: "1px solid #ddd", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <ToolbarWrapper>
            {/* Page size */}
            <FormControl>
              <Select
                value={String(pageSize)}
                onChange={handlePageSizeChange}
                IconComponent={ChevronDown as any}
                sx={selectSx}
                MenuProps={menuProps}
              >
                {[10, 20, 30, 40, 50].map((num) => (
                  <MenuItem key={num} value={String(num)} sx={itemSx}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {/* Search */}
              <TextField
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(0);
                }}
                variant="outlined"
                sx={textFieldSx}
              />

              {/* Role filter */}
              <FormControl sx={{ minWidth: 180 }}>
                <Select
                  value={roleFilter} // "" initially -> placeholder
                  onChange={(e: SelectChangeEvent<string>) => {
                    setRoleFilter(e.target.value);
                    setCurrentPage(0);
                  }}
                  displayEmpty
                  renderValue={(val) => (val ? String(val) : "Select Role")}
                  IconComponent={ChevronDown as any}
                  sx={selectSx}
                  MenuProps={menuProps}
                >
                  <MenuItem value="" sx={{ ...itemSx, color: "#6b7280" }}>
                    Select Role
                  </MenuItem>
                  <MenuItem value="Super Admin" sx={itemSx}>
                    Super Admin
                  </MenuItem>
                  <MenuItem value="Admin" sx={itemSx}>
                    Admin
                  </MenuItem>
                  <MenuItem value="Member" sx={itemSx}>
                    Member
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Add User */}
              <Button
                variant="contained"
                disableElevation
                sx={{
                  ...primaryBtnSx,
                  background: '#0030E3',
                  color: '#fff',                // <-- make text white
                  '&:hover': { background: '#1e40af', color: '#fff' },
                  '&:focus-visible': { boxShadow: '0 0 0 2px rgba(59,130,246,.2)' },
                }}
                onClick={() => setShowAddModal(true)}
              >
                Add New User
              </Button>

            </div>
          </ToolbarWrapper>

          <Table>
            <thead>
              <tr>
                <TableHeader onClick={() => handleSort("name")}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    User
                    <SortArrows>
                      <Arrow className={sortField === "name" && sortOrder === "asc" ? "active" : ""}>
                        <FaChevronUp />
                      </Arrow>
                      <Arrow className={sortField === "name" && sortOrder === "desc" ? "active" : ""}>
                        <FaChevronDown />
                      </Arrow>
                    </SortArrows>
                  </div>
                </TableHeader>

                <TableHeader onClick={() => handleSort("role")}>
                  <div style={{ textAlign: "start" }}>Role</div>
                </TableHeader>

                <TableHeader style={{ textAlign: "center" }}>Actions</TableHeader>
              </tr>
            </thead>

            <tbody>
              {displayedUsers.map((user) => (
                <TableRow key={user.id} style={{ borderBottom: "1px solid #E0E0E0" }}>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar src={user.avatar} size={40}>
                        {user?.name?.[0]}
                      </Avatar>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 500 }}>{user.name}</span>
                        <span style={{ color: "gray", fontSize: "0.875rem" }}>
                          {user.email || ""}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{user.role}</TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    <Icon
                      onClick={() => {
                        setCurrentUser(user);
                        setShowModal(true);
                      }}
                    >
                      {/* edit icon */}
                      <svg
                        width="22"
                        height="23"
                        viewBox="0 0 22 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.25033 6.52612H5.50033C4.4878 6.52612 3.66699 7.34693 3.66699 8.35946V16.6095C3.66699 17.622 4.4878 18.4428 5.50033 18.4428H13.7503C14.7628 18.4428 15.5837 17.622 15.5837 16.6095V13.8595"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.25 13.8593H11L18.7917 6.06759C19.5511 5.3082 19.5511 4.07698 18.7917 3.31759C18.0323 2.5582 16.8011 2.5582 16.0417 3.31759L8.25 11.1093V13.8593"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.667 4.69263L17.417 7.44263"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Icon>

                    <Icon onClick={() => deleteUser(user.id)}>
                      {/* delete icon */}
                      <svg
                        width="22"
                        height="23"
                        viewBox="0 0 22 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.66699 6.52596H18.3337"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.16634 10.1926V15.6926"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.8333 10.1926V15.6926"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.58301 6.52612L5.49967 17.5261C5.49967 18.5386 6.32049 19.3595 7.33301 19.3595H14.6663C15.6789 19.3595 16.4997 18.5386 16.4997 17.5261L17.4163 6.52612"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.25 6.52604V3.77604C8.25 3.26978 8.66041 2.85938 9.16667 2.85938H12.8333C13.3396 2.85938 13.75 3.26978 13.75 3.77604V6.52604"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Icon>

                    <Icon>
                      {/* more icon */}
                      <svg
                        width="22"
                        height="23"
                        viewBox="0 0 22 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="10.9997"
                          cy="11.1093"
                          r="0.916667"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="10.9997"
                          cy="17.526"
                          r="0.916667"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <ellipse
                          cx="10.9997"
                          cy="4.69279"
                          rx="0.916667"
                          ry="0.916667"
                          stroke="#4B465C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Icon>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          {currentUser && showModal && (
            <EditUserModal
              user={currentUser}
              onSave={(updatedUser) => {
                editUser(updatedUser);
                setShowModal(false);
              }}
              onClose={() => setShowModal(false)}
            />
          )}

          {showAddModal && (
            <AddUserModal
              onSave={(form) => {
                const sequence = users.length + 1;
                const newUser = {
                  id: sequence,
                  name: form.name.trim(),
                  email: form.email.trim(),
                  role: form.role,
                  avatar: form.avatar || "",
                } as User;
                setUsers((prev) => [...prev, newUser]);
                setShowAddModal(false);
              }}
              onClose={() => setShowAddModal(false)}
            />
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "20px",
              flexWrap: "wrap",
            }}
          >
            <Description>
              Showing {displayedUsers.length} of {users.length} entries
            </Description>
            <Pagination
              marginTop="0.5rem"
              pageCount={pageCount}
              page={currentPage}          // optional (0-based)
              onChange={setCurrentPage}
            />

          </div>
        </div>
      )}
      {headerTab === "bm" && (
        <Box sx={{ border: "1px solid #ddd", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", p: 2.5, borderRadius: 2 }}>
          {/* KPIs */}
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: "rgba(0,48,227,0.12)" }}>
                    <Users size={20} color="#0030E3" />
                  </Box>
                  <Box>
                    <Box sx={{ fontSize: 12, color: "#6b7280" }}>Total Users</Box>
                    <Box sx={{ fontSize: 22, fontWeight: 700 }}>{users.length}</Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: "rgba(16,185,129,.12)" }}>
                    <ShieldCheck size={20} color="#10B981" />
                  </Box>
                  <Box>
                    <Box sx={{ fontSize: 12, color: "#6b7280" }}>Admins</Box>
                    <Box sx={{ fontSize: 22, fontWeight: 700 }}>
                      {users.filter(u => u.role === "Admin" || u.role === "Super Admin").length}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: "rgba(234,179,8,.12)" }}>
                    <TrendingUp size={20} color="#EAB308" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ fontSize: 12, color: "#6b7280" }}>Completion</Box>
                      <Box sx={{ fontSize: 12, color: "#6b7280" }}>78%</Box>
                    </Box>
                    <LinearProgress variant="determinate" value={78} sx={{ mt: 1, height: 8, borderRadius: 10 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Roles distribution + quick actions */}
          <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={7}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Box sx={{ fontWeight: 600 }}>Role Distribution</Box>
                    <Chip label="Live" color="primary" size="small" sx={{ bgcolor: "rgba(0,48,227,0.12)", color: "#0030E3" }} />
                  </Box>

                  {/* Simple stacked bar by role */}
                  {["Super Admin", "Admin", "Member"].map((role) => {
                    const count = users.filter((u) => u.role === role).length;
                    const pct = users.length ? Math.round((count / users.length) * 100) : 0;
                    return (
                      <Box key={role} sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Box sx={{ fontSize: 14, color: "#374151" }}>{role}</Box>
                          <Box sx={{ fontSize: 12, color: "#6b7280" }}>{count} users</Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 10,
                            borderRadius: 10,
                            "& .MuiLinearProgress-bar": { borderRadius: 10 },
                          }}
                        />
                      </Box>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card sx={{ borderRadius: 2, height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Clock4 size={18} />
                    <Box sx={{ fontWeight: 600 }}>Recent Activity</Box>
                  </Box>
                  <List dense sx={{ py: 0 }}>
                    <ListItem disableGutters>
                      <ListItemText
                        primary="Eric granted Admin access to Jane"
                        secondary="2 hours ago"
                        primaryTypographyProps={{ fontSize: 14 }}
                        secondaryTypographyProps={{ fontSize: 12 }}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem disableGutters>
                      <ListItemText
                        primary="New user added: David Kim"
                        secondary="Yesterday"
                        primaryTypographyProps={{ fontSize: 14 }}
                        secondaryTypographyProps={{ fontSize: 12 }}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem disableGutters>
                      <ListItemText
                        primary="Member role updated for 3 users"
                        secondary="2 days ago"
                        primaryTypographyProps={{ fontSize: 14 }}
                        secondaryTypographyProps={{ fontSize: 12 }}
                      />
                    </ListItem>
                  </List>

                  <Stack direction="row" spacing={1.25} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      disableElevation
                      sx={{
                        height: CONTROL_HEIGHT,
                        borderRadius: 1.5,
                        textTransform: "none",
                        px: 2,
                        background: "#0030E3",
                        color: "#fff",
                        "&:hover": { background: "#1e40af", color: "#fff" },
                      }}
                      onClick={() => setShowAddModal(true)}
                    >
                      Add User
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        height: CONTROL_HEIGHT,
                        borderRadius: 1.5,
                        textTransform: "none",
                        px: 2,
                      }}
                      onClick={() => setRoleFilter("")}
                    >
                      Reset Filters
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

    </Container>
  );
};

export default UserGrid;
