import Box from "@component/Box";
import Typography, { H3, H5, H6 } from "@component/Typography";

export default function ProductDescription() {
    return (
        <Box ml="40px" mt="80px" borderBottom="EFF" borderLeft="none" borderTop="none" borderRight="none">

            <Typography >
                <Box mt="40px" borderBottom="2px solid rgba(153, 178, 255, 0.50)" borderLeft="none" borderTop="none" borderRight="none"><Typography>
                    <H6 mb="1rem" color="#FFFFFF">No cost</H6>
                </Typography></Box>
            </Typography>
        </Box>

    );
}