import Link from "next/link";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  id: string;
  name: string;
  imageUrl: string | null | undefined;
  className?: string;
}

const UserAvatar = ({ id, name, imageUrl, className = "h-9 w-9" }: Props) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE_DETAIL(id)}>
      <Avatar className={className}>
        {imageUrl ? (
          <Image src={imageUrl} alt={name} className="rounded-full object-cover" width={36} height={36} quality={100} />
        ) : (
          <AvatarFallback className="primary-gradient font-space-grotesk font-bold tracking-wider text-white uppercase">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};
export default UserAvatar;
