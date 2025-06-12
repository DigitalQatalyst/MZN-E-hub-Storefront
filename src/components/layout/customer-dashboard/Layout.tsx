import { PropsWithChildren } from "react";

import Grid from "@component/grid/Grid";
import Sidebar from "../profile/DashboardNavigation";
// STYLED COMPONENT
import { StyledGrid } from "../profile/styles";

// In Layout.tsx
export default function CustomerDashboardLayout({ children }: PropsWithChildren) {
  return (
    <Grid container spacing={6}>
      <StyledGrid item lg={3} xs={12}>
        <Sidebar />
      </StyledGrid>

      <Grid item lg={9} xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
