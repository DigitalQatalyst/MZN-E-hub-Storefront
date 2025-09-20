import React, { useEffect, useState, useMemo } from "react";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { loginRequest } from "../../lib/authConfig"; // Adjust path as needed
import { InteractionStatus, AccountInfo } from "@azure/msal-browser";
import { ExploreDropdown } from "./ExploreDropdown";
import { MobileDrawer } from "./MobileDrawer";
import { ProfileDropdown } from "./ProfileDropdown";
import { NotificationsMenu } from "../notifications/NotificationsMenu";
import { NotificationCenter } from "../notifications/NotificationCenter";
import { mockNotifications } from "../../utils/mockNotifications";

interface HeaderProps {
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
  "data-id"?: string;
}

export default function Stage2Navbar2({
  toggleSidebar,
  sidebarOpen,
  "data-id": dataId,
}: HeaderProps) {
  const { instance, accounts, inProgress } = useMsal();

  // ---- MSAL initialization state ----
  const [isMsalInitialized, setIsMsalInitialized] = useState(false);

  // Component state
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Initialize MSAL
  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      setIsMsalInitialized(true);
    }
  }, [inProgress]);

  // Set active account once MSAL is ready
  useEffect(() => {
    if (!isMsalInitialized) return;
    try {
      if (!instance.getActiveAccount() && accounts[0]) {
        instance.setActiveAccount(accounts[0]);
      }
    } catch (error) {
      console.warn("Error setting active account:", error);
    }
  }, [accounts, instance, isMsalInitialized]);

  // Get active account safely
  const activeAccount: AccountInfo | undefined = useMemo(() => {
    if (!isMsalInitialized) return undefined;
    try {
      return instance.getActiveAccount() ?? accounts[0];
    } catch (error) {
      console.warn("Error getting active account:", error);
      return undefined;
    }
  }, [instance, accounts, isMsalInitialized]);

  // Transform MSAL account to user format
  const user = useMemo(() => {
    if (!activeAccount) return null;

    const idTokenClaims = activeAccount.idTokenClaims as any;
    const name =
      activeAccount.name ||
      idTokenClaims?.name ||
      idTokenClaims?.given_name ||
      "User";

    // Clean up the email - prefer preferred_username or email claim over username
    let email = "";
    if (idTokenClaims?.preferred_username) {
      email = idTokenClaims.preferred_username;
    } else if (idTokenClaims?.email) {
      email = idTokenClaims.email;
    } else if (idTokenClaims?.emails && Array.isArray(idTokenClaims.emails)) {
      email = idTokenClaims.emails[0];
    } else if (activeAccount.username && activeAccount.username.includes("@")) {
      email = activeAccount.username;
    } else {
      email = "";
    }

    return {
      id: activeAccount.localAccountId || "1",
      name: name,
      email: email,
      givenName: idTokenClaims?.given_name || name.split(" ")[0] || "User",
      familyName: idTokenClaims?.family_name || name.split(" ")[1] || "",
      picture: "", // MSAL doesn't typically provide profile pictures
      sub: activeAccount.localAccountId || activeAccount.homeAccountId || "",
    };
  }, [activeAccount]);

  console.log(user);

  // Count unread notifications
  const unreadCount = mockNotifications.filter((notif) => !notif.read).length;

  // Sticky header behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when NotificationCenter is open
  useEffect(() => {
    if (showNotificationCenter) {
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Wait for smooth scroll to complete before preventing scroll
      const timer = setTimeout(() => {
        // Prevent body scroll
        document.body.style.overflow = "hidden";
        // Prevent scroll on html element as well (for some browsers)
        document.documentElement.style.overflow = "hidden";
      }, 500); // Adjust timing if needed for your smooth scroll duration

      return () => {
        clearTimeout(timer);
      };
    } else {
      // Re-enable body scroll
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [showNotificationCenter]);

  // ---- Auth actions ----
  const handleSignIn = async () => {
    if (!isMsalInitialized) {
      console.warn("MSAL not initialized yet");
      return;
    }
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignOut = async () => {
    setShowNotificationsMenu(false);
    setShowNotificationCenter(false);

    if (!isMsalInitialized) return;
    try {
      await instance.logoutRedirect({
        postLogoutRedirectUri:
          typeof window !== "undefined" ? window.location.origin : "/",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ---- Notification handlers ----
  const toggleNotificationsMenu = () => {
    setShowNotificationsMenu(!showNotificationsMenu);
    if (showNotificationCenter) setShowNotificationCenter(false);
  };

  const openNotificationCenter = () => {
    setShowNotificationCenter(true);
    setShowNotificationsMenu(false);
  };

  const closeNotificationCenter = () => {
    setShowNotificationCenter(false);
  };

  // Show loading state while MSAL initializes
  if (!isMsalInitialized) {
    return (
      <header className="flex items-center w-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600">
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white py-2 px-4 flex items-center h-16">
          <div className="font-bold leading-tight">
            <div>ENTERPRISE</div>
            <div>JOURNEY</div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center h-16 text-white px-4">
          <span className="text-sm">Loading...</span>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`flex items-center w-full transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 z-40 shadow-lg backdrop-blur-sm bg-gradient-to-r from-teal-500/95 via-blue-500/95 to-purple-600/95"
            : "relative bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600"
        }`}
        data-id={dataId}
      >
        {/* Logo Section */}
        <div
          className={`bg-gradient-to-r from-teal-600 to-teal-500 text-white py-2 px-4 flex items-center transition-all duration-300 ${
            isSticky ? "h-12" : "h-16"
          }`}
        >
          {/* <div
            className={`font-bold leading-tight transition-all duration-300 ${
              isSticky ? "text-sm" : ""
            }`}
          >
            <div>ENTERPRISE</div>
            <div>JOURNEY</div>
          </div> */}
          <img
            src="/assets/images/tab_bar/Subtract.svg"
            alt=""
            style={{ transform: "scale(0.7)" }}
          />
        </div>

        {/* Main Navigation */}
        <div
          className={`flex-1 flex justify-between items-center bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 text-white px-4 transition-all duration-300 ${
            isSticky ? "h-12" : "h-16"
          }`}
        >
          {/* Left Navigation - Desktop and Tablet */}
          <div className="hidden md:flex items-center space-x-8">
            <ExploreDropdown isCompact={isSticky} />
            <div
              className={`hover:text-gray-200 transition-colors duration-200 cursor-pointer ${
                isSticky ? "text-sm" : ""
              }`}
            >
              Discover AbuDhabi
            </div>
          </div>

          {/* Right Side - Conditional based on auth state and screen size */}
          <div className="flex items-center ml-auto space-x-2 relative">
            <AuthenticatedTemplate>
              <div className="flex items-center space-x-4">
                <ProfileDropdown
                  user={user}
                  onViewNotifications={toggleNotificationsMenu}
                  unreadNotifications={unreadCount}
                  onLogout={handleSignOut}
                  isCompact={isSticky}
                />
              </div>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              {/* Desktop CTAs (≥1024px) */}
              <div className="hidden lg:flex items-center space-x-3">
                <button
                  className={`px-4 py-2 text-white border border-white/30 rounded-md hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                    isSticky ? "text-sm px-3 py-1.5" : ""
                  }`}
                  onClick={() => console.log("Become a Partner clicked")}
                >
                  Become a Partner
                </button>
                <button
                  className={`px-4 py-2 bg-white text-teal-700 rounded-md hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 font-medium ${
                    isSticky ? "text-sm px-3 py-1.5" : ""
                  }`}
                  onClick={() => console.log("Make an Enquiry clicked")}
                >
                  Make an Enquiry
                </button>
                <button
                  className={`px-4 py-2 text-white border border-white/50 rounded-md hover:bg-white hover:text-teal-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                    isSticky ? "text-sm px-3 py-1.5" : ""
                  }`}
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </div>

              {/* Tablet Enquiry Button (768px - 1023px) */}
              <div className="hidden md:flex lg:hidden items-center">
                <button
                  className={`px-3 py-2 bg-white text-teal-700 rounded-md hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 font-medium ${
                    isSticky ? "text-sm px-2 py-1.5" : "text-sm"
                  }`}
                  onClick={() => console.log("Make an Enquiry clicked")}
                >
                  Enquiry
                </button>
              </div>
            </UnauthenticatedTemplate>

            {/* Mobile and Tablet Drawer - Show for screens <1024px */}
            <MobileDrawer
              isCompact={isSticky}
              onSignIn={handleSignIn}
              isSignedIn={!!user}
            />
          </div>
        </div>
      </header>

      {/* Spacer for sticky header */}
      {isSticky && <div className="h-12"></div>}

      {/* Notifications Menu - Only show when authenticated */}
      <AuthenticatedTemplate>
        {showNotificationsMenu && user && (
          <NotificationsMenu
            onViewAll={openNotificationCenter}
            onClose={() => setShowNotificationsMenu(false)}
          />
        )}

        {/* Notification Center Modal - Only show when authenticated */}
        {showNotificationCenter && user && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-black/70 bg-opacity-100"
              onClick={closeNotificationCenter}
            ></div>
            <div className="relative bg-white shadow-xl rounded-lg max-w-2xl w-full max-h-[90vh] m-4 transform transition-all duration-300">
              <NotificationCenter onBack={closeNotificationCenter} />
            </div>
          </div>
        )}
      </AuthenticatedTemplate>
    </>
  );
}
