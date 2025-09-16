"use client";

import { useState, useEffect, useRef } from "react";
import {FocusTrap }  from "focus-trap-react";
import OnboardingForm from "../forms/onboardingForms"; // your onboarding form component

type OnboardingModalProps = {
  origin: string | null;
  onClose: () => void;
};

export default function OnboardingModal({ origin, onClose }: OnboardingModalProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scroll on unmount
      document.body.style.overflow = "";
    };
  }, []);

  // Prevent closing on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        // Do nothing or optionally show a message
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  // Prevent closing on outside click by stopping propagation
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Do nothing, so modal stays open
  };

  const handleSaveAndContinueLater = () => {
    setShowConfirm(true);
  };

  const handleConfirmChoice = (goToDashboard: boolean) => {
    setShowConfirm(false);
    if (goToDashboard) {
      window.location.href = "/dashboard";
    } else {
      onClose();
    }
  };
  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {/* Blur background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(5px)",
          zIndex: 999,
        }}
        onClick={handleBackdropClick}
      />

      {/* Modal container */}
      <FocusTrap
        focusTrapOptions={{
          clickOutsideDeactivates: false,
          escapeDeactivates: false,
          fallbackFocus: "#onboarding-modal",
        }}
      >
        <div>
        <div
            id="onboarding-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-modal-title"
            tabIndex={-1}
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                zIndex: 1000,
                width: "90%",
                maxWidth: 700,
                maxHeight: "90vh",
                overflowY: "auto",
                padding: 24,
            }}
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
        >
            <h2 id="onboarding-modal-title" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
                Onboarding Form
            </h2>
            <OnboardingForm
                onSaveAndContinueLater={handleSaveAndContinueLater}
                // pass other props as needed
            />
        </div>
      

      {/* Confirmation popup */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 3000,
            width: 320,
            padding: 24,
            textAlign: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
            <button
              aria-label="Close confirmation popup"
              onClick={handleCloseConfirm}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "transparent",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              &times;
            </button>

          <p style={{color: "black"}}>Do you want to be redirected to the dashboard or stay on this page?</p>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-around" }}>
            <button
              onClick={() => handleConfirmChoice(true)}
              style={{ padding: "8px 16px", backgroundColor: "#0047FF", color: "white", borderRadius: 6, border: "none", cursor: "pointer" }}
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => handleConfirmChoice(false)}
              style={{ padding: "8px 16px", backgroundColor: "#ccc", borderRadius: 6, border: "none", cursor: "pointer" }}
            >
              Stay Here
            </button>
          </div>
        </div>
      )}
      </div>
      </FocusTrap>
    </>
  );
}
