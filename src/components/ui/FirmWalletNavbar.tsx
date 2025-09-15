import React from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar({ active }: { active?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  // Define tabs with their corresponding routes
  const tabs = [
    { name: "Overview", path: "/documents" },
    { name: "My Uploads", path: "/documents/my-uploads" },
    { name: "My Downloads", path: "/documents/my-downloads" },
    { name: "My Bin", path: "/documents/my-bin" }
  ];

  // Determine active tab based on current path if not explicitly provided
  const getActiveTab = () => {
    if (active) return active;
    
    const currentTab = tabs.find(tab => pathname === tab.path);
    return currentTab?.name || "Overview";
  };

  const handleTabClick = (tabName: string, path: string) => {
    router.push(path);
  };

  const activeTab = getActiveTab();

  return (
    <nav className="py-6">
      <ul className="flex gap-12 border-b border-transparent">
        {tabs.map((tab) => (
          <li key={tab.name} className="">
            <button
              onClick={() => handleTabClick(tab.name, tab.path)}
              className={`text-[15px] font-light pb-2 border-b-2 transition-colors duration-200 font-[Outfit,sans-serif]` +
                (activeTab === tab.name
                  ? " text-blue-700 border-blue-700"
                  : " text-gray-700 border-transparent hover:text-blue-700")
              }
              style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
} 