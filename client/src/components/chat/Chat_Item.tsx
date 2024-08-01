import { Avatar, Box, Typography } from "@mui/material";
import openai from "../../../public/openai.png";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  const codeBlocks = [];
  let currentIndex = 0;
  while (currentIndex < message.length) {
    const start = message.indexOf("```", currentIndex);
    if (start === -1) {
      codeBlocks.push({ type: "text", content: message.slice(currentIndex) });
      break;
    }
    if (start > currentIndex) {
      codeBlocks.push({ type: "text", content: message.slice(currentIndex, start) });
    }
    const end = message.indexOf("```", start + 3);
    if (end === -1) {
      const codeBlockContent = message.slice(start + 3).trim();
      const [language, ...code] = codeBlockContent.split('\n');
      codeBlocks.push({ type: "code", content: code.join('\n'), language: language || "plaintext" });
      break;
    }
    const codeBlockContent = message.slice(start + 3, end).trim();
    const [language, ...code] = codeBlockContent.split('\n');
    codeBlocks.push({ type: "code", content: code.join('\n'), language: language || "plaintext" });
    currentIndex = end + 3;
  }
  return codeBlocks;
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes("[") ||
    str.includes(";") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

const Chat_Item = ({ content, role }: { content: string; role: "user" | "assistant" }) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        <img src={openai} alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {messageBlocks.map((block, index) =>
          block.type === "code" ? (
            <SyntaxHighlighter key={index} style={coldarkCold} language={block.language}>
              {block.content}
            </SyntaxHighlighter>
          ) : (
            <Typography key={index} fontSize={"20px"}>
              {block.content}
            </Typography>
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>{auth?.user?.name[0]}</Avatar>
      <Box>
        {messageBlocks.map((block, index) =>
          block.type === "code" ? (
            <SyntaxHighlighter key={index} style={coldarkCold} language={block.language}>
              {block.content}
            </SyntaxHighlighter>
          ) : (
            <Typography key={index} fontSize={"20px"}>
              {block.content}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default Chat_Item;
