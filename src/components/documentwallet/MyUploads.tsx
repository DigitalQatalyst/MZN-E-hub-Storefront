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
import { files, uploading, uploads } from "./files";
import Stack from "@mui/material/Stack";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const MyUploads = () => {
  // mu linear progress
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#1849D6",
      ...theme.applyStyles("dark", {
        backgroundColor: "#000",
      }),
    },
  }));

  const CustomizedProgressBars = ({ value }: { value: number }) => {
    return (
      <Stack spacing={2} sx={{ flexGrow: 1, width: "400px" }}>
        <BorderLinearProgress
          variant="determinate"
          color="primary"
          value={value}
        />
      </Stack>
    );
  };
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
          Uploads
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
          Files you have uploaded are here
        </Typography>
      </Box>

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

        <Box
          sx={{
            paddingY: "12px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              paddingY: "12px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "22px",
                color: "rgba(0, 0, 0, 0.8)",
              }}
            >
              All Uploads
            </Typography>
          </Box>
          {/* grid */}
          <Grid container spacing={6} gap={6}>
            {uploads.map((file) => {
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
          gap: "16px",
        }}
      >
        <img src="/images/backup.svg" width={24} height={24} alt="" />
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
            backgroundColor: "#D9EEFF",
          }}
        >
          Select Files
        </button>
      </Box>

      {/* recent activity area */}
      <Box
        sx={{
          paddingY: "24px",
          width: "100%",
          height: "auto",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "22px",
            marginBottom: "12px",
          }}
        >
          Uploading Files
        </Typography>

        <Box
          sx={{
            width: "100%",
          }}
        >
          {uploading.map((upload) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingY: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    gap: "10px",
                  }}
                >
                  <img
                    src={
                      upload?.type !== "document"
                        ? "/images/jpg.png"
                        : "/images/picture_as_pdf.svg"
                    }
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 300,
                        lineHeight: "22px",
                        color: upload?.status === "failed" ? "red" : "#00140E",
                      }}
                    >
                      {upload?.filename}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: upload?.status === "failed" ? "red" : "#AFAFAF",
                      }}
                    >
                      {upload.status === "failed"
                        ? "File too large.Failed"
                        : upload?.size}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {/*  */}
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <CustomizedProgressBars value={upload?.progress} />
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#AFAFAF",
                      }}
                    >
                      {upload?.progress}%
                    </Typography>
                  </Box>
                  <img
                    src={
                      upload?.status === "uploading" ||
                      upload?.status === "failed"
                        ? "/images/delete.svg"
                        : "/images/highlight_off.svg"
                    }
                    width={24}
                    height={24}
                    alt=""
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default MyUploads;
