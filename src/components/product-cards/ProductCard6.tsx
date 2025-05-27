import Box from "@component/Box";
import Card from "@component/Card";
import { Chip } from "@component/Chip";
import NextImage from "@component/NextImage";
import { H2, H4, H5 } from "@component/Typography";

// ===========================================================================
type ProductCard6Props = {
  title: string;
  imgUrl: string;
  subtitle: string;
};
// ===========================================================================

const ProductCard6 = ({ title, subtitle, imgUrl }: ProductCard6Props) => {
  return (
    <Card
      display="flex"
      padding="20px 21px 20px 20px"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      style={{ gap: "4px" }}
      borderRadius={8}
      border="0.5px solid #D1D1D1"
      backgroundColor="var(--KF-BG-White, #FFF)"
      minHeight={200}
    >
      <Box>
        <H4 fontWeight={700}>{title}</H4>
        <H5 fontWeight={400} whiteSpace="normal" wordBreak="break-word" mt="1rem">
          {subtitle}
        </H5>
      </Box>
    </Card>
  );
};

export default ProductCard6;