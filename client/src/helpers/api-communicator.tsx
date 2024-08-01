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

//logoutuser
export const logoutUser = async () => {
  try {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to logout");
    }
    return res.data; // no need for await here
  } catch (error) {
    console.error(error);
    throw new Error("Logout failed");
  }
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
export const SendCHatRequest = async (message: string) => {
  const res = await axios.post("/chats/new", { message });
  if (res.status !== 200) {
    throw new Error("unable to send chat");
  }
  const data = await res.data;
  console.log(data);
  return data;
};
//get user chats
export const getuserchat = async () => {
  const res = await axios.get("/chats/all-chats");
  if (res.status !== 200) {
    throw new Error("unable to get chats");
  }
  const data = await res.data;
  console.log(data);
  return data;
};
//delete chats
export const deletechats = async () => {
  const res = await axios.delete("/chats/delete-chats");
  if (res.status !== 200) {
    throw new Error("unable to delete chats");
  }
  const data = await res.data;
  console.log(data);
  return data;
};
