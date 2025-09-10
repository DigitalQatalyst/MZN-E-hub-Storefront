"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { H3 } from "@component/Typography";
import { Button as DefaultButton } from "@component/buttons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StyledHeader from "@component/header/styles";

// STYLED COMPONENTS
const WelcomeSection = styled.section`
  background-color: #fff;
  color: #000;
  padding: 50px 120px 50px 120px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    padding: 40px 80px 40px 80px;
  }

  @media (max-width: 768px) {
    padding: 30px 40px 30px 40px;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 20px 20px 20px 20px;
    gap: 1rem;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainHeading = styled(H3)`
  @media (max-width: 480px) {
    font-size: 36px !important;
  }
`;

const FeaturedEvents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FeaturedEventsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SubText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const EventsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 2rem;
  width: 100%;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1.5rem; /* Adjusted for better spacing */
    align-items: center; /* Center cards for better mobile presentation */
  }
`;

const EventCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 0;
  min-width: 0;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 320px; /* Fixed width for mobile */
    height: auto; /* Allow height to adjust based on content */
    gap: 0.5rem;
  }
`;

const EventImage = styled.div`
  height: 200px;
  flex-shrink: 0;
  position: relative;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 160px;
  }

  @media (max-width: 480px) {
    width: 380px; /* Fixed image width */
    height: 200px; /* Fixed image height */
  }
`;

const EventDetails = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 480px) {
    padding-top: 0.5rem;
    gap: 0.25rem;
    flex: 1;
    overflow: hidden;
  }
`;

const EventTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8em; /* Ensure consistent height for two lines */
  line-height: 1.4;
  max-height: 2.8em; /* Fallback for non-webkit browsers */

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    -webkit-line-clamp: 2;
    min-height: auto;
    max-height: none;
  }
`;

const EventMeta = styled.div`
  font-size: 14px;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 480px) {
    font-size: 13px;
    gap: 0.25rem;
  }
`;

const ExploreAllButton = styled(DefaultButton)`
  background-color: transparent;
  color: #0030e3;
  border: none;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;

  &:hover {
    color: #002180;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// TYPES
interface Post {
  postId: string;
  title: string;
  content: string;
  slug: string;
  date: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  } | null;
}

const GRAPHQL_ENDPOINT =
  "https://ujs.qxk.mybluehost.me/website_b79ab28e/graphql";

const Section16: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query getPostsCopy {
                posts(first: 4) {
                  edges {
                    node {
                      postId
                      content(format: RAW)
                      slug
                      title
                      date
                      featuredImage {
                        node {
                          sourceUrl
                        }
                      }
                    }
                  }
                }
              }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        setPosts(data.posts.edges.map((edge: any) => edge.node));
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleExploreAllClick = () => {
    window.open(
      "https://kf-ej-media-marketplace-c0cllh08g-digitalqatalysts-projects.vercel.app/",
      "_blank"
    );
  };

  if (loading) {
    return (
      <WelcomeSection>
        <ContentColumn>
          <H3
            style={{
              fontSize: "16px",
              fontWeight: "400",
              fontFamily: "Helvetica Neue",
              textTransform: "uppercase",
            }}
          >
            Latest Insights & Success Stories
          </H3>
          <MainHeading fontSize="48px" fontWeight="500">
            Loading...
          </MainHeading>
        </ContentColumn>
      </WelcomeSection>
    );
  }

  if (error) {
    return (
      <WelcomeSection>
        <ContentColumn>
          <H3
            style={{
              fontSize: "16px",
              fontWeight: "400",
              textTransform: "uppercase",
            }}
          >
            Error
          </H3>
          <H3 fontSize="24px" fontWeight="600" color="error">
            {error}
          </H3>
        </ContentColumn>
      </WelcomeSection>
    );
  }

  return (
    <div>
      <WelcomeSection>
        <ContentColumn>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "400",
              textTransform: "uppercase",
            }}
          >
            Latest Insights & Success Stories
          </p>
          <MainHeading fontSize="48px" fontWeight="500">
            Stay informed with curated news, <br /> market analysis, and
            real-world case studies
          </MainHeading>
        </ContentColumn>
        <FeaturedEvents>
          <FeaturedEventsHeader>
            <HeaderTextContainer>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  textTransform: "uppercase",
                }}
              >
                Latest Media Updates
              </p>
              <SubText>Discover the latest news and updates.</SubText>
            </HeaderTextContainer>
            <ExploreAllButton onClick={handleExploreAllClick}>
              Explore more <span>→</span>
            </ExploreAllButton>
          </FeaturedEventsHeader>
          <EventsContainer>
            {posts.map((post) => (
              <EventCard key={post.postId}>
                <EventImage>
                  <Image
                    src={
                      post.featuredImage?.node?.sourceUrl ||
                      "/assets/images/placeholder.jpg"
                    }
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </EventImage>
                <EventDetails>
                  <EventTitle>{post.title}</EventTitle>
                  <EventMeta>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#7D879C",
                      }}
                    >
                      {formatDate(post.date)}
                    </span>
                  </EventMeta>
                </EventDetails>
              </EventCard>
            ))}
          </EventsContainer>
        </FeaturedEvents>
      </WelcomeSection>
    </div>
  );
};

export default Section16;
