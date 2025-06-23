import React, { useState } from "react";
import { useModal } from "../contexts/ModalContext";
import Box from "./Box";
import Card from "./Card";
import Typography from "./Typography";
import Button from "./buttons/Button";
import Icon from "./icon/Icon";

const SignUpModal = () => {
  const { isOpen, close, modalType, open } = useModal();
  const [role, setRole] = useState("entrepreneur");
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        {/* Step 1: Role Selection */}
        {step === 1 && (
          <Box style={{ padding: "32px 32px 0 32px" }}>
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
            <Button
              style={{ width: "100%", height: 48, fontWeight: 600, fontSize: 16, background: role === "entrepreneur" ? "#0057FF" : "#E5E7EB", color: "#fff", marginBottom: 0, cursor: role === "entrepreneur" ? "pointer" : "not-allowed" }}
              variant="contained"
              color="#0030E3"
              disabled={role !== "entrepreneur"}
              onClick={() => role === "entrepreneur" && setStep(2)}
            >
              Sign up
            </Button>
            <Box style={{ padding: "0 0 24px 0", display: "flex", justifyContent: "flex-start" }}>
              <Typography style={{ fontSize: 14, color: "#000" }}>
                Already have an account?{' '}
                <span
                  style={{ color: "#002180", cursor: "pointer", fontWeight: 600 }}
                  onClick={() => open("signin")}
                >
                  Sign In
                </span>
              </Typography>
            </Box>
          </Box>
        )}
        {/* Step 2: Sign Up Form */}
        {step === 2 && (
          <Box style={{ padding: "32px 32px 0 32px" }}>
            <Typography style={{ fontWeight: 600, fontSize: 15, color: "#111827", marginBottom: 18, textAlign: "left" }}>
              Sign up as Entrepreneur
            </Typography>
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                fontSize: 15,
                marginBottom: 16,
                outline: "none",
                background: "#F9FAFB"
              }}
            />
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
                marginBottom: 16,
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
                marginBottom: 16,
                outline: "none",
                background: "#F9FAFB"
              }}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                fontSize: 15,
                marginBottom: 24,
                outline: "none",
                background: "#F9FAFB"
              }}
            />
            <Button style={{ width: "100%", height: 48, fontWeight: 600, fontSize: 16, background: "#0057FF", color: "#fff", marginBottom: 0 }} variant="contained" color="primary">
              Sign up
            </Button>
            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, marginBottom: 24 }}>
              <Button variant="text" style={{ color: "#002180", fontWeight: 600, padding: 0 }} onClick={() => setStep(1)}>
                Back
              </Button>
              <Typography style={{ fontSize: 14, color: "#6B7280" }}>
                Already have an account?{' '}
                <span
                  style={{ color: "#002180", cursor: "pointer", fontWeight: 600 }}
                  onClick={() => open("signin")}
                >
                  Sign In
                </span>
              </Typography>
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default SignUpModal; 