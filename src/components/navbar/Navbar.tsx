"use client";
 
import Box from "../Box";
import Card from "../Card";
import Badge from "../badge";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import { Button } from "../buttons";
import Container from "../Container";
import Typography, { Span } from "../Typography";
import Categories from "../categories/Categories";
 
import StyledNavbar from "./marketStyles";

interface Nav {
  url: string;
  child: Nav[];
  title: string;
  badge: string;
  extLink?: boolean;
}
 
type NavbarProps = { navListOpen?: boolean };
// ==============================================================
 
export default function Navbar({ navListOpen }: NavbarProps) {
  return (
    <StyledNavbar>
      <Container height="100%" display="flex" alignItems="center" justifyContent="space-between">
        {/* Logo Section */}
        <Box className="navbar-logo">
          <img src="/assets/images/tab_bar/Subtract.svg" alt="MZN Enterprise Hub" height="100%"style={{marginLeft: "-88px"}} />
        </Box>
 
        {/* Categories Section */}
        <Categories open={navListOpen}>
          <Button width="320px" height="40px" bg="body.default" variant="text" marginRight={550} borderRadius={6}>
            <img src="/images/explore.svg" alt="Explore" />
            <Typography
              mr="150px"
              flex="1 1 0"
              fontFamily='"Open Sans", sans-serif'
              fontSize="14px"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="26px"
              color="#0030E3"
            >
              Explore
            </Typography>
 
            <Icon className="dropdown-icon" variant="small">
              chevron-right
            </Icon>
          </Button>
        </Categories>

        {/* Search Icon, Bookmark, and User Profile */}
        <FlexBox alignItems="center" style={{ gap: "15px", marginRight: "-88px" }}>
          {/* Search Icon */}
          <Box className="search-icon" style={{ cursor: "pointer" }}>
            <img src="/assets/images/logos/search.svg" alt="Search" height="24px" />
          </Box>
 
          {/* Bookmark Icon */}
          <Box className="search-icon" style={{ cursor: "pointer" }}>
            <img src="/images/bookmark.svg" alt="Bookmark" height="24px" />
          </Box>
 
          {/* User Profile Photo */}
          <Box className="profile-photo" style={{ cursor: "pointer" }}>
            <div className="profile-initials">
              MW
            </div>
          </Box>
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
}