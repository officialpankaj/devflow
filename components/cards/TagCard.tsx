import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import { cn, getDevIconClassName, getTechDescription } from "@/lib/utils";
import Image from "next/image";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({ _id, name, questions, showCount, compact, remove, isButton, handleRemove }: Props) => {
  const iconClassName = getDevIconClassName(name);
  const iconDescription = getTechDescription(name);

  const Content = (
    <>
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 flex min-h-fit flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={iconClassName}></i>
          <span>{name}</span>
        </div>
        {remove && (
          <Image
            src="/icons/close.svg"
            alt="close"
            width={12}
            height={12}
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && <p className="small-medium text-dark500_light700">{questions}</p>}
    </>
  );

  if (compact) {
    return isButton ? (
      <button type="button" className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG_DETAIL(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }

  return (
    <Link href={ROUTES.TAG_DETAIL(_id)} className="shadow-light100_dark100">
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl px-8 py-10 sm:w-65">
        <div className="flex-between gap-3">
          <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
            <p className="paragraph-semibold text-dark300_light900">{name}</p>
          </div>
          <i className={cn(iconClassName, "text-2xl")} aria-hidden={true} />
        </div>

        <p className="small-regular text-dark500_light700 mt-5 line-clamp-3 w-full">{iconDescription}</p>

        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">{questions} +</span>
          Question
        </p>
      </article>
    </Link>
  );
};
export default TagCard;
