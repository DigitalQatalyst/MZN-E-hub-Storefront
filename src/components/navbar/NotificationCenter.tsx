import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Box from "@component/Box";
import Typography from "@component/Typography";
import { Button } from "@component/buttons";
import Container from "@component/Container";

export default function NotificationCenter({ setNotifCenterShown }) {
  const notifications = [
    {
      id: 1,
      icon: "../images/lock-open.svg",
      title: "Funding Milestone Unlocked",
      description: "Expansion Loan now in Credit Review.",
      timestamp: "1h ago",
    },
    {
      id: 2,
      icon: "../images/circle-check (2).svg",
      title: "Membership Granted",
      description:
        "FutureTech is a KF Gateway Member. Explore member-only grants and mentorship in Support Hub.",
      timestamp: "12h ago",
    },
    {
      id: 3,
      icon: "../images/file.svg",
      title: "Document Ready",
      description:
        "Q2 Performance Report uploaded. Open Documents , Financials to review and share now.",
      timestamp: "June 18, 8:26 AM",
    },
    {
      id: 4,
      icon: "../images/id.svg",
      title: "SME Champion Badge Earned",
      description:
        "Growth Accelerator complete—badge awarded. Badge is live on your profile, share it with the community.",
      timestamp: "May 24, 10:30 AM",
    },
  ];

  const handleHover = (e) => {
    e.currentTarget.style.border = "1px solid #0030E3";
    e.currentTarget.style.color = "#0030E3";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.border = "1px solid #D8E0E9";
    e.currentTarget.style.color = "#2B3445";
  };

  const handleNotifHover = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(238, 243, 255, 0.50)";
  };

  const handleNotifLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const hideNotifcenter = () => {
    setNotifCenterShown(false);
  };

  return (
    <Card
      style={{
        width: "1000px",
        margin: "10px auto",
        borderRadius: "6px",
        boxShadow: "0 10px 20px 0 rgba(165, 163, 174, 0.40)",
      }}
    >
      <Container
        style={{ padding: "32px 24px 32px 32px", backgroundColor: "#EEF3FF" }}
      >
        <FlexBox style={{ justifyContent: "flex-end" }}>
          <img
            src="../images/x.svg"
            alt="X icon"
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              flexShrink: "0",
            }}
            onClick={hideNotifcenter}
          />
        </FlexBox>
        <Box>
          <Typography
            style={{
              color: "#242424",
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "22px",
              marginBottom: "4px",
            }}
          >
            Notification Center
          </Typography>
          <Typography
            style={{
              color: "#242424",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "22px",
              marginBottom: "24px",
            }}
          >
            Manage all your notifications
          </Typography>
        </Box>

        {/* Buttons */}
        <FlexBox style={{ justifyContent: "space-between" }}>
          <Box style={{ display: "flex", gap: "8px" }}>
            <Button
              style={{
                padding: "4px 10px",
                borderRadius: "4px",
                border: "1px solid #0030E3",
                color: "#0030E3",
              }}
            >
              All
            </Button>
            <Button
              style={{
                padding: "4px 10px",
                borderRadius: "4px",
                border: "1px solid #D8E0E9",
                color: "#2B3445",
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            >
              Unread (2)
            </Button>
          </Box>
          <Box>
            <Button
              style={{
                padding: "4px 10px",
                borderRadius: "4px",
                border: "1px solid #D8E0E9",
                color: "#2B3445",
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            >
              Mark all as read
            </Button>
          </Box>
        </FlexBox>
      </Container>

      {/* Dynamic Notifications */}
      <Container>
        {notifications.map((notification) => (
          <Grid
            key={notification.id}
            style={{
              display: "grid",
              gridTemplateColumns: "0.5fr 12fr 3fr",
              width: "100%",
              padding: "16px 24px 16px 32px",
              cursor: "pointer",
              borderTop: "1px solid #DBDADE",
            }}
            onMouseEnter={handleNotifHover}
            onMouseLeave={handleNotifLeave}
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
            <Box style={{ paddingLeft: "8px" }}>
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
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <Button
                style={{
                  borderRadius: "4px",
                  border: "1px solid #D8E0E9",
                  fontSize: "13px",
                  padding: "4px 10px",
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
              >
                Mark as read
              </Button>
            </Box>
          </Grid>
        ))}
      </Container>
    </Card>
  );
}
