import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  imgStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({ imgUrl, alt, value, title, href, textStyles, imgStyles = "", isAuthor }: Props) => {
  const metricContent = (
    <>
      {imgUrl ? (
        <Image src={imgUrl} alt={alt} width={16} height={16} className={cn("rounded-full object-contain", imgStyles)} />
      ) : (
        <span
          aria-hidden
          className={cn(
            "bg-light-700 dark:bg-dark-400 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] uppercase",
            imgStyles
          )}
        >
          {alt.charAt(0)}
        </span>
      )}
      <p className={cn("flex items-center gap-1", textStyles)}>
        {value}
        <span className={cn("small-regular line-clamp-1", { "max-sm:hidden": isAuthor })}>{title}</span>
      </p>
    </>
  );

  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};
export default Metric;
