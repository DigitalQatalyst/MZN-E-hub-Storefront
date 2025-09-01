"use client";

import React from "react";
import Modal from "./Modal"; // assuming you already have a generic Modal
import { BaseInput, BaseSelect, Button } from "./styledComponents";

type EditableUser = { id: number; name: string; role: string; email: string; avatar?: string; };

interface EditUserModalProps {
    user: EditableUser;
    onSave: (user: EditableUser) => void;
    onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onSave, onClose }) => {
    const [editedUser, setEditedUser] = React.useState<EditableUser>(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    return (
        <Modal onClose={onClose}>
            <h2>Edit User</h2>
            <BaseInput
                name="name"
                value={editedUser.name}
                placeholder="User name"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
            />
            <BaseSelect
                name="role"
                value={editedUser.role}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
            >
                {["Super Admin", "Admin", "Member"].map((role) => (
                    <option key={role} value={role}>{role}</option>
                ))}
            </BaseSelect>
            <BaseInput
                name="email"
                value={editedUser.email}
                placeholder="Email"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
            />
            <BaseInput
                name="avatar"
                value={editedUser.avatar || ""}
                placeholder="Avatar URL (optional)"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <Button onClick={() => onSave(editedUser)}>Save</Button>
                <Button onClick={onClose}>Cancel</Button>
            </div>
        </Modal>
    );
};

export default EditUserModal;
