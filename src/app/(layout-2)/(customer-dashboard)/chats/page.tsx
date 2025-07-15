"use client";
import Box from "@component/Box";
import Typography from "@component/Typography";
import {
  ChevronLeft,
  PhoneCall,
  Search,
  VideoIcon,
  Send,
  Paperclip,
  Smile,
  Mic,
  MicIcon,
  Image,
} from "lucide-react";
import React, { Fragment, useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical, BsCheck2All } from "react-icons/bs";
import { chats } from "./constants";
import { Input, IconButton, Avatar } from "@mui/material";
import { format } from "date-fns";
import { Button } from "@component/buttons";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(chats);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1, // Use sequential ID to match existing pattern
      name: "You", // Add the name field to match the expected type
      message: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      usertype: "sender" as const,
    };

    setChatMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      // Scroll to bottom after state update
      setTimeout(() => {
        const container = document.querySelector(".messages-container");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 0);
      return updatedMessages;
    });
    setMessage("");
  };

  useEffect(() => {
    const container = document.querySelector(".messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages]);

  const formatTime = (dateString: string | Date) => {
    try {
      if (!dateString) return "";
      const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;
      if (isNaN(date.getTime())) return "";
      console.log("date", date);
      return format(date, "h:mm a").toLowerCase();
    } catch (e) {
      console.error("Error formatting date:", e);
      return "";
    }
  };
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
          marginLeft: "20px",
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

      {/* Main Chat Container */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 200px)",
          maxWidth: "1000px",
          margin: "0 auto",
          border: "1px solid #e0e0e0",
          borderRadius: "0px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Chat Header */}
        <Box
          style={{
            backgroundColor: "#ffffff",
            padding: "16px 24px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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

        {/* Messages Container */}
        <Box
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#ffffff",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            minHeight: 0,
            position: "relative",
          }}
        >
          <div
            ref={messagesEndRef}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          ></div>
          {chatMessages.map((chat) => {
            const isSender = chat.usertype === "sender";
            return (
              <Box key={chat.id} style={{ width: "100%" }}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isSender ? "flex-start" : "flex-end",
                    marginBottom: "12px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: isSender ? "row" : "row-reverse",
                      alignItems: "flex-start",
                      gap: "8px",
                      maxWidth: "80%",
                    }}
                  >
                    {isSender ? (
                      <Avatar
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="You"
                        sx={{
                          width: 26,
                          height: 26,
                          alignSelf: "flex-start",
                          marginBottom: "2px",
                        }}
                      />
                    ) : (
                      <Avatar
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Manor Hassan"
                        sx={{
                          width: 26,
                          height: 26,
                          alignSelf: "flex-start",
                          marginBottom: "2px",
                        }}
                      />
                    )}
                    <Box
                      style={{
                        backgroundColor: "transparent",
                        color: isSender ? "#1D2939" : "#FFFFFF",

                        maxWidth: "100%",
                        wordWrap: "break-word",

                        position: "relative",

                        fontFamily: "Inter",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 400,
                      }}
                    >
                      <Box
                        style={{
                          backgroundColor: isSender ? "#F6F6F6" : "#E5EAFC",
                          color: isSender ? "#1D2939" : "#4B465C",
                          padding: "12px 16px",
                          borderRadius: isSender
                            ? "0px 16px 16px 16px"
                            : "16px 0px 16px 16px",
                          maxWidth: "100%",
                          wordWrap: "break-word",
                          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                          position: "relative",
                          border: isSender ? "1px solid #EAECF0" : "none",
                          fontFamily: "Inter",
                          fontSize: "14px",
                          lineHeight: "20px",
                          fontWeight: 400,
                        }}
                      >
                        <Typography fontSize="14px" lineHeight="1.5">
                          {chat.message}
                        </Typography>
                      </Box>
                      {chat.time && (
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: isSender
                              ? "flex-start"
                              : "flex-end",
                            gap: "4px",
                            marginTop: "4px",
                          }}
                        >
                          <Typography
                            fontSize="10px"
                            color={isSender ? "gray" : "black"}
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 400,
                              lineHeight: "14px",
                            }}
                          >
                            {chat.time}
                            {!isSender && (
                              <span
                                style={{
                                  marginLeft: "4px",
                                  display: "inline-flex",
                                }}
                              >
                                <BsCheck2All size={12} color="#28C76F" />
                              </span>
                            )}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        <div ref={messagesEndRef} style={{ flexShrink: 0 }} />

        {/* Message Input */}
        <Box
          style={{
            backgroundColor: "#ffffff",
            padding: "16px 24px",
            borderTop: "none",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              boxShadow: "0px 3px 3px 2px rgba(16, 24, 40, 0.05)",
            }}
          >
            {/* <IconButton style={{ color: "#667085" }}>
            <Paperclip size={20} />
          </IconButton> */}
            <form
              onSubmit={handleSendMessage}
              style={{
                flex: 1,
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Input
                fullWidth
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disableUnderline
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "10px 20px",
                  fontSize: "14px",
                }}
                endAdornment={
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {/* <IconButton style={{ color: "#667085" }}>
                    <MicIcon size={20} />
                  </IconButton>
                  <IconButton style={{ color: "#667085" }}>
                    <Image size={20} />
                  </IconButton> */}
                  </Box>
                }
              />
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <IconButton style={{ color: "#667085" }}>
                  <MicIcon size={20} />
                </IconButton>
                <IconButton style={{ color: "#667085" }}>
                  <Image size={20} />
                </IconButton>
              </Box>
              <Button
                type="submit"
                style={{
                  backgroundColor: message.trim() ? "#7367F0" : "#E5EAFC",
                  color: "white",
                  width: "60px",
                  height: "30px",
                  padding: "2px",
                  border: "none",
                }}
              >
                {message.trim() ? "Send" : "Send"}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ChatPage;
