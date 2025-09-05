import Grid from "@component/grid/Grid";
import { Box, Typography, Popover, Checkbox } from "@mui/material";
import {
  EllipsisVertical,
  FunnelIcon,
  RotateCcw,
  Search,
  Trash,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { deletedFiles as initialDeletedFiles } from "./files";

const MyBin = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [deletedFiles, setDeletedFiles] = useState(initialDeletedFiles);
  const [searchQuery, setSearchQuery] = useState("");

  // popover open/close
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    file: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedFile(null);
  };

  const open = Boolean(anchorEl);

  // checkbox toggle
  const toggleSelection = (fileName: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileName)
        ? prev.filter((name) => name !== fileName)
        : [...prev, fileName]
    );
  };

  // delete selected files
  const handleDeleteSelected = () => {
    setDeletedFiles((prev) =>
      prev.filter((file) => !selectedFiles.includes(file?.id?.toString()))
    );
    setSelectedFiles([]);
  };

  // search filter
  const filteredFiles = deletedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ paddingY: "24px" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "start",
            justifyContent: "space-between",
          }}
        >
          <Box>
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
                marginBottom: "12px",
              }}
            >
              Manage Bin
            </Typography>
            <Typography
              sx={{
                color: "#000",
                textAlign: "start",
                fontFeatureSettings: "liga,clig",
                fontFamily: "Inter",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "22px",
              }}
            >
              View and manage your files and folders from your bin
            </Typography>
          </Box>
          <Box>
            <button
              style={{
                color: "#FF4C51",
                border: "1px solid #FF4C51",
                padding: "15px 15px",
                borderRadius: "8px",
                fontSize: "15px",
              }}
              onClick={handleDeleteSelected}
              disabled={selectedFiles.length === 0}
            >
              Delete Selected Files
            </button>
          </Box>
        </Box>
      </Box>

      {/* my files area */}
      <Box
        sx={{
          width: "100%",
          height: "auto",
          paddingY: "12px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "22px",
          }}
        >
          All Downloads
        </Typography>

        <Box
          sx={{
            paddingY: "12px",
            width: "100%",
          }}
        >
          {/* grid */}
        </Box>
      </Box>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            minWidth: "300px",
            paddingY: "4px",
            backgroundColor: "#fff",
            position: "absolute",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "8px",
            minWidth: "150px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <RotateCcw size={16} color="grey" />
            <Typography
              sx={{
                padding: "8px",
                fontFamily: "Inter",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={() => {
                // restore logic here
                handlePopoverClose();
              }}
            >
              Restore
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Trash2 size={16} color="#FF4C51" />
            <Typography
              sx={{
                padding: "8px",
                fontFamily: "Inter",
                fontSize: "14px",
                cursor: "pointer",
                color: "#FF4C51",
              }}
              onClick={() => {
                if (selectedFile) {
                  setDeletedFiles((prev) =>
                    prev.filter((file) => file.name !== selectedFile.name)
                  );
                }
                handlePopoverClose();
              }}
            >
              Delete Permanently
            </Typography>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default MyBin;
