import React from "react";
import { ThemeProvider } from "./themeProvider";
import { CSPostHogProvider } from "./posthogProvider";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <CSPostHogProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </CSPostHogProvider>
  );
};
