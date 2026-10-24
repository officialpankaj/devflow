import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Themeprovider from "@/context/theme";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toast";
import { auth } from "@/auth";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 700",
});

export const metadata: Metadata = {
  title: "DevOverflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};
const AuthSessionProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  const content = (
    <>
      <Themeprovider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange={true}>
        {children}
      </Themeprovider>
      <Toaster />
    </>
  );

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.className, spaceGrotesk.variable, "font-sans", geist.variable)}
      suppressHydrationWarning={true}
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <title>DevOverflow</title>
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning={true}>
        <Suspense fallback={<SessionProvider>{content}</SessionProvider>}>
          <AuthSessionProvider>{content}</AuthSessionProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
