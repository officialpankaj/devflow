import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/navigation/navbar/ThemeToggle";
import MobileNavigation from "@/components/navigation/navbar/MobileNavigation";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 sm: fixed z-50 w-full gap-5 p-6 px-12 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/images/site-logo.svg" alt="DevOverflow Logo" height={32} width={32} />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>

      <p>Global Search</p>

      <div className="flex-between gap-5">
        <ThemeToggle />

        {session?.user?.id && (
          <UserAvatar id={session?.user?.id} name={session?.user?.name!} imageUrl={session?.user?.image} />
        )}

        <MobileNavigation />
      </div>
    </nav>
  );
};
export default Navbar;
