import React, { useState } from "react";
import { useModal } from "../contexts/ModalContext";
import Box from "./Box";
import Card from "./Card";
import Typography from "./Typography";
import Button from "./buttons/Button";
import Icon from "./icon/Icon";

const SignUpModal = () => {
  const { isOpen, close, modalType } = useModal();
  const [role, setRole] = useState("entrepreneur");

  if (!isOpen || modalType !== "signup") return null;

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: 420, borderRadius: 16, padding: 0, position: "relative", boxShadow: "0px 8px 32px rgba(0,0,0,0.12)" }}>
        {/* Gradient Header */}
        <Box
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #1DE9B6 0%, #1DC8E9 100%)",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: "24px 32px 20px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ color: "#fff", fontWeight: 600, fontSize: 22, margin: 0 }}>
            Let's Get Started
          </Typography>
          <span style={{ color: "#fff", fontSize: 24, cursor: "pointer" }} onClick={close}>&times;</span>
        </Box>
        {/* Modal Content */}
        <Box style={{ padding: "32px 32px 24px 32px" }}>
          <Typography style={{ fontWeight: 600, fontSize: 15, color: "#111827", marginBottom: 18, textAlign: "left" }}>
            I would like to join as a:
          </Typography>
          <Box style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            {/* Entrepreneur Option */}
            <Box
              style={{
                border: role === "entrepreneur" ? "2px solid #2563EB" : "1px solid #E5E7EB",
                borderRadius: 12,
                padding: 18,
                cursor: "pointer",
                background: role === "entrepreneur" ? "#F0F7FF" : "#fff",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                position: "relative",
              }}
              onClick={() => setRole("entrepreneur")}
            >
              <Icon color="primary" variant="medium">bags</Icon>
              <Box style={{ flex: 1 }}>
                <Typography style={{ fontWeight: 700, color: "#111827", fontSize: 16, marginBottom: 2, textAlign: "left" }}>
                  Entrepreneur
                </Typography>
                <Typography style={{ fontSize: 14, color: "#6B7280", textAlign: "left" }}>
                  Looking to access services, get licensed, find funding, and grow.
                </Typography>
              </Box>
              <span style={{ marginLeft: 12, marginTop: 2 }}>
                <input type="radio" checked={role === "entrepreneur"} readOnly style={{ accentColor: "#2563EB" }} />
              </span>
            </Box>
            {/* Partner Option */}
            <Box
              style={{
                border: role === "partner" ? "2px solid #2563EB" : "1px solid #E5E7EB",
                borderRadius: 12,
                padding: 18,
                cursor: "pointer",
                background: role === "partner" ? "#F0F7FF" : "#fff",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                position: "relative",
              }}
              onClick={() => setRole("partner")}
            >
              <Icon color="primary" variant="medium">handshake</Icon>
              <Box style={{ flex: 1 }}>
                <Typography style={{ fontWeight: 700, color: "#111827", fontSize: 16, marginBottom: 2, textAlign: "left" }}>
                  Partner
                </Typography>
                <Typography style={{ fontSize: 14, color: "#6B7280", textAlign: "left" }}>
                  Offering services to support businesses in setup, funding, or growth.
                </Typography>
              </Box>
              <span style={{ marginLeft: 12, marginTop: 2 }}>
                <input type="radio" checked={role === "partner"} readOnly style={{ accentColor: "#2563EB" }} />
              </span>
            </Box>
          </Box>
          <Button style={{ width: "100%", marginBottom: 0, height: 48, fontWeight: 600, fontSize: 16, background: "#2563EB" }} variant="contained" color="primary">
            Continue
          </Button>
        </Box>
        {/* Bottom Left Sign In */}
        <Box style={{ padding: "0 32px 24px 32px", display: "flex", justifyContent: "flex-start" }}>
          <Typography style={{ fontSize: 14, color: "#6B7280" }}>
            Already have an account?{' '}
            <span
              style={{ color: "#2563EB", cursor: "pointer", fontWeight: 600 }}
              onClick={() => {/* Add sign in logic here */}}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUpModal; 