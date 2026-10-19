import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavLinks from "@/components/navigation/navbar/NavLinks";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image src="/icons/hamburger.svg" alt="Menu" width={36} height={36} className="invert-colors sm:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200 border-none">
        <SheetHeader>
          <SheetTitle className="hidden">Navigation</SheetTitle>
          <SheetClose>
            <Link href={ROUTES.HOME} className="flex items-center gap-1">
              <Image src="/images/site-logo.svg" width={23} height={23} alt="logo" />

              <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
                Dev<span className="text-primary-500">Overflow</span>
              </p>
            </Link>
          </SheetClose>
        </SheetHeader>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto p-4">
          <SheetClose>
            <section className="flex h-full flex-col gap-4 pt-16">
              <NavLinks isMobileNav={true} />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            <SheetClose>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="small-medium btn-secondary min-h-10.25 w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log in</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose>
              <Link href={ROUTES.SIGN_UP}>
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-10.25 w-full rounded-lg border px-4 py-3 shadow-none">
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavigation;
