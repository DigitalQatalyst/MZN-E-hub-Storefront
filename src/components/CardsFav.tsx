"use client"; // Ensures the component runs only client-side

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string; // Unique slug for dynamic routing
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  slug,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <Link href={`/service-details/${slug}`} style={styles.viewDetailsLink}>
        View Details →
      </Link>
      <button style={styles.enterpriseButton}>Enterprise</button>
    </div>
  );
};

const ServiceCards: React.FC = () => {
  const services = [
    {
      title: "Request For Funding",
      description: "Apply for financial services for SMEs.",
      slug: "request-for-funding",
    },
    {
      title: "SME Loan Reallocation",
      description: "Reallocate loan funds to different business areas.",
      slug: "sme-loan-reallocation",
    },
    {
      title: "Loan Amendment Service",
      description: "Amend existing loans with Khalifa Fund.",
      slug: "loan-amendment-service",
    },
    {
      title: "SME Loan Disbursement",
      description: "Disburse loans to approved SMEs.",
      slug: "sme-loan-disbursement",
    },
    {
      title: "SME Operating Capital Financing",
      description: "Financing for day-to-day operations.",
      slug: "sme-operating-capital-financing",
    },
    {
      title: "Vehicle & Logistics Asset Financing",
      description: "Financing for vehicles and logistics equipment.",
      slug: "vehicle-logistics-asset-financing",
    },
    {
      title: "Equipment & Machinery Financing",
      description: "Financing for purchasing business-related machinery.",
      slug: "equipment-machinery-financing",
    },
    {
      title: "Accounts Receivable Financing",
      description: "Financing by securing invoices to boost cash flow.",
      slug: "accounts-receivable-financing",
    },
    {
      title: "Advance Payment Guarantee Service",
      description: "Provides financial guarantees to suppliers.",
      slug: "advance-payment-guarantee-service",
    },
    {
      title: "Khalifa Fund Membership Subscription",
      description: "Exclusive access to funding and business resources.",
      slug: "khalifa-fund-membership-subscription",
    },
    {
      title: "Official Support Letter Issuance",
      description: "Provide entrepreneurs with support letters.",
      slug: "official-support-letter-issuance",
    },
    {
      title: "Entrepreneur Consultation Booking",
      description: "Schedule a consultation with business experts.",
      slug: "entrepreneur-consultation-booking",
    },
    {
      title: "Entrepreneurship Growth Program",
      description: "Training programs for entrepreneurs.",
      slug: "entrepreneurship-growth-program",
    },
    {
      title: "SME Champion Registration",
      description: "Register for SME Champion activities.",
      slug: "sme-champion-registration",
    },
    {
      title: "Business Event Sign-Up",
      description: "Sign-up for business growth and networking events.",
      slug: "business-event-sign-up",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.cardsContainer}>
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "24px 8px", background: "#FFF", position: "relative" },
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
  viewDetailsLink: {
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
    fontWeight: 400,
    cursor: "pointer",
  },
};

export default ServiceCards;
