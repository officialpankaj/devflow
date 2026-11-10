import { IUser, RouteParams } from "@/types/global";
import { getUsers } from "@/lib/actions/user.action";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_USERS } from "@/constants/states";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import UserCard from "@/components/cards/UserCard";
import { UserFilters } from "@/constants/filter";
import CommonFilter from "@/components/filters/CommonFilter";
import React from "react";

const Community = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { users, isNext } = data || {};

  return (
    <div>
      <h1 className="h1-bold text-dark400_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          imgSrc="/icons/search.svg"
          placeholder="There are some great devs here!"
          otherClasses="flex-1"
        />

        <CommonFilter filters={UserFilters} otherClasses="min-h-[56px]! sm:min-w-[170px]" />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={users}
        showPagination={true}
        page={page}
        isNext={!!isNext}
        empty={EMPTY_USERS}
        render={(users: IUser[]) => (
          <div className="mt-12 flex flex-wrap gap-5">
            {users?.map((user) => (
              <UserCard key={user._id} {...user} />
            ))}
          </div>
        )}
      />
    </div>
  );
};
export default Community;
