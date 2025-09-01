interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
  ];

  return (
    <div style={{ display: "flex", gap: "0" }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: "12px 20px",
            border: "none",
            backgroundColor: activeTab === tab.id ? "#2563eb" : "transparent",
            color: activeTab === tab.id ? "white" : "#999",
            borderRadius: activeTab === tab.id ? "6px" : "0",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: "16px" }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
