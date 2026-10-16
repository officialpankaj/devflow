import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Themeprovider from "@/context/theme";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body className="flex min-h-full flex-col">
        <Themeprovider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange={true}>
          {children}
        </Themeprovider>
      </body>
    </html>
  );
}
