import Box from "@component/Box";
import Card from "@component/Card";
import { Chip } from "@component/Chip";
import NextImage from "@component/NextImage";
import { H2, H4, H5 } from "@component/Typography";
import styled from "styled-components";
 
// ===========================================================================
type ProductCard6Props = {
  title: string;
  imgUrl: string;
  subtitle: string;
};
// ===========================================================================
 
// Responsive Card wrapper
const ResponsiveCard = styled(Card)`
  display: flex;
  width: 100%;
  max-width: 546px;
  padding: 20px 21px 20px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  border-radius: 8px;
  border: 0.5px solid #D1D1D1;
  background-color: var(--KF-BG-White, #FFF);
  min-height: 200px;
  box-sizing: border-box;
 
  /* Desktop and large screens */
  @media (min-width: 1200px) {
    width: 546px;
  }
 
  /* Large tablets and small desktops */
  @media (max-width: 1199px) and (min-width: 992px) {
    width: 100%;
    max-width: 480px;
  }
 
  /* Tablets */
  @media (max-width: 991px) and (min-width: 768px) {
    width: 100%;
    max-width: 400px;
    padding: 18px;
    min-height: 180px;
  }
 
  /* Large mobile devices */
  @media (max-width: 767px) and (min-width: 480px) {
    width: 100%;
    max-width: 350px;
    padding: 16px;
    min-height: 160px;
  }
 
  /* Small mobile devices */
  @media (max-width: 479px) {
    width: 100%;
    max-width: 280px;
    padding: 14px;
    min-height: 140px;
    gap: 8px;
  }
`;
 
// Responsive title
const ResponsiveTitle = styled(H4)`
  font-weight: 700;
 
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.3;
  }
 
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.2;
  }
`;
 
// Responsive subtitle
const ResponsiveSubtitle = styled(H5)`
  font-weight: 400;
  white-space: normal;
  word-break: break-word;
  margin-top: 1rem;
 
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
    margin-top: 0.75rem;
  }
 
  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.3;
    margin-top: 0.5rem;
  }
`;
 
const ProductCard6 = ({ title, subtitle, imgUrl }: ProductCard6Props) => {
  return (
    <ResponsiveCard>
      <Box width="100%">
        <ResponsiveTitle>{title}</ResponsiveTitle>
        <ResponsiveSubtitle>
          {subtitle}
        </ResponsiveSubtitle>
      </Box>
    </ResponsiveCard>
  );
};
 
export default ProductCard6;
 