// app/providers.js
"use client";
import { env } from "@/env";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}
export const CSPostHogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};
