type User = {
  _id: string;
  email: string;
  username?: string;
  role: "EDITOR" | "OWNER";
};