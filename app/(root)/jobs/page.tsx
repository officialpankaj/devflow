import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import CommonFilter from "@/components/filters/CommonFilter";
import { JobsFilters } from "@/constants/filter";
import { api } from "@/lib/api";
import { IJob, RouteParams } from "@/types/global";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_JOBS } from "@/constants/states";
import JobCard from "@/components/cards/JobCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Jobs = async ({ params, searchParams }: RouteParams) => {
  const { query, page, filter } = await searchParams;

  const { data, error, success } = await api.jobs.getJobs({ query, page: Number(page) || 1, filter: filter });

  const formatSalary = (minSalary?: number | null, maxSalary?: number | null, currency?: string | null) => {
    const formattedCurrency = currency || "";
    if (minSalary && maxSalary) {
      return `${Number(minSalary)} ${formattedCurrency} - ${Number(maxSalary)} ${formattedCurrency}`;
    } else if (minSalary && !maxSalary) {
      return `Min ${Number(minSalary)}${formattedCurrency}`;
    } else if (!minSalary && maxSalary) {
      return `Upto ${Number(maxSalary)}${formattedCurrency}`;
    }

    return null;
  };

  return (
    <div>
      <h1 className="h1-bold text-dark400_light900">All Jobs</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.JOBS}
          imgSrc="/icons/search.svg"
          placeholder="There are some jobs out there!"
          otherClasses="flex-1"
        />

        <CommonFilter filters={JobsFilters} otherClasses="min-h-[56px]! sm:min-w-[170px]" />
      </div>

      <Suspense
        fallback={
          <div className="mt-12 flex flex-wrap gap-5">
            {[...Array(10).keys()].map((d, index) => (
              <Skeleton
                className="card-wrapper flex h-20 w-full flex-row gap-5 rounded-[10px] p-7 sm:px-11"
                key={d + index}
              />
            ))}
          </div>
        }
      >
        <DataRenderer
          success={success}
          error={error}
          data={data?.jobs || []}
          empty={EMPTY_JOBS}
          page={page}
          showPagination={true}
          isNext={!!data?.isNext}
          render={(jobs: IJob[]) => (
            <div className="mt-12 flex flex-wrap gap-5">
              {jobs?.map((job, index) => (
                <JobCard
                  key={job.excerpt + index}
                  companyImg={job.companyLogo}
                  title={job.title}
                  location={job.locationRestrictions?.length > 0 ? job.locationRestrictions[0] : ""}
                  compensation={formatSalary(job.minSalary, job.maxSalary, job.currency)}
                  description={job.description}
                  href={job.applicationLink}
                  employmentType={job.employmentType}
                />
              ))}
            </div>
          )}
        />
      </Suspense>
    </div>
  );
};
export default Jobs;
