import React, { useState } from "react";
import { useModal } from "../contexts/ModalContext";
import Box from "./Box";
import Card from "./Card";
import Typography from "./Typography";
import Button from "./buttons/Button";
import Icon from "./icon/Icon";

const SignInModal = () => {
  const { isOpen, close, modalType, open } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen || modalType !== "signin") return null;

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
      <Card style={{ width: 420, minHeight: 520, borderRadius: 16, padding: 0, position: "relative", boxShadow: "0px 8px 32px rgba(0,0,0,0.12)" }}>
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
            Sign In to Continue
          </Typography>
          <span style={{ color: "#fff", fontSize: 24, cursor: "pointer" }} onClick={close}>&times;</span>
        </Box>
        {/* Modal Content */}
        <Box style={{ padding: "32px 32px 0 32px" }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              fontSize: 15,
              marginBottom: 18,
              outline: "none",
              background: "#F9FAFB"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              fontSize: 15,
              marginBottom: 22,
              outline: "none",
              background: "#F9FAFB"
            }}
          />
          <Button style={{ width: "100%", height: 44, fontWeight: 600, fontSize: 16, background: "#2563EB", marginBottom: 18 }} variant="contained" color="primary">
            Sign in with email
          </Button>
          <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <Typography style={{ fontSize: 14, color: "#2563EB", fontWeight: 500, cursor: "pointer" }}>
              Forgot password?
            </Typography>
            <Typography style={{ fontSize: 14, color: "#6B7280" }}>
              Don't have an account?{' '}
              <span style={{ color: "#2563EB", fontWeight: 600, cursor: "pointer" }} onClick={() => open("signup")}>Sign Up</span>
            </Typography>
          </Box>
          <Box style={{ display: "flex", alignItems: "center", margin: "18px 0 18px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
            <Typography style={{ margin: "0 16px", color: "#6B7280", fontSize: 14 }}>or</Typography>
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
          </Box>
          <Button
            style={{
              width: "100%",
              height: 48,
              fontWeight: 600,
              fontSize: 16,
              background: "#fff",
              color: "#2563EB",
              border: "1.5px solid #2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10
            }}
            variant="outlined"
            color="primary"
          >
            <Icon variant="small">fingerprint</Icon>
            Sign in with UAE Pass
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default SignInModal; 