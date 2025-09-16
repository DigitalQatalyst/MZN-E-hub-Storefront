"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Typography, { Paragraph } from "@component/Typography";

export default function Footer1() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer>
      {/* Main Footer Section */}
      <Box
        style={{
          background: "#0030E3",
          padding: "4rem 0 4rem 6rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            maxWidth: "1400px",
            width: "100%",
          }}
        >
          <Grid container spacing={8} alignItems="flex-start">
            {/* Left Section - Logo and Description */}
            <Grid item xs={12} lg={6}>
              <Box mb="2rem">
                <Box mb="2rem">
                  <img
                    src="/assets/images/tab_bar/Subtract.svg"
                    alt="MZN Enterprise Hub"
                    height="100%"
                    width="240rem"
                  />
                </Box>
                <Paragraph
                  color="rgba(255,255,255,0.8)"
                  fontSize="16px"
                  lineHeight="1.6"
                  mb="2rem"
                >
                  Stay updated with the latest business insights,
                  <br /> opportunities, and services from Enterprise Journey.
                </Paragraph>

                {/* Newsletter Subscription */}
                <form onSubmit={handleSubmit}>
                  <Box position="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "#FFF",
                        borderRadius: "8px",
                        padding: "14px 50px 14px 16px",
                        fontSize: "14px",
                        outline: "none",
                        transition: "all 0.2s ease",
                        backdropFilter: "blur(10px)",
                      }}
                      className="email-input"
                    />
                    <button
                      type="submit"
                      style={{
                        position: "absolute",
                        right: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "white",
                        color: "#4F46E5",
                        borderRadius: "6px",
                        border: "none",
                        padding: "10px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.02)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </Box>
                </form>
              </Box>
            </Grid>

            {/* Right Section - Three Columns */}
            <Grid item xs={12} lg={6}>
              <Grid container spacing={6}>
                {/* Get to Know Us */}
                <Grid item xs={12} sm={6} lg={4}>
                  <Typography
                    mb="1.5rem"
                    fontSize="14px"
                    fontWeight="500"
                    color="white"
                    lineHeight="1.2"
                  >
                    Get to Know Us
                  </Typography>
                  <div>
                    {[
                      { name: "About Enterprise Journey", url: "/about" },
                      { name: "Help Centre", url: "/help" },
                      { name: "Discover AbuDhabi", url: "/discover" },
                      { name: "Privacy Policy", url: "/privacy" },
                      { name: "Terms of Service", url: "/terms" },
                    ].map((link, index) => (
                      <Box key={index} mb="0.75rem">
                        <Link
                          href={link.url}
                          style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "14px",
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                            display: "block",
                          }}
                        >
                          {link.name}
                        </Link>
                      </Box>
                    ))}
                  </div>
                </Grid>

                {/* For You */}
                <Grid item xs={12} sm={6} lg={4}>
                  <Typography
                    mb="1.5rem"
                    fontSize="14px"
                    fontWeight="500"
                    color="white"
                    lineHeight="1.2"
                  >
                    For You
                  </Typography>
                  <div>
                    {[
                      { name: "Financial Services", url: "/financial" },
                      { name: "Non-financial Services", url: "/non-financial" },
                      { name: "Community", url: "/community" },
                      { name: "Media Centre", url: "/media" },
                      { name: "Become a Partner", url: "/partner" },
                    ].map((link, index) => (
                      <Box key={index} mb="0.75rem">
                        <Link
                          href={link.url}
                          style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "14px",
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                            display: "block",
                          }}
                        >
                          {link.name}
                        </Link>
                      </Box>
                    ))}
                  </div>
                </Grid>

                {/* Find Us */}
                <Grid item xs={12} sm={6} lg={4}>
                  <Typography
                    mb="1.5rem"
                    fontSize="14px"
                    fontWeight="500"
                    color="white"
                    lineHeight="1.2"
                  >
                    Find Us
                  </Typography>
                  <div>
                    {[
                      { name: "LinkedIn", url: "https://linkedin.com" },
                      { name: "Facebook", url: "https://facebook.com" },
                      { name: "YouTube", url: "https://youtube.com" },
                    ].map((link, index) => (
                      <Box key={index} mb="0.75rem">
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "14px",
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {link.name}
                          <span style={{ fontSize: "12px", opacity: 0.8 }}>
                            ↗
                          </span>
                        </Link>
                      </Box>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Box>

      {/* Divider */}
      <Box
        style={{
          background: "#0030E3",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            maxWidth: "1400px",
            padding: "0 5.5rem",
            width: "100%",
          }}
        >
          <hr
            style={{
              border: "none",
              borderTop: "4px solid rgb(75, 111, 241)",
              width: "100%",
              margin: 0,
            }}
          />
        </div>
      </Box>

      {/* Bottom Section */}
      <Box
        style={{
          background: "#0030E3",
          padding: "1.5rem 0 1.5rem 6rem",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            maxWidth: "1400px",
            width: "100%",
          }}
        >
          <Typography color="#D3D4DC" fontWeight={400} fontSize="14px">
            © 2025 Enterprise Journey. All rights reserved.
          </Typography>
        </div>
      </Box>

      {/* CSS for placeholder styling */}
      <style jsx>{`
        .email-input::placeholder {
          color: rgba(255, 255, 255, 0.8) !important;
          opacity: 1;
        }
        .email-input::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        .email-input::-moz-placeholder {
          color: rgba(255, 255, 255, 0.8) !important;
          opacity: 1;
        }
        .email-input:-ms-input-placeholder {
          color: rgba(255, 255, 255, 0.8) !important;
        }
      `}</style>
    </footer>
  );
}
