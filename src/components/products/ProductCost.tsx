import Box from "@component/Box";
import Typography, { H3, H5, H6 } from "@component/Typography";

export default function ProductDescription() {
    return (
        <Box ml="40px" mt="80px">

            <Typography >
                <Box mt="40px" borderLeft="none" borderTop="none" borderRight="none"><Typography>
                    <H6 mb="1rem" color="#OOO">No cost</H6>
                </Typography></Box>
            </Typography>
        </Box>

    );
}