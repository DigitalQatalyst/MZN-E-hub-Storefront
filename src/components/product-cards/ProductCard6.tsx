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
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box"
      }}
    >
      <Card
        style={{
          padding: "2rem",
          height: "auto",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          backgroundColor: "white",
          borderRadius: "16px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}
        hoverEffect
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.5rem",
            height: "100%"
          }}
        >
          <H4
            style={{
              margin: 0,
              lineHeight: "1.4",
              fontSize: "1.25rem",
              fontWeight: "700",
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
              lineHeight: "1.6",
              fontSize: "1rem",
              color: "#666",
              fontWeight: "400",
              wordWrap: "break-word",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              flex: 1
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