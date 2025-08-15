// // pages/customer-dashboard/profile/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@component/pagination";
import { Title, Button, Description, ToolbarWrapper, BaseSelect, BaseInput, TableHeader, Table, TableRow, TableCell, Container, Icon, Arrow, SortArrows, HeaderRow, Pill, Heading } from './styledComponents';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { userData } from './constants';
import Avatar from "@component/avatar";
type User = { id: number; name: string; email: string; role: string; avatar: string };
const UserGrid = () => {
  const [users, setUsers] = useState<User[]>(userData as User[]);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sortField, setSortField] = useState<"name" | "role" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query);
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField].toLowerCase();
    const valB = b[sortField].toLowerCase();
    return valA < valB ? (sortOrder === "asc" ? -1 : 1) : valA > valB ? (sortOrder === "asc" ? 1 : -1) : 0;
  });

  const pageCount = Math.ceil(sortedUsers.length / pageSize);

  useEffect(() => {
    if (currentPage >= pageCount) setCurrentPage(0);
  }, [pageCount]);

  const displayedUsers = sortedUsers.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0); // reset to first page
  };
  const addUser = () => {
    const sequence = users.length + 1;
    const name = `New User ${sequence}`;
    const email = `user${sequence}@example.com`;
    const newUser: User = {
      id: sequence,
      name,
      role: "Member",
      email,
      avatar: "",
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const editUser = (updatedUser: { id: number; name: string; role: string; email?: string; avatar?: string }) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user))
    );
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
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
      <HeaderRow>
        <Pill>Role List</Pill>
        <Heading>Business Management</Heading>
      </HeaderRow>
    <div style={{ border: "1px solid #ddd", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <ToolbarWrapper>
        <BaseSelect
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {[10, 20, 30, 40, 50].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </BaseSelect>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <BaseInput
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}
          />
          <BaseSelect
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(0); }}
          >
            {["All", "Super Admin", "Admin", "Content Admin", "Curator", "Member", "Editor", "Viewer"].map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </BaseSelect>
          <Button onClick={() => setShowAddModal(true)}>Add New User</Button>
        </div>
      </ToolbarWrapper>

      <Table>
        <thead>
          <tr>
            <TableHeader onClick={() => handleSort('name')}>
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "0.5rem" }}>
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

            <TableHeader onClick={() => handleSort('role')}>
              <div style={{ textAlign: "start" }}>
                Role
               
              </div>
            </TableHeader>

            <TableHeader style={{ textAlign: "center" }}>Actions</TableHeader>

          </tr>
        </thead>
        <tbody>
          {displayedUsers
            .map((user) => (
              <TableRow key={user.id} style={{ borderBottom: "1px solid #E0E0E0" }}>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Avatar src={user.avatar} size={40}>
                      {user?.name?.[0]}
                    </Avatar>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 500 }}>{user.name}</span>
                      <span style={{ color: "gray", fontSize: "0.875rem" }}>{user.email || ""}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Icon onClick={() => { setCurrentUser(user); setShowModal(true); }}>
                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.25033 6.52612H5.50033C4.4878 6.52612 3.66699 7.34693 3.66699 8.35946V16.6095C3.66699 17.622 4.4878 18.4428 5.50033 18.4428H13.7503C14.7628 18.4428 15.5837 17.622 15.5837 16.6095V13.8595" stroke="#4B465C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.25033 6.52612H5.50033C4.4878 6.52612 3.66699 7.34693 3.66699 8.35946V16.6095C3.66699 17.622 4.4878 18.4428 5.50033 18.4428H13.7503C14.7628 18.4428 15.5837 17.622 15.5837 16.6095V13.8595" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.25 13.8593H11L18.7917 6.06759C19.5511 5.3082 19.5511 4.07698 18.7917 3.31759C18.0323 2.5582 16.8011 2.5582 16.0417 3.31759L8.25 11.1093V13.8593" stroke="#4B465C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.25 13.8593H11L18.7917 6.06759C19.5511 5.3082 19.5511 4.07698 18.7917 3.31759C18.0323 2.5582 16.8011 2.5582 16.0417 3.31759L8.25 11.1093V13.8593" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.667 4.69263L17.417 7.44263" stroke="#4B465C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.667 4.69263L17.417 7.44263" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Icon>
                  <Icon onClick={() => deleteUser(user.id)}>
                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.66699 6.52596H18.3337" stroke="#4B465C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3.66699 6.52596H18.3337" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.16634 10.1926V15.6926" stroke="#4B465C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.16634 10.1926V15.6926" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12.8333 10.1926V15.6926" stroke="#4B465C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12.8333 10.1926V15.6926" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.58301 6.52612L5.49967 17.5261C5.49967 18.5386 6.32049 19.3595 7.33301 19.3595H14.6663C15.6789 19.3595 16.4997 18.5386 16.4997 17.5261L17.4163 6.52612" stroke="#4B465C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.58301 6.52612L5.49967 17.5261C5.49967 18.5386 6.32049 19.3595 7.33301 19.3595H14.6663C15.6789 19.3595 16.4997 18.5386 16.4997 17.5261L17.4163 6.52612" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.25 6.52604V3.77604C8.25 3.26978 8.66041 2.85938 9.16667 2.85938H12.8333C13.3396 2.85938 13.75 3.26978 13.75 3.77604V6.52604" stroke="#4B465C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.25 6.52604V3.77604C8.25 3.26978 8.66041 2.85938 9.16667 2.85938H12.8333C13.3396 2.85938 13.75 3.26978 13.75 3.77604V6.52604" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Icon>
                  <Icon>
                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10.9997" cy="11.1093" r="0.916667" stroke="#4B465C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="10.9997" cy="11.1093" r="0.916667" stroke="white" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="10.9997" cy="17.526" r="0.916667" stroke="#4B465C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="10.9997" cy="17.526" r="0.916667" stroke="white" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <ellipse cx="10.9997" cy="4.69279" rx="0.916667" ry="0.916667" stroke="#4B465C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <ellipse cx="10.9997" cy="4.69279" rx="0.916667" ry="0.916667" stroke="white" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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

      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <Description>
          Showing {displayedUsers.length} of {users.length} entries
        </Description>
        <Pagination marginTop="2.5rem" pageCount={pageCount} onChange={setCurrentPage} />
      </div>
    </div>
    </Container>
  );
};

export default UserGrid;
