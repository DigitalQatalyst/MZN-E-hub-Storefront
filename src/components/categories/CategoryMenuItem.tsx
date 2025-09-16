import Link from "next/link";
import Icon from "@component/icon/Icon";
import { StyledCategoryMenuItem } from "./styles";
import { Chip } from "@component/Chip";

// ===============================================================
type CategoryMenuItemProps = {
  href: string;
  icon?: string;
  title: string;
  caret?: boolean;
  tag?: {
    text: string;
    color: string;
    bg: string;
  };
  children: any;
};
// ===============================================================

export default function CategoryMenuItem(props: CategoryMenuItemProps) {
  const { href, icon, title, caret = true, tag, children } = props;

  return (
    <StyledCategoryMenuItem>
      <Link href={href}>
        <div className="category-dropdown-link">
          {icon && <Icon variant="small">{icon}</Icon>}
          <span className="title">{title}</span>
          {tag && (
            <Chip
              bg={tag.bg}
              color={tag.color}
              width="92px"
              height="20px"
              display="flex"
              p="0"
              borderRadius="8px"
              fontSize="10px"
              fontWeight="600"
              lineHeight="1"
              border="1px solid #E0E0E0"
            >
              {tag.text}
            </Chip>
          )}
          {caret && <Icon variant="small">chevron-right</Icon>}
        </div>
      </Link>

      {children}
    </StyledCategoryMenuItem>
  );
}
