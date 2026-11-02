import React, { Suspense } from "react";
import Navbar from "@/components/navigation/navbar";
import LeftSidebar from "@/components/navigation/LeftSidebar";
import RightSidebar from "@/components/navigation/RightSidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Suspense fallback={<nav className="background-light800_dark200 fixed z-50 h-20 w-full" />}>
        <Navbar />
      </Suspense>
      <div className="flex">
        <Suspense fallback={<div className="h-screen max-sm:hidden lg:w-66.5" />}>
          <LeftSidebar />
        </Suspense>

        <section className="flex min-h-screen flex-1 flex-col px-6 pt-36 pb-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">
            {/* pages await searchParams/params, which must stream behind Suspense */}
            <Suspense>{children}</Suspense>
          </div>
        </section>

        <Suspense fallback={<div className="w-87.5 max-xl:hidden" />}>
          <RightSidebar />
        </Suspense>
      </div>
    </main>
  );
};
export default RootLayout;
