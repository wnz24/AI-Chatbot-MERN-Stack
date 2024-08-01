import { Box, Typography, IconButton } from "@mui/material";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          width: "100%",
          padding: 3,
          minHeight: "30vh",
          backgroundColor: "#282c34",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Welcome to Our Chatbot!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: "center", maxWidth: "600px", fontSize: '18px' }}>
          We are here to assist you 24/7 with our AI-powered chatbot. Feel free to ask any questions, and we’ll be happy to help!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: "white", mx: 1 }}>
            <FaFacebook />
          </IconButton>
          <IconButton href="https://www.twitter.com" target="_blank" sx={{ color: "white", mx: 1 }}>
            <FaTwitter />
          </IconButton>
          <IconButton href="https://www.linkedin.com" target="_blank" sx={{ color: "white", mx: 1 }}>
            <FaLinkedin />
          </IconButton>
          <IconButton href="https://www.github.com" target="_blank" sx={{ color: "white", mx: 1 }}>
            <FaGithub />
          </IconButton>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
