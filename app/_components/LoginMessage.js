import Link from "next/link";
import React from "react";

const LoginMessage = () => {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        Proszę{" "}
        <Link
          href="/login"
          className="underline text-accent-500"
        >
          zalogować się
        </Link>{" "}
        by zarezerwować mieszkanie.
      </p>
    </div>
  );
};

export default LoginMessage;
