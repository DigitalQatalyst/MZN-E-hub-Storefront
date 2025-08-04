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

// export const List = styled("ul")({
//   padding: 0,
//   marginBottom: "1.5rem",
//   // backgroundColor: "#f7f7f7",
//   // borderRadius: "8px",
//   // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
// });

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
`;

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
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    width: 1.25rem; // Changed to rem for scalability (20px equivalent)
    height: 1.25rem; // Changed to rem for scalability (20px equivalent)
    margin-right: 0.5rem;
    background-image: url("/assets/images/non_financial_marketplace/Checkbox.svg");
    background-size: 100% 100%; // Force uniform scaling to fill the container
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    border-radius: 4px;
    flex-shrink: 0; // Prevent shrinking

    &:checked {
      background-image: url("/assets/images/non_financial_marketplace/check.svg");
      background-color: #002180;
      background-size: 100% 100%; // Force uniform scaling for checked state
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 4px;
    }
  }

  label {
    font-size: 14px;
    color: #333;
    flex-grow: 1; // Allow label to grow and push checkbox to consistent size
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