import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import robot from "../../public/robot.png";
import openai from "../../public/openai.png";
import chat from "../../public/chat.png";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        justifyContent: "flex-start",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5, // Margin bottom to create space between TypingAnim and images
        }}
      >
        <TypingAnim />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: { md: "row", xs: "column" },
          gap: 3, // Add some gap between images
        }}
      >
        <img src={robot} alt="robot" style={{ width: "200px", margin: "auto" }} />
        <img
          className="image-inverted rotate"
          src={openai}
          alt="openai"
          style={{ width: "200px", margin: "auto" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: 5,
        }}
      >
        <img
          src={chat}
          alt="chatbot"
          style={{
            width: isBelowMd ? "80%" : "60%", // Responsive width
            borderRadius: 20,
            boxShadow: "-5px -5px 105px #64f3d5",
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
