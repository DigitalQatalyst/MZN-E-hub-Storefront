"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest } from "../../lib/authConfig";
import { InteractionStatus, AccountInfo } from "@azure/msal-browser";

import { ProfileDropdown } from "./ProfileDropdown";
import { NotificationsMenu } from "../notifications/NotificationsMenu";
import { NotificationCenter } from "../notifications/NotificationCenter";
import { mockNotifications } from "../../utils/mockNotifications";

interface Stage2Navbar2Props {
  sidebarOpen?: boolean;
}

export default function Stage2Navbar2({ sidebarOpen }: Stage2Navbar2Props) {
  const { instance, accounts, inProgress } = useMsal();

  // ---- MSAL initialization state ----
  const [isMsalInitialized, setIsMsalInitialized] = useState(false);
  
  // Notification states
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // Initialize MSAL when interaction is complete
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

  // Get the active account safely
  const activeAccount: AccountInfo | undefined = useMemo(() => {
    if (!isMsalInitialized) return undefined;
    try {
      return instance.getActiveAccount() ?? accounts[0];
    } catch (error) {
      console.warn("Error getting active account:", error);
      return undefined;
    }
  }, [instance, accounts, isMsalInitialized]);

  // Transform MSAL account to user object format expected by ProfileDropdown
  const user = useMemo(() => {
    if (!activeAccount) return null;
    
    const name = activeAccount.name || 
                 (activeAccount.idTokenClaims as any)?.name || 
                 (activeAccount.idTokenClaims as any)?.given_name || 
                 'User';
    
    const email = activeAccount.username || 
                  (activeAccount.idTokenClaims as any)?.emails?.[0] || 
                  '';
    
    // Extract given name and family name from claims or parse from full name
    const givenName = (activeAccount.idTokenClaims as any)?.given_name || 
                      name.split(' ')[0] || 
                      'User';
    
    const familyName = (activeAccount.idTokenClaims as any)?.family_name || 
                       (name.split(' ').length > 1 ? name.split(' ').slice(-1)[0] : '');

    return {
      name,
      email, // is encrypted
      givenName,
      familyName,
      picture: '', // does MSAL provide a picture URL?
      sub: activeAccount.homeAccountId || activeAccount.localAccountId || 'unknown',
    };
  }, [activeAccount]);

  // Count unread notifications
  const unreadCount = mockNotifications.filter((notif) => !notif.read).length;

  // Auth functions
  const startLogin = () => {
    if (!isMsalInitialized) {
      console.warn("MSAL not initialized yet");
      return Promise.resolve();
    }
    return instance.loginRedirect(loginRequest).catch(console.error);
  };

  const logout = () => {
    if (!isMsalInitialized) return;
    instance
      .logoutRedirect({
        postLogoutRedirectUri: typeof window !== "undefined" ? window.location.origin : "/",
      })
      .catch(console.error);
  };

  // Notification handlers
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

  // Reset notification states when user logs out
  useEffect(() => {
    if (!user) {
      setShowNotificationsMenu(false);
      setShowNotificationCenter(false);
    }
  }, [user]);

    const goHome = () => (window.location.href = "/");


  // Show loading state while MSAL initializes
  if (!isMsalInitialized) {
    return (
      <header className="flex items-center w-full">
        <div className="bg-emerald-500 text-white py-2 px-4 flex items-center h-16">
          <img
            src="/assets/images/tab_bar/Subtract.svg"
            alt="Enterprise Journey"
            className="h-[22px] sm:h-[24px] md:h-[28px] w-auto"
            onClick={goHome}
          />
        </div>
        <div className="flex-1 flex justify-center items-center h-16 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white px-4">
          <span className="text-sm opacity-90">Loading authentication...</span>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center w-full">
      <div className="bg-emerald-500 text-white py-2 px-4 flex items-center h-16">
        <img
          src="/assets/images/tab_bar/Subtract.svg"
          alt="Enterprise Journey"
          className="h-[22px] sm:h-[24px] md:h-[28px] w-auto"
          onClick={goHome}
        />
      </div>
      <div className="flex-1 flex justify-between items-center h-16 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white px-4">
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center">
            <span>Explore</span>
            <ChevronDownIcon size={16} className="ml-1" />
          </div>
          <div>Discover AbuDhabi</div>
        </div>
        <div className="flex items-center ml-auto space-x-2">
          <AuthenticatedTemplate>
            {/* Show profile dropdown when authenticated */}
            <ProfileDropdown
              user={user}
              onViewNotifications={toggleNotificationsMenu}
              unreadNotifications={unreadCount}
              onLogout={logout}
            />
          </AuthenticatedTemplate>
          
          <UnauthenticatedTemplate>
            {/* Show login button when not authenticated */}
            <button
              onClick={startLogin}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              Sign In
            </button>
          </UnauthenticatedTemplate>
        </div>
      </div>

      {/* Notifications Menu (appears when clicking Notifications in ProfileDropdown) */}
      <AuthenticatedTemplate>
        {showNotificationsMenu && user && (
          <NotificationsMenu
            onViewAll={openNotificationCenter}
            onClose={() => setShowNotificationsMenu(false)}
          />
        )}

        {/* Notification Center Modal (appears when clicking View All in NotificationsMenu) */}
        {showNotificationCenter && user && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 backdrop-blur-md bg-opacity-50"
              onClick={closeNotificationCenter}
            ></div>
            <div className="relative bg-white shadow-xl rounded-lg max-w-2xl w-full max-h-[90vh] m-4">
              <NotificationCenter onBack={closeNotificationCenter} />
            </div>
          </div>
        )}
      </AuthenticatedTemplate>
    </header>
  );
}