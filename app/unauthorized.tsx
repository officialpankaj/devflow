import React from "react";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const Unauthorized = () => {
  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>
        Please <Link href={ROUTES.SIGN_IN}>sign in</Link> to view your account.
      </p>
    </main>
  );
};
export default Unauthorized;
