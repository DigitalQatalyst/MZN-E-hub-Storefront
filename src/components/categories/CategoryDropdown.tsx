import navigations from "@data/navigations";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";
import CategoryMenuItem from "./CategoryMenuItem";
import { StyledCategoryDropdown } from "./styles";

// =========================================
type CategoryDropdownProps = {
  open: boolean;
  position?: "absolute" | "relative";
};
// =========================================

export default function CategoryDropdown({ open, position = "absolute" }: CategoryDropdownProps) {
  const megaMenu = { MegaMenu1, MegaMenu2 };

  // Only these titles should have dropdowns
  const dropdownTitles = ["Financial", "Non-Financial"];

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {navigations.map((item) => {
        const hasDropdown = dropdownTitles.includes(item.title) && !!item.menuData;
        let MegaMenu = megaMenu[item.menuComponent];

        return (
          <CategoryMenuItem
            key={item.title}
            href={item.href}
            // icon={item.icon}
            title={item.title}
            caret={hasDropdown}
            tag={item.tag}
          >
            {hasDropdown && MegaMenu ? <MegaMenu data={item.menuData || {}} /> : null}
          </CategoryMenuItem>
        );
      })}
    </StyledCategoryDropdown>
  );
}
