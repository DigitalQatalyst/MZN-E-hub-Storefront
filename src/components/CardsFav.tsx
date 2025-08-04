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
      style={{
        ...styles.serviceCard,
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered ? "0px 4px 20px rgba(0, 0, 0, 0.1)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <img
          src="/assets/images/banners/logo.png"
          alt="Khalifa Fund"
          style={styles.cardLogo}
        />
        <h3 style={{ ...styles.title, color: "#002180" }}>{title}</h3>
        <p style={{ ...styles.subtitle, color: "#808390" }}>by Khalifa Fund</p>
        <p style={{ ...styles.description, color: "#000000" }}>{description}</p>
      </div>
      {isHovered && (
        <img
          src="/images/bookmark.png"
          alt="Bookmark"
          style={styles.bookmarkIcon}
        />
      )}
      <a href={detailsLink} style={styles.viewDetails}>
        View Details →
      </a>
      <button style={styles.enterpriseButton}>Enterprise</button>
    </div>
  );
};

const ServiceCards: React.FC = () => {
  const services = [
    {
      title: "Request For Funding",
      description:
        "Through this service, you can apply for financial services for SMEs in a new package of financing.",
      detailsLink: "#",
    },
    {
      title: "SME Loan Reallocation",
      description:
        "Provides the option for SMEs to reallocate loan funds to different areas of their business.",
      detailsLink: "#",
    },
    {
      title: "Loan Amendment Service",
      description:
        "Allows SMEs to amend the terms or details of their existing loans with Khalifa Fund.",
      detailsLink: "#",
    },
    {
      title: "SME Loan Disbursement",
      description:
        "Disburses loans to SMEs once their funding application has been approved.",
      detailsLink: "#",
    },
    {
      title: "SME Operating Capital Financing",
      description:
        "Provides financing for working capital to support day-to-day business operations.",
      detailsLink: "#",
    },
    {
      title: "Vehicle & Logistics Asset Financing",
      description:
        "Offers financing options for purchasing vehicles and logistics equipment.",
      detailsLink: "#",
    },
    {
      title: "Equipment & Machinery Financing",
      description:
        "Provides financing options for purchasing business-related machinery.",
      detailsLink: "#",
    },
    {
      title: "Accounts Receivable Financing",
      description:
        "Provides financing for businesses by securing invoices to boost cash flow.",
      detailsLink: "#",
    },
    {
      title: "Advance Payment Guarantee Service",
      description:
        "Provides financial guarantees to suppliers, ensuring secured transactions for businesses.",
      detailsLink: "#",
    },
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
  ];

  return (
    <div style={styles.container}>
      <div style={styles.cardsContainer}>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            detailsLink={service.detailsLink}
          />
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "24px 8px",
    background: "#FFF",
    position: "relative",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 325px)",
    gap: "24px",
    justifyContent: "center",
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
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  cardLogo: {
    width: "63px",
    height: "63px",
    flexShrink: 0,
    aspectRatio: "1/1",
  },
  title: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1a1a1a",
    marginTop: "2px",
    marginBottom: "0px",
  },
  subtitle: {
    fontSize: "12px",
    color: "#808390",
    marginTop: "0px",
    marginBottom: "28px",
  },
  description: {
    fontSize: "12px",
    color: "#000000",
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
    backgroundColor: "white",
    color: "#808390",
    border: "1px solid #808390",
    borderRadius: "4px",
    padding: "6px 12px",
    fontSize: "10px",
    fontFamily: "var(--Body-Small-Font, Roboto)",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "0.4px",
    textAlign: "center",
    cursor: "pointer",
  },
};

export default ServiceCards;
