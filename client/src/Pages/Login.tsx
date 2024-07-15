import { Box, Button, Typography } from "@mui/material";
import robot from "../../public/airobot.png";
import CustomizedInputField from "../components/utils/CustomizedInputField";

const Login = () => {
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box padding={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src={robot} alt="Robot" style={{ width: "300px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={4}
      >
        <form
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>
              Login
            </Typography>
            <CustomizedInputField type="email" name="email" label="email" />
            <CustomizedInputField type="password" name="password" label="password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00ffcc",
                color:"black",
                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
