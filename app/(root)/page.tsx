import React from "react";
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  console.log(session);

  return <div>Welcome to our DevOverflow application</div>;
};
export default Home;
