import styled from "styled-components";

// STYLED COMPONENTS
export const ListItem = styled("li")(({ theme }) => ({
  color: "var(--KF-BG-Black, #000)", // Make sure the CSS variable is defined somewhere
  fontFamily: "Open Sans", // Ensure this font is imported or available globally
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  cursor: "pointer", // Add this if the item is clickable
  padding: "10px 0", // You can adjust padding as needed
  display: "flex", // Optional, if you need flex layout
  alignItems: "center", // Align items in the center
  justifyContent: "space-between", // Space between the content
  transition: "all 0.3s", // Smooth transition for interactions
  // // "&:hover": {
  // //   color: theme.colors.primary.main, // Adjust hover color
  // //   backgroundColor: "#ecf0f1", // Hover background color
  // // },
}));

export const List = styled("ul")({
  padding: 0,
  marginBottom: "1.5rem",
  // backgroundColor: "#f7f7f7",
  // borderRadius: "8px",
  // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
});

export const DropdownIcon = styled.img`
  display: flex;
  width: 13.514px;
  height: 8px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

// Product Card Styles
export const ProductCardStyled = styled.div`
  display: flex;
  width: 277px;
  flex-direction: column;
  align-items: flex-end;
  gap: 32px;
`;

// New Styles for the dropdown items that appear when clicked
export const DropdownText = styled(ListItem)`
  color: "var(--KF-BG-Black, #000)",
  fontFamily: "Open Sans", 
  font-size: 14px;
  lineHeight: "normal",
  fontStyle: "normal",
  fontWeight: 400,
  padding: 5px 0;
  cursor: pointer;
  margin-left: 20px;
 
`;

// Style for the checkboxes
export const CheckboxLabel = styled.label`
  display: block;
  font-size: 14px;
  color: "var(--KF-BG-Dark-Blue, #003366)",;
  cursor: pointer;
  padding-left: 24px;
  position: relative;
  line-height: 1.5;
  margin-bottom: 8px;

  input[type="checkbox"] {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    accent-color: "var(--KF-BG-Dark-Blue, #003366)",; // Style the checkbox to match the blue color
  }

  

  /* Checkmark style for checked boxes */
  input[type="checkbox"]:checked + span {
    color: "var(--KF-BG-Dark-Blue, #003366)",;
  }
`;

// New Style for the h5 service-type-title
export const ServiceTypeTitle = styled.h5`
  color: var(--KF-BG-Dark-Blue, #002180);
  font-family: "Open Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
`;

// New Style for the h4 "Showing 1-9 of 90 Services"
export const ShowingText = styled.h4`
  color: var(--KF-BG-Dark-Blue, #002180);
  // margin-top: 10px; 
  font-family: "Open Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 150px ; 
`;