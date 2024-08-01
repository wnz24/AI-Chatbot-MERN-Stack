import { Box, Button, Typography } from "@mui/material";
import robot from "../../public/airobot.png";
import CustomizedInputField from "../components/utils/CustomizedInputField";
import { LuLogIn } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {

  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      toast.loading("Logging In", { id: "1" });
      await auth?.login(email as string, password as string);
      toast.success("Logged In", { id: "1" });
      navigate("/chat");
    } catch (error) {
      toast.error("Invalid Credentials", { id: "1" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth]);

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
          onSubmit={handleSubmit}
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
                color: "black",
                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<LuLogIn />}
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
