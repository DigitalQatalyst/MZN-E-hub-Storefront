import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Typography from "@component/Typography";
import {
  ChevronLeft,
  Image,
  PhoneCall,
  Search,
  User,
  VideoIcon,
} from "lucide-react";
import React, { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { chats } from "./constants";
import { Input } from "@mui/material";
import { FaMicrophone } from "react-icons/fa";

const page = () => {
  return (
    <Fragment>
      <Box
        style={{
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            gap: "8px",
          }}
        >
          <ChevronLeft color="#002180" size={30} />

          <Typography fontSize="14px" color="#002180" fontWeight="500">
            Back to Financial Records
          </Typography>
        </Box>
      </Box>

      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          gap: "12px",
          padding: "20px",
        }}
      >
        <Typography fontSize="16px" color="#000000" fontWeight="400">
          Your Application Progress
        </Typography>

        <button
          style={{
            border: 0,
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#CCD7FF",
          }}
        >
          <Typography fontSize="16px" color="#264FE8" fontWeight="500">
            In-Service Chat
          </Typography>
        </button>
      </Box>

      {/* chat box */}
      <Box
        style={{
          backgroundColor: "#fffff",
          width: "100%",
          borderTopRightRadius: "8px",
          borderTopLeftRadius: "8px",
          height: "80vh",
        }}
      >
        <Box
          style={{
            backgroundColor: "#ffffff",
            // backgroundColor: "#F4F7FB",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #DBDADE",

            padding: "10px 20px",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Box
              style={{
                position: "relative",
              }}
            >
              {/* user image */}
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
                alt=""
              />
              <Box
                style={{
                  position: "absolute",
                  bottom: "6px",
                  right: "2px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#28C76F",
                }}
              ></Box>
            </Box>
            <Box>
              <Typography fontSize="16px" color="#000000" fontWeight="400">
                Manor Hassan
              </Typography>
              <Typography fontSize="12px" color="text.hint">
                Ej Advisor
              </Typography>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PhoneCall size={20} color="grey" />
            <VideoIcon size={20} color="grey" />
            <Search size={20} color="grey" />
            <BsThreeDotsVertical size={20} color="grey" />
          </Box>
        </Box>

        {/* chat messages */}
        <Box
          style={{
            padding: "20px",
            width: "100%",
            backgroundColor: "#ffffff",
            height: "100%",
            overflowY: "hidden",
            position: "relative",
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For IE and Edge
          }}
          // sx={{
          //   "&::-webkit-scrollbar": {
          //     display: "none", // For Chrome, Safari
          //   },
          // }}
        >
          {chats.map((chat) => {
            const isSender = chat.usertype === "sender";
            return (
              <Box>
                <Box
                  key={chat.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: isSender ? "flex-start" : "flex-end",
                    gap: "8px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {/* Message bubble */}
                  {/* Sender image on right */}
                  {isSender && (
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                      }}
                      alt={chat.name}
                    />
                  )}
                  <Box
                    style={{
                      backgroundColor: isSender ? "#E6EAFC" : "#F6F6F6",
                      padding: "10px",
                      maxWidth: "300px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      borderRadius: isSender
                        ? "8px 0px 8px 8px"
                        : "0px 8px 8px 8px",
                    }}
                  >
                    <Typography
                      fontSize="14px"
                      color="#4B465C"
                      fontWeight="400"
                    >
                      {chat.message}
                    </Typography>
                  </Box>
                  {/* Receiver image on left */}
                  {!isSender && (
                    <img
                      src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                      }}
                      alt={chat.name}
                    />
                  )}
                </Box>
                {chat.time && (
                  <Typography fontSize="12px" color="text.hint">
                    {chat.time}
                  </Typography>
                )}
              </Box>
            );
          })}

          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              padding: "12px 20px",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Input
              disableUnderline
              placeholder="Type your message..."
              sx={{
                flex: 1,
                fontSize: "14px",
                backgroundColor: "#fffff",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                padding: "10px 16px",
              }}
            />

            <Box style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FaMicrophone size={20} color="grey" />
              <Image size={20} color="grey" />
              <button
                style={{
                  backgroundColor: "#7367F0",
                  borderRadius: "7px",
                  border: "none",
                  color: "white",
                  padding: "12px 20px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default page;
