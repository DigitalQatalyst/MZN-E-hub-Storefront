import Box from "@component/Box";
import Typography, { H3, H5, H6 } from "@component/Typography";

export default function ProductDescription() {
  return (
    <div>
      <Box ml="40px" borderBottom="EFF" borderLeft="none" borderTop="none" borderRight="none">
        <H6 mb="4rem" mt="60px" color="#EFF">The following documents must be submitted during the application</H6>
        <Box mb="20px" borderBottom="2px solid rgba(153, 178, 255, 0.50)" borderLeft="none" borderTop="none" borderRight="none"><Typography>
          <H6 mb="1rem" color="#FFFFFF">1. Passport</H6>
        </Typography></Box>
        <Typography >
          <Box mt="40px" borderBottom="2px solid rgba(153, 178, 255, 0.50)" borderLeft="none" borderTop="none" borderRight="none"><Typography>
            <H6 mb="1rem" color="#FFFFFF">2. Family book</H6>
          </Typography></Box>
        </Typography>
        <Typography >
          <Box mt="40px" borderBottom="2px solid rgba(153, 178, 255, 0.50)" borderLeft="none" borderTop="none" borderRight="none"><Typography>
            <H6 mb="1rem" color="#FFFFFF">3. Salary credentials or proof of income not older than 3 months</H6>
          </Typography></Box>
        </Typography>
        
      </Box>
    </div>
  );
}