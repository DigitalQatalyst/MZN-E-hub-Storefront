import { Box, Typography } from "@mui/material";
import { UploadCloud } from "lucide-react";
import React from "react";

const Overview = () => {
  return (
    <Box>
      <Box
        sx={{
          paddingY: "24px",
        }}
      >
        <Typography
          sx={{
            color: "#000",
            textAlign: "start",
            fontFeatureSettings: "liga,clig",
            fontFamily: "Inter",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "22px",
          }}
        >
          My Wallet
        </Typography>
      </Box>

      {/* image upload area */}
      <Box
        sx={{
          backgroundColor: "#fff",
          height: "200px",
          borderRadius: "8px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <UploadCloud size={20} color="grey" />
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "22px",
          }}
        >
          Drag & drop some files here, or click to select files
        </Typography>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "22px",
          }}
        >
          Support various file types (PDF, DOCX, Images, etc.)
        </Typography>
        <button
          style={{
            padding: "8px 16px",
            border: "1px solid lightgray",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Select Files
        </button>
      </Box>
    </Box>
  );
};

export default Overview;
