import Grid from "@component/grid/Grid";
import { Box, Typography } from "@mui/material";
import {
  DotSquare,
  EllipsisVertical,
  File,
  FunnelIcon,
  Trash,
  UploadCloud,
} from "lucide-react";
import React from "react";
import { BiVerticalCenter } from "react-icons/bi";
import { files } from "./files";

const MyDownloads = () => {
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
          Downloads
        </Typography>
      </Box>

      {/* search area */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingY: "24px",
        }}
      >
        <Box>
          <input
            type="text"
            placeholder="Search files by name"
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid divider",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FunnelIcon size={15} color="grey" />
          <Box>
            <select
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid divider",
              }}
            >
              <option value="all">All</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="images">Images</option>
            </select>
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
          My Files
        </Typography>

        <Box
          sx={{
            paddingY: "12px",
            width: "100%",
          }}
        >
          {/* grid */}
          <Grid container spacing={6} gap={6}>
            {files.map((file) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "250px",
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "12px",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <EllipsisVertical size={20} color="grey" />
                    </Box>
                    <Box
                      sx={{
                        padding: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "12px",
                        height: "100px",
                        width: "100px",
                        borderRadius: "24px",
                        backgroundColor: "#D9EEFF",
                      }}
                    >
                      {/* svg file */}
                      <img
                        src={
                          file?.type === "document"
                            ? "/images/news.svg"
                            : "/images/photo.svg"
                        }
                        width={64}
                        height={64}
                        alt=""
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "22px",
                        color: "#00140E",
                      }}
                    >
                      {file?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 300,
                        textAlign: "center",
                        lineHeight: "22px",
                        color: "#00140E",
                      }}
                    >
                      {file?.date} - {file?.size}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      {/* recent activity area */}
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
          Folders
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
            marginTop: "16px",
          }}
        >
          Group your uploaded files into folders
        </Typography>
      </Box>

      {/* my files area */}
      <Box
        sx={{
          width: "100%",
          height: "auto",
          paddingY: "12px",
        }}
      >
        <Box
          sx={{
            paddingY: "12px",
            width: "100%",
          }}
        >
          <Grid container spacing={6} gap={6}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  width: "100%",
                  height: "250px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "12px",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    cursor: "pointer",
                  }}
                >
                  <EllipsisVertical size={20} color="grey" />
                </Box>
                <Box
                  sx={{
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "12px",
                    height: "100px",
                    width: "100px",
                    borderRadius: "24px",
                    backgroundColor: "#D9EEFF",
                  }}
                >
                  {/* svg file */}
                  <img src="/images/folder.svg" width={64} height={64} alt="" />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                    color: "#00140E",
                  }}
                >
                  Reports
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 300,
                    textAlign: "center",
                    lineHeight: "22px",
                    color: "#00140E",
                  }}
                >
                  Created on Jun 23, 2024
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  width: "100%",
                  height: "250px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "12px",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    cursor: "pointer",
                  }}
                >
                  <EllipsisVertical size={20} color="grey" />
                </Box>
                <Box
                  sx={{
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "12px",
                    height: "100px",
                    width: "100px",
                    borderRadius: "24px",
                    backgroundColor: "#D9EEFF",
                  }}
                >
                  {/* svg file */}
                  <img src="/images/folder.svg" width={64} height={64} alt="" />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                    color: "#00140E",
                  }}
                >
                  Form Documents
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 300,
                    textAlign: "center",
                    lineHeight: "22px",
                    color: "#00140E",
                  }}
                >
                  Created on Jun 27, 2024
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "12px",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    cursor: "pointer",
                  }}
                >
                  <EllipsisVertical size={20} color="grey" />
                </Box>
                <Box
                  sx={{
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "12px",
                    height: "100px",
                    width: "100px",
                    borderRadius: "24px",
                    backgroundColor: "#D9EEFF",
                  }}
                >
                  {/* svg file */}
                  <img src="/images/add.svg" width={64} height={64} alt="" />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                    color: "#00140E",
                  }}
                >
                  Create Folder
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default MyDownloads;
