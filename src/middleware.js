import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
export default auth(function middleware(req) {
  // Your custom middleware logic goes here
});
