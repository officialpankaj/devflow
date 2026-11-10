import { getTags } from "@/lib/actions/tags.action";
import { RouteParams } from "@/types/global";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_TAGS } from "@/constants/states";
import TagCard from "@/components/cards/TagCard";
import CommonFilter from "@/components/filters/CommonFilter";
import { TagFilters } from "@/constants/filter";

const Tags = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, filter, query } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter,
  });

  const { tags, isNext } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>

      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.TAGS}
          imgSrc="/icons/search.svg"
          placeholder="Search tags..."
          otherClasses="flex-1"
        />

        <CommonFilter filters={TagFilters} containerClasses="" otherClasses="min-h-[56px]! sm:min-w-[170px]" />
      </section>

      <DataRenderer
        success={success}
        data={tags}
        empty={EMPTY_TAGS}
        showPagination={true}
        page={page}
        isNext={!!isNext}
        render={(tags) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {tags.map((tag) => (
              <TagCard key={tag._id.toString()} _id={tag._id.toString()} name={tag.name} questions={tag.questions} />
            ))}
          </div>
        )}
      />
    </>
  );
};
export default Tags;
