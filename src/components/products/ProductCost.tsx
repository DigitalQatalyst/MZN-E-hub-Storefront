import Box from "@component/Box";
import Typography, { H3, H5, H6 } from "@component/Typography";

export default function ProductDescription() {
    return (
        <Box ml="40px" mt="80px" borderBottom="EFF" borderLeft="none" borderTop="none" borderRight="none">
            
            <Box mb="60px" borderBottom="2px solid rgba(153, 178, 255, 0.50)" borderLeft="none" borderTop="none" borderRight="none" display="flex" justifyContent="space-between">
                <Typography color="#FFFFFF">Abu Dhabi Chamber Fees</Typography>
                <Typography color="#FFFFFF">AED 50</Typography>
            </Box>

            <Box mb="60px" borderBottom="2px solid rgba(153, 178, 255, 0.50)" borderLeft="none" borderTop="none" borderRight="none" display="flex" justifyContent="space-between">
                <Typography color="#FFFFFF">An additional amount of 100 each is calculated after 6 activities</Typography>
                <Typography color="#FFFFFF">AED 0</Typography>
            </Box>

            <Box mb="60px" borderBottom="2px solid rgba(153, 178, 255, 0.50)" borderLeft="none" borderTop="none" borderRight="none" display="flex" justifyContent="space-between">
                <Typography color="#FFFFFF">Commercial licence Issuance Fees</Typography>
                <Typography color="#FFFFFF">AED 10</Typography>
            </Box>

            <Box mb="60px" borderBottom="2px solid rgba(153, 178, 255, 0.50)" borderLeft="none" borderTop="none" borderRight="none" display="flex" justifyContent="space-between">
                <Typography color="#FFFFFF">Establishment Contract Notarization fees - Companies: 50</Typography>
                <Typography color="#FFFFFF">AED 0</Typography>
            </Box>
        </Box>

    );
}