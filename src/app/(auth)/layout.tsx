// import { PropsWithChildren } from "react";
// import FlexBox from "@component/FlexBox";

// export default function Layout({ children }: PropsWithChildren) {
//   return (
//     <FlexBox minHeight="100vh" alignItems="center" flexDirection="column" justifyContent="center">
//       {children}
//     </FlexBox>
//   );
// }
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Minimal wrapper so Next.js stops complaining
  return <>{children}</>;
}
