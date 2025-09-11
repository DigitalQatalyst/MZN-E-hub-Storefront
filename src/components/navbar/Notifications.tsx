import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import Grid from "@component/grid/Grid";
import Box from "@component/Box";

export default function Notifications({ setNotifCenterShown, setNotifShown }) {
  const notifications = [
    {
      id: 1,
      icon: "../images/lock-open.svg",
      title: "Funding Milestone Unlocked",
      description: "Expansion Loan now in Credit Review.",
      timestamp: "1h ago",
      actionIcon: "../images/Ellipse 1.svg",
      actionSize: { width: "10px", height: "10px" },
    },
    {
      id: 2,
      icon: "../images/circle-check (2).svg",
      title: "Membership Granted",
      description: "FutureTech is a KF Gateway Member.",
      timestamp: "12h ago",
      actionIcon: "../images/Ellipse 1.svg",
      actionSize: { width: "10px", height: "10px" },
    },
    {
      id: 3,
      icon: "../images/file.svg",
      title: "Document Ready",
      description: "Q2 Performance Report uploaded.",
      timestamp: "June 18, 8:26 AM",
      actionIcon: "../images/x.svg",
      actionSize: { width: "16px", height: "16px" },
    },
    {
      id: 4,
      icon: "../images/id.svg",
      title: "SME Champion Badge Earned",
      description: "Growth Accelerator complete—badge awarded.",
      timestamp: "May 24, 10:30 AM",
      actionIcon: "../images/x.svg",
      actionSize: { width: "16px", height: "16px" },
    },
  ];

  const handleHover = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(75, 70, 92, 0.04)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const showNotifCenter = () => {
    setNotifShown((prev) => !prev);
    setNotifCenterShown((prev) => !prev);
  };

  const handleNotificationAction = (notificationId) => {
    // Handle notification action (dismiss, etc.)
    console.log(`Action for notification ${notificationId}`);
  };

  return (
    <Card
      style={{
        display: "flex",
        width: 340,
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "6px",
        boxShadow: "0 10px 20px 0 rgba(165, 163, 174, 0.40)",
        marginTop: "92px",
        position: "absolute",
        right: "10px",
        backgroundColor: "#ffffff",
      }}
    >
      <FlexBox
        style={{
          padding: "16px 24px",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "stretch",
        }}
      >
        <Typography color={"#344054"} fontSize={"16px"} fontWeight={"500"}>
          Notifications
        </Typography>
        <img src="../images/mail-opened.svg" alt="Mail icon" />
      </FlexBox>

      {/* Dynamic Notifications */}
      {notifications.map((notification) => (
        <Grid
          key={notification.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 4fr 0.5fr",
            width: "100%",
            padding: "16px 24px",
            cursor: "pointer",
            borderTop: "1px solid #DBDADE",
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <Box>
            <img
              src={notification.icon}
              alt={`${notification.title} icon`}
              style={{
                display: "flex",
                width: "38px",
                height: "38px",
                padding: "4px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "34px",
                background: "rgba(115, 103, 240, 0.16)",
              }}
            />
          </Box>
          <Box>
            <Typography
              style={{
                color: "#4B465C",
                fontSize: "15px",
                fontWeight: "500",
                lineHeight: "22px",
              }}
            >
              {notification.title}
            </Typography>
            <Typography
              style={{
                color: "#4B465C",
                fontSize: "13px",
                fontWeight: "400",
                lineHeight: "20px",
              }}
            >
              {notification.description}
            </Typography>
            <Typography
              style={{
                color: "#4B465C",
                fontSize: "13px",
                fontWeight: "400",
                lineHeight: "20px",
                opacity: "0.5",
              }}
            >
              {notification.timestamp}
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <img
              src={notification.actionIcon}
              alt="Action icon"
              style={{
                width: notification.actionSize.width,
                height: notification.actionSize.height,
                cursor: "pointer",
              }}
              onClick={() => handleNotificationAction(notification.id)}
            />
          </Box>
        </Grid>
      ))}

      {/* All notifications */}
      <FlexBox
        style={{
          padding: "8px 24px",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          cursor: "pointer",
          borderTop: "1px solid #DBDADE",
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={showNotifCenter}
      >
        <Typography
          style={{
            fontSize: "15px",
            fontWeight: "400px",
            lineHeight: "22px",
            color: "#7367F0",
            textAlign: "center",
          }}
        >
          View all notifications
        </Typography>
      </FlexBox>
    </Card>
  );
}
