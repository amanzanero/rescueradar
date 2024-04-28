"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { unsubscribeUser } from "@/server/actions";
import { useFormState, useFormStatus } from "react-dom";

export const UnsubscribeForm: React.FC = () => {
  const [state, formAction] = useFormState(unsubscribeUser, {});
  return (
    <form className="w-full max-w-sm flex-col space-y-2" action={formAction}>
      <Input name="email" type="email" placeholder="Email" className="w-full" />
      <UnsubscribeButton />
      {state.errors !== undefined && (
        <p className="text-base text-destructive">
          {state.errors.email ?? state.errors.server}
        </p>
      )}
      {state.message !== undefined && (
        <p className="text-base">{state.message}</p>
      )}
    </form>
  );
};

const UnsubscribeButton: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="destructive"
      className="w-full"
      disabled={pending}
      loading={pending}
    >
      Unsubscribe
    </Button>
  );
};
