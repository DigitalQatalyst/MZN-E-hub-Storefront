import { PropsWithChildren } from "react";
import ShopLayout from "@component/layout/layout-2";
import RequireAuth from "@component/auth/requireAuth";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RequireAuth>
        <ShopLayout>{children}</ShopLayout>
    </RequireAuth>

);
}
