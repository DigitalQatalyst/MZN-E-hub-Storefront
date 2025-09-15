"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";

export default function TabsRow({
  tabs, active, onChange,
}: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <Box mb="24px" borderBottom="1px solid #E0E0E0" className="custom-tab-scroll" style={{ overflowX: "auto", overflowY: "hidden", paddingBottom: "2px" }}>
      <FlexBox style={{ minWidth: "fit-content" }}>
        {tabs.map((tab) => (
          <Box
            key={tab}
            p="12px 24px"
            borderBottom={`2px solid ${active === tab ? "#0030E3" : "transparent"}`}
            style={{ cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.3s ease" }}
            onClick={() => onChange(tab)}
          >
            <Typography fontSize="14px" fontWeight="500" color={active === tab ? "#242424" : "text.hint"}>
              {tab}
            </Typography>
          </Box>
        ))}
      </FlexBox>
    </Box>
  );
}
