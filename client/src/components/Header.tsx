import { AppBar, Toolbar } from "@mui/material";
import Logo from "./utils/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./utils/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                to="/chat"
                bg="#00fffc"
                text="Go to Chat"
                textColor="black"
                onClick={function (): Promise<void> {
                  throw new Error("Function not implemented.");
                }}
              />
              <NavigationLink
                to="/chat"
                bg="#51538f"
                text="Logout"
                textColor="black"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                to="/login"
                bg="#00fffc"
                text="Login"
                textColor="black"
                onClick={function (): Promise<void> {
                  throw new Error("Function not implemented.");
                }}
              />
              <NavigationLink
                to="/signup"
                bg="#51538f"
                text="Signup"
                textColor="black"
                onClick={function (): Promise<void> {
                  throw new Error("Function not implemented.");
                }}
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
