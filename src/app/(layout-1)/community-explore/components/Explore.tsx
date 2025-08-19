"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ComingSoon from "./ComingSoon";
import styles from "./Explore.module.css";
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
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        });
      } else if (e.key === "ArrowRight") {
        mainNavRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (mainNavRef.current) {
      e.preventDefault();
      mainNavRef.current.scrollLeft += e.deltaY;
    }
  }, []);

  // Handle responsive behavior and scroll indicators
  useEffect(() => {
    // Initial setup
    handleResize();
    window.addEventListener("resize", handleResize);

    const mainNavElement = mainNavRef.current;
    const navLinksElement = navLinksRef.current;

    if (mainNavElement) {
      mainNavElement.addEventListener("scroll", handleScroll);
      mainNavElement.addEventListener("keydown", handleKeyDown);
      mainNavElement.addEventListener("wheel", handleWheel);
      mainNavElement.setAttribute("tabindex", "0");
    }

    if (navLinksElement) {
      navLinksElement.addEventListener("scroll", handleScroll);
    }

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mainNavElement) {
        mainNavElement.removeEventListener("scroll", handleScroll);
        mainNavElement.removeEventListener("keydown", handleKeyDown);
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
    <div className={styles.container}>
      <Sidebar
        selectedSection={sidebarSelected}
        onSectionChange={setSidebarSelected}
        isMobile={isMobile}
      />

      <div className={styles.mainContentWrapper}>
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
      </div>
    </div>
  );
};

export default Explore;
