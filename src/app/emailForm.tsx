"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewUser } from "@/server/actions";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export const EmailForm: React.FC = () => {
  const [state, formAction] = useFormState(createNewUser, {});

  return (
    <div className="w-full max-w-sm space-y-2">
      <form className="flex space-x-2" action={formAction}>
        <div className="flex flex-col space-y-1">
          <Input
            className="max-w-lg flex-1"
            placeholder="Enter your email"
            name="email"
            type="email"
          />
          {state.errors?.email && (
            <p className="text-sm text-destructive">{state.errors.email}</p>
          )}
        </div>
        <SubmitButton />
      </form>
      {state.errors?.server && (
        <p className="text-sm text-destructive">{state.errors.server}</p>
      )}
      {state.message && <p className="text-base ">{state.message}</p>}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Sign up to get notified when new cats are available.
        <Link className="underline underline-offset-2" href="#">
          Terms & Conditions
        </Link>
      </p>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Get Notified
    </Button>
  );
};
