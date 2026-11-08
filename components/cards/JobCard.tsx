import Link from "next/link";
import Image from "next/image";

interface Props {
  companyImg?: string;
  title: string;
  description: string;
  location: string;
  compensation?: string;
  href: string;
  employmentType: string;
}

const JobCard = ({ companyImg, title, description, location, compensation, href, employmentType }: Props) => {
  return (
    <div className="card-wrapper flex w-full flex-row gap-5 rounded-[10px] p-7 sm:px-11">
      <div className="relative size-12 shrink-0 sm:size-14">
        <Image
          src={companyImg || "/images/default-logo.svg"}
          alt="Company logo"
          fill
          className="background-light800_dark300 rounded-md object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex-between flex-wrap gap-2">
          <h2 className="text-dark100_light900 h3-semibold max-sm:text-lg">{title}</h2>
          <span className="background-light800_dark400 body-medium rounded-full px-4 py-1.5 max-sm:text-xs">
            {location}
          </span>
        </div>
        <p className="text-dark500_light700 body-regular line-clamp-2">{description?.slice(0, 200)}</p>
        <div className="flex-between mt-3 flex-wrap gap-3 sm:mt-5">
          <div className="text-dark400_light500 body-regular flex flex-wrap gap-3 sm:gap-6">
            <span className="flex-center gap-1">
              <Image src="/icons/clock.svg" alt="clock" width={20} height={20} />
              {employmentType}
            </span>
            <span className="flex-center gap-1">
              <Image src="/icons/currency-dollar-circle.svg" alt="Money" width={20} height={20} />
              {compensation || "not disclosed"}
            </span>
          </div>

          <Link href={href} target="_blank" className="primary-text-gradient body-semibold flex flex-nowrap gap-3">
            View job <Image src="/icons/arrow-up-right.svg" alt="arrow" height={18} width={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
