import { PropsWithChildren } from "react";
import Grid from "@component/grid/Grid";
import Sidebar from "../profile/DashboardNavigation";
import { StyledGrid } from "../profile/styles";
import Footer1 from "@component/footer/footer-1/Footer1";

export default function CustomerDashboardLayout({ children }: PropsWithChildren<{}>) {
  return (
    <Grid
      container
      direction="column"
      style={{
        minHeight: "100dvh", // logical viewport (better on mobile)
        fontFamily: "'Open Sans', sans-serif"
      }}
    >
      {/* Main row: sidebar + content */}
      <Grid
        container
        item
        // ensure the window is the scroll container (avoid overflow here)
        style={{ flex: 1, overflow: "visible" }}
      >
        {/* Sidebar */}
        <StyledGrid
          item
          // if your Grid supports fractional lg, keep; otherwise use 3 or 2 depending on your grid
          lg={2.25}
          xs={12}
          style={{
            position: "sticky",
            top: 70,
            alignSelf: "flex-start",          // let sticky take effect
            height: "100dvh",                  // fill viewport height
            maxHeight: "100dvh",
            overflowY: "auto",                 // sidebar can scroll independently if needed
            backgroundColor: "#f9f9f98e",
          }}
        >
          <Sidebar />
        </StyledGrid>

        {/* Main content column */}
        <Grid item lg={9.75} xs={12} style={{ minHeight: "100%" }}>
          {children}

          {/* Footer sits under content (scrolls with content) */}
          <div style={{ paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
            <Footer1 />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
