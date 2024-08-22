import React from "react";
import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">Zaloguj się do swojego panelu</h2>
      <SignInButton />
    </div>
  );
};

export default Page;
