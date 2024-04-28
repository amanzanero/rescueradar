import React from "react";
import { EmailForm } from "./emailForm";

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Rescue Radar
            </h1>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
              Sign up to receive an email notification when new cats are
              available for adoption at the San Francisco SPCA.
            </p>
          </div>
          <EmailForm />
        </div>
      </div>
    </section>
  );
}
