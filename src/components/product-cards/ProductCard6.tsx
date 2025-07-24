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
    <Box
      style={{
        width: "546px",
        maxWidth: "100%",
        boxSizing: "border-box"
      }}
    >
      <Card
        style={{
          padding: "20px 21px 20px 20px",
          height: "auto",
          minHeight: "200px",
          width: "546px",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "4px",
          boxSizing: "border-box",
          overflow: "hidden",
          backgroundColor: "#FFF",
          borderRadius: "8px",
          border: "0.5px solid #D1D1D1",
          boxShadow: "none"
        }}
        hoverEffect
      >
        <Box>
          <H4
            style={{
              margin: 0,
              fontWeight: "700",
              lineHeight: "1.4",
              color: "#333",
              wordWrap: "break-word",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical"
            }}
          >
            {title}
          </H4>

          <H5
            style={{
              margin: 0,
              marginTop: "1rem",
              fontWeight: "400",
              lineHeight: "1.6",
              color: "#666",
              whiteSpace: "normal",
              wordBreak: "break-word",
              wordWrap: "break-word",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical"
            }}
          >
            {subtitle}
          </H5>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductCard6;