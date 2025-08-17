import { PropsWithChildren } from "react";

import Grid from "@component/grid/Grid";
import Sidebar from "../profile/DashboardNavigation";
// STYLED COMPONENT
import { StyledGrid } from "../profile/styles";

// In Layout.tsx
export default function CustomerDashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
