import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./_providers";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "RescueRadar",
  description: "Get notified when new cats are available at the SF SPCA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-[100dvh] flex-col">
            <header className="flex h-14 items-center px-4 lg:px-6">
              <Link className="flex items-center justify-center" href="/">
                <PawPrintIcon className="h-6 w-6" />
                <span className="sr-only">RescueRadar</span>
              </Link>
              <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  href="#"
                >
                  About
                </Link>
                <Link
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  href="/unsubscribe"
                >
                  Unsubscribe
                </Link>
              </nav>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                2024 RescueRadar
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

function PawPrintIcon(props: React.HTMLProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  );
}
