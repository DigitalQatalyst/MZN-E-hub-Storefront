"use client";

import React from "react";
import Modal from "./Modal";
import { BaseInput, BaseSelect, Button } from "./styledComponents";

type AddUserForm = {
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

interface AddUserModalProps {
  onSave: (user: AddUserForm) => void;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onSave, onClose }) => {
  const [form, setForm] = React.useState<AddUserForm>({
    name: "",
    email: "",
    role: "Member",
    avatar: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const canSave = form.name.trim() && form.email.trim();

  return (
    <Modal onClose={onClose}>
      <h2>Add User</h2>
      <BaseInput
        name="name"
        value={form.name}
        placeholder="Full name"
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <BaseInput
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <BaseSelect
        name="role"
        value={form.role}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        {["Super Admin", "Admin", "Content Admin", "Curator", "Member", "Editor", "Viewer"].map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </BaseSelect>
      <BaseInput
        name="avatar"
        value={form.avatar}
        placeholder="Avatar URL (optional)"
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button disabled={!canSave} onClick={() => canSave && onSave(form)}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default AddUserModal;

