import { PropsWithChildren } from "react";

import Grid from "@component/grid/Grid";
import Sidebar from "../profile/DashboardNavigation";
// STYLED COMPONENT
import { StyledGrid } from "../profile/styles";

// In Layout.tsx
export default function CustomerDashboardLayout({ children }: PropsWithChildren) {
  return (
    <Grid container >
      <StyledGrid item lg={2.25} xs={12}>
        <Sidebar />
      </StyledGrid>

      <Grid item lg={9.75} xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
