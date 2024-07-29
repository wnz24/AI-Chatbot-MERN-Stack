import { Avatar, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import Chat_Item from "../components/chat/Chat_Item";
import { IoMdSend } from "react-icons/io";
import { useRef, useState } from "react";
import { SendCHatRequest } from "../helpers/api-communicator";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const auth = useAuth();

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatdata = await SendCHatRequest(content);
    setChatMessages([...chatdata.chats]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", p: 2 }}>
      <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100vh" }}>
        <Box
          sx={{
            display: { md: "flex", xs: "none", sm: "none" },
            flex: 0.2,
            flexDirection: "column",
            mt: 9.5,
            mr: 6, // Added margin-right for spacing between left and right box
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "60vh",
              bgcolor: "rgb(17,29,39)",
              borderRadius: 5,
              flexDirection: "column",
              mx: 3,
              p: 2,
            }}
          >
            <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700 }}>
              {auth?.user?.name[0]}
            </Avatar>
            <Typography sx={{ mx: "auto", fontFamily: "Work Sans", textAlign: "center" }}>
              You are talking to a Chatbot
            </Typography>
            <Typography sx={{ mx: "auto", fontFamily: "Work Sans", my: 4, p: 3, textAlign: "center" }}>
              Welcome to our AI Chatbot! Ask me anything from tech support and news updates to math problems and trivia. I'm here to assist with weather updates, programming tips, or just friendly conversation. Let's chat!
            </Typography>
            <Button
              sx={{
                width: "200px",
                my: "auto",
                color: "white",
                fontWeight: 700,
                borderRadius: 3,
                mx: "auto",
                bgcolor: red[300],
                "&:hover": { bgcolor: red.A200 },
              }}
            >
              Clear Conversation
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: { md: 0.78, xs: 1, sm: 1 },
            flexDirection: "column",
            ml: 2, // Margin-left for spacing between left and right box
            mr: 4, // Margin-right for spacing between right box and its right side
          }}
        >
          <Typography sx={{ mx: "auto", textAlign: "center", fontSize: "40px", color: "white" }}>
            Model-GPT-3.5-Turbo
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "calc(100% - 80px)", // Dynamically adjust height
              borderRadius: 3,
              // mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              p: 2,
              bgcolor: "rgb(17,29,39)",
              mt: 2,
            }}
          >
            {chatMessages.map((chat, index) => (
              <Chat_Item content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>
          <Box
            sx={{
              width: "100%",
              p: 2,
              borderRadius: 1,
              bgcolor: "rgb(17,27,39)",
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <TextField
              type="text"
              inputRef={inputRef}
              variant="outlined"
              placeholder="Type your message..."
              fullWidth
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "transparent",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(17,27,39)",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <IconButton onClick={handleSubmit} sx={{ ml: 2, color: "white" }}>
              <IoMdSend />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
