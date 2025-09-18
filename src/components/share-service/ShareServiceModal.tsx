import React, { useState } from "react";
import "./ServiceShareModal.css";
import { FiFacebook, FiTwitter, FiX } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

const ServiceShareModal = ({ isOpen, onClose, serviceUrl }) => {
  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(serviceUrl);
  };

  const shareOnPlatform = (platform) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          serviceUrl
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          serviceUrl
        )}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          serviceUrl
        )}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(serviceUrl)}`;
        break;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Share this service</h2>
        <div className="link-section">
          <input type="text" value={serviceUrl} readOnly />
          <button className="copy-button" onClick={handleCopyLink}>
            Copy Link
          </button>
        </div>
        <h4 className="share-via-title">Share via</h4>
        <div className="share-via">
          <button
            className="social-button"
            onClick={() => shareOnPlatform("facebook")}
          >
            <FiFacebook color="#3b5998" />
            <span className="social-icon-label">Facebook</span>
          </button>
          <button
            className="social-button"
            onClick={() => shareOnPlatform("twitter")}
          >
            <FaXTwitter />
            <span className="social-icon-label">Twitter</span>
          </button>
          <button
            className="social-button"
            onClick={() => shareOnPlatform("linkedin")}
          >
            <FaLinkedin color="blue" />
            <span className="social-icon-label">LinkedIn</span>
          </button>
          <button
            className="social-button"
            onClick={() => shareOnPlatform("whatsapp")}
          >
            <FaWhatsapp color="green" />
            <span className="social-icon-label">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceShareModal;
