// tabs
"use client";
import { Tabs, TabsList, TabsTrigger } from "@component/ui/tabs";
import { Box } from "@mui/material";
import { useState } from "react";

const ApplicationTabs = () => {
  const [active, activeTab] = useState(1);
  const apptabs = [
    {
      id: 1,
      title: "Business Loans",
    },
    {
      id: 2,
      title: "Investments",
    },
    {
      id: 3,
      title: "Asset Finance",
    },
    {
      id: 4,
      title: "Growth Finance",
    },
    {
      id: 5,
      title: "Project Finance",
    },
    {
      id: 6,
      title: "Working Capital",
    },
    {
      id: 7,
      title: "Trade & Supply",
    },
  ];

  //   handle active tab change
  const handleTabChange = (tab: number) => {
    activeTab(tab);
  };
  return (
    <Box
      style={{
        paddingLeft: "20px",
        display: "flex",
        gap: "12px",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      {apptabs.map((tab) => {
        return (
          <Box
            onClick={() => handleTabChange(tab?.id)}
            style={{
              display: "flex",
              cursor: "pointer",
              borderBottom:
                active === tab?.id
                  ? "2px solid #0030E3"
                  : "2px solid transparent",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: active === tab?.id ? "600" : "400",
              }}
            >
              {tab?.title}
            </p>
          </Box>
        );
      })}
    </Box>
  );
};

export default ApplicationTabs;
