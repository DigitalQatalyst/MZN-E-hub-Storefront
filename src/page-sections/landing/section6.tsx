"use client";

import NextImage from "next/image";
import styled from "styled-components";
import { H1, H3, H4 } from "@component/Typography";

// STYLED COMPONENTS
const HeroSection = styled.section`
  background: linear-gradient(135deg, #67b3e3, #2b77d1); // gradient similar to design
  padding: 4rem 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
  text-align: center;
`;

const CTASection = styled.section`
  background-color: white;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const Card = styled.div`
  background-color: #f1f1f1;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
`;

const WelcomeSection = styled.section`
  background-color: #1a3c63;
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const HeroImage = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
`;

export default function HomePage() {
    return (
        <div>
            {/* Hero Section */}
            <HeroSection>
                <H1 fontSize="48px" fontWeight="700" mb="1.5rem">
                    Turnkey Business Accelerator
                </H1>
                <H3 fontSize="20px" fontWeight="400" mb="2rem">
                    How can we help?
                </H3>
                <input
                    type="text"
                    placeholder="Ask MZN AI"
                    style={{
                        padding: "1rem",
                        fontSize: "16px",
                        borderRadius: "30px",
                        border: "none",
                        width: "300px",
                        marginBottom: "2rem",
                    }}
                />
                {/* Inline Button */}
                <button
                    style={{
                        padding: "1rem 2rem",
                        backgroundColor: "#3498db", // Blue background
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "600",
                        borderRadius: "30px", // Rounded edges
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                        const button = e.target as HTMLButtonElement; // Type assertion
                        button.style.backgroundColor = "#2980b9"; // Darker blue on hover
                    }}
                    onMouseOut={(e) => {
                        const button = e.target as HTMLButtonElement; // Type assertion
                        button.style.backgroundColor = "#3498db"; // Reset to original blue
                    }}
                >
                    Ask MZN AI
                </button>

                {/* Hero Images */}
                <HeroImage>
                    <NextImage
                        width={150}
                        height={200}
                        alt="Male Avatar"
                        src="/images/mr.png"
                    />
                    <NextImage
                        width={150}
                        height={200}
                        alt="Female Avatar"
                        src="/images/mdm.png"
                    />
                </HeroImage>
            </HeroSection>

            {/* CTA Section */}
            <CTASection>
                <Card>
                    <H4 fontSize="18px" fontWeight="700" mb="1rem">
                        Grow Faster
                    </H4>
                    <p>Scale with speed</p>
                </Card>
                <Card>
                    <H4 fontSize="18px" fontWeight="700" mb="1rem">
                        Grow Smarter
                    </H4>
                    <p>Maximize resources wisely</p>
                </Card>
                <Card>
                    <H4 fontSize="18px" fontWeight="700" mb="1rem">
                        Every Little Help
                    </H4>
                    <p>Support when it counts</p>
                </Card>
            </CTASection>

            {/* Welcome Section */}
            <WelcomeSection>
                <H3 fontSize="28px" fontWeight="700" mb="2rem">
                    Welcome to MZN Enterprise Hub
                </H3>
                <p>Supporting your business needs</p>
                <p>
                    Abu Dhabi’s premier platform dedicated to empowering Emirati businesses. We understand the challenges you face as entrepreneurs, and we’re here to provide the tools, resources, and guidance you need to thrive in today’s dynamic market.
                </p>
                <button
                    style={{
                        padding: "1rem 2rem",
                        backgroundColor: "#3498db", // Blue background
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "600",
                        borderRadius: "30px", // Rounded edges
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                        const button = e.target as HTMLButtonElement; // Type assertion
                        button.style.backgroundColor = "#2980b9"; // Darker blue on hover
                    }}
                    onMouseOut={(e) => {
                        const button = e.target as HTMLButtonElement; // Type assertion
                        button.style.backgroundColor = "#3498db"; // Reset to original blue
                    }}
                >
                    Sign Up
                </button>
            </WelcomeSection>
        </div>
    );
}
