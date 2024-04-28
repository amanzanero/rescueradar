import { env } from "@/env";
import { PostHog } from "posthog-node";

const postHogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: env.NEXT_PUBLIC_POSTHOG_HOST,
});

export const logger = {
  track: (event: string, properties: Record<string, any>) => {
    postHogClient.capture({ distinctId: "server", event, properties });
  },
  info: (message: string, metadata: Record<string, any>) => {
    console.log(message, metadata);
  },
  error: (message: string, metadata: Record<string, any>) => {
    console.error(message, metadata);
  },
  debug: (message: string, metadata: Record<string, any>) => {
    console.debug(message, metadata);
  },
  warn: (message: string, metadata: Record<string, any>) => {
    console.warn(message, metadata);
  },
};
