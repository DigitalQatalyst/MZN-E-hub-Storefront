"use client";

import Box from "@component/Box";
import { useCallback, useEffect, useRef, useState } from "react";
import ComingSoon from "./ComingSoon";
import ExploreContent from "./ExploreContent";
import Sidebar from "./Sidebar";

const Explore = () => {
  const [sidebarSelected, setSidebarSelected] = useState("explore");
  const [selectedNavLink, setSelectedNavLink] = useState("trending");
  const [selectedMainNavLink, setSelectedMainNavLink] =
    useState("women-in-business");
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainNavRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  // Memoized handlers for better performance
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const handleScroll = useCallback(() => {
    if (mainNavRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mainNavRef.current;
      const isScrolled = scrollLeft > 0;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;

      mainNavRef.current.classList.toggle("scrolled", isScrolled);
      mainNavRef.current.classList.toggle("at-end", isAtEnd);
    }

    if (navLinksRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navLinksRef.current;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;
      navLinksRef.current.classList.toggle("at-end", isAtEnd);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (
      mainNavRef.current &&
      (e.key === "ArrowLeft" || e.key === "ArrowRight")
    ) {
      e.preventDefault();
      const scrollAmount = 200;
      const currentScroll = mainNavRef.current.scrollLeft;

      if (e.key === "ArrowLeft") {
        mainNavRef.current.scrollTo({
          left: Math.max(0, currentScroll - scrollAmount),
          behavior: "smooth",
        });
      } else {
        mainNavRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (mainNavRef.current && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      mainNavRef.current.scrollLeft += e.deltaX;
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    const mainNavElement = mainNavRef.current;
    const navLinksElement = navLinksRef.current;

    if (mainNavElement) {
      mainNavElement.addEventListener("scroll", handleScroll);
      mainNavElement.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    if (navLinksElement) {
      navLinksElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      if (mainNavElement) {
        mainNavElement.removeEventListener("scroll", handleScroll);
        mainNavElement.removeEventListener("wheel", handleWheel);
      }
      if (navLinksElement) {
        navLinksElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleResize, handleScroll, handleKeyDown, handleWheel]);

  // Handler for joining communities
  const handleJoinCommunity = useCallback((communityId: string) => {
    console.log(`Joining community: ${communityId}`);
    // Implement join community logic here
    // This could involve API calls, state updates, etc.
  }, []);

  return (
    <Box
      display="flex"
      minHeight="100vh"
      bg="#f8f9fa"
      width="100%"
      maxWidth="1400px"
      marginLeft={"auto"}
      marginRight={"auto"}
      style={{
        boxSizing: "border-box",
      }}
    >
      <Sidebar
        selectedSection={sidebarSelected}
        onSectionChange={setSidebarSelected}
        isMobile={isMobile}
      />

      <Box
        flex="1"
        p="10px"
        overflow="auto"
        bg="white"
        style={{
          minWidth: 0,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {sidebarSelected === "explore" && (
          <ExploreContent
            selectedNavLink={selectedNavLink}
            onNavLinkChange={setSelectedNavLink}
            selectedMainNavLink={selectedMainNavLink}
            onMainNavLinkChange={setSelectedMainNavLink}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onJoinCommunity={handleJoinCommunity}
          />
        )}

        {/* Coming Soon Pages */}
        {sidebarSelected === "home" && <ComingSoon title="Home" />}
        {sidebarSelected === "my-communities" && (
          <ComingSoon title="My Communities" />
        )}
        {sidebarSelected === "notifications" && (
          <ComingSoon title="Notifications" />
        )}
        {sidebarSelected === "messages" && <ComingSoon title="Messages" />}
      </Box>
    </Box>
  );
};

export default Explore;
