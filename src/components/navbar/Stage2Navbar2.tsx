import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { NotificationsMenu } from "../notifications/NotificationsMenu";
import { NotificationCenter } from "../notifications/NotificationCenter";
import { mockNotifications } from "../../utils/mockNotifications";
// import { useAuth } from "../../contexts/AuthContext";
export default function Stage2Navbar2({ sidebarOpen }) {
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  // const { user, logout } = useAuth();
  // Count unread notifications

  const mockUser = {
    name: "Mark Johnson",
    email: "mark.johnson@futuretech.com",
    givenName: "Mark",
    familyName: "Johnson",
    picture: "",
    sub: "user123456",
  };
  const unreadCount = mockNotifications.filter((notif) => !notif.read).length;
  // Toggle notifications menu
  const toggleNotificationsMenu = () => {
    setShowNotificationsMenu(!showNotificationsMenu);
    if (showNotificationCenter) setShowNotificationCenter(false);
  };
  // Open notification center
  const openNotificationCenter = () => {
    setShowNotificationCenter(true);
    setShowNotificationsMenu(false);
  };
  // Close notification center
  const closeNotificationCenter = () => {
    setShowNotificationCenter(false);
  };
  // Reset notification states when user logs out
  useEffect(() => {
    if (!mockUser) {
      setShowNotificationsMenu(false);
      setShowNotificationCenter(false);
    }
  }, [mockUser]);
  return (
    <header className="flex items-center w-full">
      <div className="bg-emerald-500 text-white py-2 px-4 flex items-center h-16">
        <div className="font-bold leading-tight">
          <div>ENTERPRISE</div>
          <div>JOURNEY</div>
        </div>
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
          <ProfileDropdown
            onViewNotifications={toggleNotificationsMenu}
            unreadNotifications={unreadCount}
          />
        </div>
      </div>
      {/* Notifications Menu (appears when clicking Notifications in ProfileDropdown) */}
      {showNotificationsMenu && mockUser && (
        <NotificationsMenu
          onViewAll={openNotificationCenter}
          onClose={() => setShowNotificationsMenu(false)}
        />
      )}
      {/* Notification Center Modal (appears when clicking View All in NotificationsMenu) */}
      {showNotificationCenter && mockUser && (
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
    </header>
  );
}
