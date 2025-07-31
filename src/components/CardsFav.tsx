"use client";

import React, { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  detailsLink: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  detailsLink,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={styles.serviceCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <img
          src="/assets/images/banners/logo.png"
          alt="Khalifa Fund"
          style={{ height: 20, marginBottom: 6 }}
        />
        <h3 style={{ ...styles.title, color: "#002180" }}>{title}</h3>
        <p style={{ ...styles.subtitle, color: "#808390" }}>by Khalifa Fund</p>
        <p style={{ ...styles.description, color: "#000000" }}>{description}</p>
      </div>
      {isHovered && (
        <img
          src="/images/bookmark.png" // Correct relative path for assets in the public folder
          alt="Bookmark"
          style={styles.bookmarkIcon}
        />
      )}
      <a href={detailsLink} style={styles.viewDetails}>
        View Details →
      </a>
      <button style={styles.enterpriseButton}>Enterprise</button>{" "}
      {/* Enterprise button added */}
    </div>
  );
};

const ServiceCards: React.FC = () => {
  const services = [
    {
      title: "Khalifa Fund Membership Subscription",
      description:
        "Offers a subscription to Khalifa Fund's membership for exclusive access for funding and business resources.",
      detailsLink: "#",
    },
    {
      title: "Official Support Letter Issuance",
      description:
        "Provide entrepreneurs with official support letters for business sponsorship or visa purposes.",
      detailsLink: "#",
    },
    {
      title: "Entrepreneur Consultation Booking",
      description:
        "Allows entrepreneurs to schedule a consultation with experts to gain assistance on business matters.",
      detailsLink: "#",
    },
    {
      title: "Entrepreneurship Growth Program",
      description:
        "Provides structured training programs to equip entrepreneurs with essential business skills.",
      detailsLink: "#",
    },
    {
      title: "SME Champion Registration",
      description:
        "This service allows SMEs to register and gain access to support for SME Champion activities.",
      detailsLink: "#",
    },
    {
      title: "Business Event Sign-Up",
      description:
        "A direct access service to sign-up for events related to business growth and networking.",
      detailsLink: "#",
    },
    {
      title: "Business Licensing Registration Service",
      description:
        "Assists clients with the registration process and helps obtain the necessary licenses to operate their businesses.",
      detailsLink: "#",
    },
    {
      title: "Mentorship & Advisory Service",
      description:
        "Facilitates mentorship connections between SMEs and experts, offering guidance on business development.",
      detailsLink: "#",
    },
    {
      title: "SME Training Sign-Up",
      description:
        "Enables SMEs to sign up for relevant training programs to enhance their business skills.",
      detailsLink: "#",
    },
    {
      title: "Entrepreneurship Growth Program",
      description:
        "Provides structured training programs to equip entrepreneurs with essential business skills.",
      detailsLink: "#",
    },
    {
      title: "SME Champion Registration",
      description:
        "This service allows SMEs to register and gain access to the SME Champion platform.",
      detailsLink: "#",
    },
    {
      title: "Business Event Sign-Up",
      description:
        "Allows users/SMEs to easily register for business events listed in the EJP platform.",
      detailsLink: "#",
    },
    {
      title: "Business Licensing Registration Service",
      description:
        "Assists SMEs with the registration process and helps obtain the necessary licenses to operate their businesses.",
      detailsLink: "#",
    },
    {
      title: "Mentorship & Advisory Service",
      description:
        "Facilitates direct connection between SMEs and mentors, consultants, or strategic stakeholders who assist in business growth.",
      detailsLink: "#",
    },
    {
      title: "SME Training Sign-Up",
      description:
        "Enables SMEs to register for specific training events, providing them with opportunities to attend group trainings.",
      detailsLink: "#",
    },
  ];

  return (
    <div style={styles.container}>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          detailsLink={service.detailsLink}
        />
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 325px)",
    gap: "24px",
    padding: "24px 8px",
    justifyContent: "center",
    background: "#FFF",
  },
  serviceCard: {
    width: "325px",
    height: "248px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    padding: "12px 16px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
    position: "relative", // Important for the bookmark icon
    overflow: "hidden",
  },
  title: {
    fontSize: "16px",
    fontWeight: 600,
    margin: "4px 0",
    color: "#1a1a1a",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "12px",
    color: "#808390", // Updated color for subtitle to #808390
    marginBottom: "4px",
  },
  description: {
    fontSize: "12px",
    color: "#000000", // Updated color for description to black
    marginBottom: "8px",
    lineHeight: "1.4",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
  viewDetails: {
    fontSize: "13px",
    color: "#0056d2",
    fontWeight: 600,
    textDecoration: "none",
    position: "absolute",
    right: "16px",
    bottom: "16px",
  },
  bookmarkIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "24px",
    height: "24px",
    opacity: 0.7,
  },
  enterpriseButton: {
    position: "absolute",
    left: "16px",
    bottom: "16px",
    backgroundColor: "white", // White background
    color: "#808390", // Text color #808390
    border: "1px solid #808390", // Border color #808390
    borderRadius: "4px",
    padding: "6px 12px",
    fontSize: "10px", // Font size set to 10px
    fontFamily: "var(--Body-Small-Font, Roboto)", // Font family set to Roboto
    fontWeight: 400, // Font weight set to 400
    lineHeight: "16px", // Line height set to 16px (160%)
    letterSpacing: "0.4px", // Letter spacing set to 0.4px
    textAlign: "center", // Center aligned text
    cursor: "pointer",
  },
};

export default ServiceCards;
