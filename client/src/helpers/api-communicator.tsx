import axios from "axios";
//Login user 
export const loginuser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("unable to login");
  }
  const data = await res.data;
  return data;
};

//Signup user
export const signupuser = async (name: string, email: string, password: string) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 200) {
    throw new Error("unable to signup");
  }
  const data = await res.data;
  return data;
};

//checkAuthStatus
export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("unable to authenticate");
  }
  const data = await res.data;
  return data;
};

//SendCHatRequest
export const SendCHatRequest = async (message:string) => {
  const res = await axios.post("/chats/new",{ message });
  if (res.status !== 200) {
    throw new Error("unable to send chat");
  }
  const data = await res.data;
  console.log(data)
  return data;
};
