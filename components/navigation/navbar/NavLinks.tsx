"use client";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ROUTES from "@/constants/routes";
import { useSession } from "next-auth/react";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();

  const session = useSession();

  return (
    <>
      {sidebarLinks.map((item) => {
        if (item.authorize && !session?.data?.user?.id) {
          return null;
        }

        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

        const LinkComponent = (
          <Link
            href={item.route === ROUTES.PROFILE ? ROUTES.PROFILE_DETAIL(session?.data?.user?.id!) : item.route}
            key={item.label}
            className={cn(
              isActive ? "primary-gradient text-light-900 rounded-lg" : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p className={cn(isActive ? "body-bold" : "body-medium", !isMobileNav && "max-lg:hidden", "")}>
              {item.label}
            </p>
          </Link>
        );

        return LinkComponent;
      })}
    </>
  );
};
export default NavLinks;
