import Link from "next/link";
import React from "react";

export default function ConfirmationPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl font-bold">
          Your email is confirmed!
        </h1>
        <p className="text-center text-lg">
          You will now receive updates from us.
        </p>
        <Link href="/" className="mt-4 text-lg text-blue-500">
          Back to home
        </Link>
      </div>
    </div>
  );
}
