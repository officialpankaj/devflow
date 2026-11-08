import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import CommonFilter from "@/components/filters/CommonFilter";
import { UserFilters } from "@/constants/filter";
import JobCard from "../../../components/cards/JobCard";

const Jobs = () => {
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

        <CommonFilter filters={UserFilters} otherClasses="min-h-[56px]! sm:min-w-[170px]" />
      </div>

      <div className="mt-12 flex flex-wrap gap-5">
        <JobCard
          companyImg=""
          title="Engineering Manager - EU"
          location="Baltimore, Maryland, US"
          compensation="€150K - €250K"
          description="We are looking for a null null for for a null null for an immediate opening in Baltimore, Maryland. You should have for a null null for an immediate opening in Baltimore, Maryland. You should have opening in Baltimore, Maryland. You should have for a null null for an immediate opening in Baltimore, Maryland. You should have 1-2 years of recent experience in your specialty and a willingness to be flexible and adaptable in forefront of discovery, innovation, and medical advances for over 125 years. Our reputation"
          href="https://jobs.ashbyhq.com/Ashby/86a60834-ba64-484d-9658-afa1bc97a957/application"
          employmentType="Full-Time"
        />
      </div>

      {/*<DataRenderer*/}
      {/*  success={success}*/}
      {/*  error={error}*/}
      {/*  data={users}*/}
      {/*  empty={EMPTY_USERS}*/}
      {/*  render={(users: IUser[]) => (*/}
      {/*    <div className="mt-12 flex flex-wrap gap-5">*/}
      {/*      {users?.map((user) => (*/}
      {/*        <UserCard key={user._id} {...user} />*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*/>*/}

      {/*<Pagination page={page} isNext={!!isNext} />*/}
    </div>
  );
};
export default Jobs;
