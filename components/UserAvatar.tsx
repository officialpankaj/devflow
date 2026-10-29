import Link from "next/link";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  imageUrl: string | null | undefined;
  className?: string;
  fallbackClassName?: string;
}

const UserAvatar = ({ id, name, imageUrl, className = "h-9 w-9", fallbackClassName = "" }: Props) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE_DETAIL(id)}>
      <Avatar className={cn("relative", className)}>
        {imageUrl ? (
          <Image src={imageUrl} alt={name} className="rounded-full object-cover" fill={true} quality={100} />
        ) : (
          <AvatarFallback
            className={cn(
              "primary-gradient font-space-grotesk font-bold tracking-wider text-white uppercase",
              fallbackClassName
            )}
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};
export default UserAvatar;
