"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewUser } from "@/server/actions";
import { useFormState, useFormStatus } from "react-dom";

export const EmailForm: React.FC = () => {
  const [state, formAction] = useFormState(createNewUser, {});

  return (
    <div className="w-full max-w-md space-y-2">
      <form className="flex-col space-y-2" action={formAction}>
        <div className="flex-col space-y-2 sm:flex sm:flex-row sm:space-x-2 sm:space-y-0">
          <Input
            className="max-w-lg flex-1"
            placeholder="Enter your email"
            name="email"
            type="email"
          />
          <SubmitButton />
        </div>
        {state.errors?.email && (
          <p className="text-sm text-destructive">{state.errors.email}</p>
        )}
      </form>
      {state.errors?.server && (
        <p className="text-sm text-destructive">{state.errors.server}</p>
      )}
      {state.message && (
        <p className="text-base text-muted-foreground">{state.message}</p>
      )}
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="default"
      disabled={pending}
      loading={pending}
    >
      Get Notified
    </Button>
  );
};
