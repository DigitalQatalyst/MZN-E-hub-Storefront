import React, { useState, useEffect } from "react";
import { LogOutIcon, BellIcon, ChevronDownIcon, UserIcon } from "lucide-react";

interface User {
  name: string;
  email: string;
  givenName: string;
  familyName: string;
  picture: string;
  sub: string;
}

interface ProfileDropdownProps {
  user: User | null;
  onViewNotifications: () => void;
  unreadNotifications: number;
  onLogout: () => void;
  isCompact?: boolean; // New prop for compact mode
}

export function ProfileDropdown({
  user,
  onViewNotifications,
  unreadNotifications = 0,
  onLogout,
  isCompact = false, // Default to false
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  // Prevent body scroll when logout confirmation is open
  useEffect(() => {
    if (showLogoutConfirmation) {
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
  }, [showLogoutConfirmation]);

  // Generate initials from user name if no avatar is available
  const getInitials = () => {
    if (!user || !user.name) return "?";

    // Try to use given name and family name first
    if (user.name && user.familyName) {
      return `${user.name.charAt(0)}${user.familyName.charAt(0)}`;
    }

    // Fall back to splitting the full name
    const nameParts = user.name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(
        0
      )}`;
    }

    // If only one name part, use first two letters
    return user.name.substring(0, 2).toUpperCase();
  };

  // Get user's first name for greeting
  const getFirstName = () => {
    if (!user) return "";
    return user.givenName || user.name.split(" ")[0];
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Show logout confirmation dialog
  const showLogoutConfirm = () => {
    setShowLogoutConfirmation(true);
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  // Handle logout and redirect
  const handleLogout = () => {
    // Close the dropdown and confirmation dialog
    closeDropdown();
    setShowLogoutConfirmation(false);

    // Call the logout function passed from parent (MSAL logout)
    onLogout();
  };

  // Navigate to user profile
  const navigateToUserProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    closeDropdown();

    // Navigate to dashboard or profile page
    window.location.href = "/dashboard";
  };

  // If no user is authenticated, don't show the dropdown
  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <button
        className="flex items-center cursor-pointer"
        onClick={toggleDropdown}
        aria-label="User menu"
      >
        <div
          className={`relative rounded-full bg-white text-purple-700 flex items-center justify-center font-bold transition-all duration-300 ${
            isCompact ? "w-8 h-8 text-sm" : "w-10 h-10"
          }`}
        >
          {user.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials()
          )}
          {/* Red dot notification indicator - only show when there are unread notifications */}
          {unreadNotifications > 0 && (
            <span
              className={`absolute top-0 right-0 bg-red-500 rounded-full border-2 border-white transition-all duration-300 ${
                isCompact ? "w-2.5 h-2.5" : "w-3 h-3"
              }`}
            ></span>
          )}
        </div>
        <div className="flex items-center ml-2">
          <span
            className={`hidden sm:inline text-white transition-all duration-300 ${
              isCompact ? "text-sm" : ""
            }`}
          >
            Hi, {user.name}
          </span>
          <ChevronDownIcon
            size={isCompact ? 14 : 16}
            className="ml-1 text-white transition-all duration-300"
          />
        </div>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={closeDropdown}></div>
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
            <div className="p-3 border-b border-gray-200">
              <button
                className="flex items-center w-full text-left hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={navigateToUserProfile}
              >
                <UserIcon size={18} className="text-gray-500 mr-2" />
                <div className="ml-1">
                  <p className="text-sm text-gray-800">
                    {user.name} {user.familyName}
                  </p>
                  <p className="text-xs text-gray-500 text-wrap">
                    {user.email}
                  </p>
                </div>
              </button>
            </div>
            <div className="py-1">
              <button
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  closeDropdown();
                  onViewNotifications();
                }}
              >
                <BellIcon size={16} className="mr-3 text-gray-500" />
                <span>Notifications</span>
                {/* Only show badge counter when there are unread notifications */}
                {unreadNotifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </div>
            <div className="py-1 border-t border-gray-200">
              <button
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  showLogoutConfirm();
                }}
              >
                <LogOutIcon size={16} className="mr-3 text-gray-500" />
                Log Out
              </button>
            </div>
          </div>
        </>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to log out? You will need to sign in again
              to access your account.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 cursor-pointer"
                onClick={handleLogout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
