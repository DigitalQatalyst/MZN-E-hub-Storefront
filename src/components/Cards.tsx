import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  detailsLink: string;
  rating: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  detailsLink,
  rating,
}) => {
  return (
    <div style={styles.serviceCard}>
      <div>
        <img
          src="/assets/images/banners/logo.png"
          alt="Khalifa Fund"
          style={{ height: 20, marginBottom: 6 }}
        />
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>by Khalifa Fund</p>
        <div style={styles.rating}>{"⭐".repeat(rating)}</div>
        <p style={styles.description}>{description}</p>
      </div>
      <a href={detailsLink} style={styles.viewDetails}>
        View Details →
      </a>
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
      rating: 4,
    },
    {
      title: "Official Support Letter Issuance",
      description:
        "Provide entrepreneurs with official support letters for business sponsorship or visa purposes.",
      detailsLink: "#",
      rating: 4,
    },
    {
      title: "Entrepreneur Consultation Booking",
      description:
        "Allows entrepreneurs to schedule a consultation with experts to gain assistance on business matters.",
      detailsLink: "#",
      rating: 4,
    },
    {
      title: "Entrepreneurship Growth Program",
      description:
        "Provides structured training programs to equip entrepreneurs with essential business skills.",
      detailsLink: "#",
      rating: 4,
    },
    {
      title: "SME Champion Registration",
      description:
        "This service allows SMEs to register and gain access to support for SME Champion activities.",
      detailsLink: "#",
      rating: 4,
    },
    {
      title: "Business Event Sign-Up",
      description:
        "A direct access service to sign-up for events related to business growth and networking.",
      detailsLink: "#",
      rating: 4,
    },
    {
      title: "Business Licensing Registration Service",
      description:
        "Assists clients with the registration process and helps obtain the necessary licenses to operate their businesses.",
      detailsLink: "#",
      rating: 4,
    },
    {
      title: "Mentorship & Advisory Service",
      description:
        "Facilitates mentorship connections between SMEs and experts, offering guidance on business development.",
      detailsLink: "#",
      rating: 4,
    },
    {
      title: "SME Training Sign-Up",
      description:
        "Enables SMEs to sign up for relevant training programs to enhance their business skills.",
      detailsLink: "#",
      rating: 4,
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
          rating={service.rating}
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
    borderRadius: "8px",
    background: "var(--KF-BG-White, #FFF)",
    boxShadow:
      "0 1px 2px 0 rgba(0, 0, 0, 0.30), 0 1px 3px 1px rgba(0, 0, 0, 0.15)",
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
  },
  title: {
    fontSize: "14px",
    fontWeight: 600,
    margin: "4px 0",
    color: "#1a1a1a",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "12px",
    color: "#777",
    marginBottom: "4px",
  },
  rating: {
    fontSize: "12px",
    color: "#f5c518",
    marginBottom: "6px",
  },
  description: {
    fontSize: "12px",
    color: "#444",
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
    alignSelf: "flex-start",
  },
};

export default ServiceCards;
