import Link from "next/link";
import Image from "next/image";
import TagCard from "@/components/cards/TagCard";
import ROUTES from "@/constants/routes";
import { getTopQuestion } from "@/lib/actions/question.action";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_TOP_QUESTIONS, EMPTY_TOP_TAGS } from "@/constants/states";
import { getTopTags } from "@/lib/actions/tags.action";
import { connection } from "next/server";

const RightSidebar = async () => {
  // Mongoose calls Date.now(); render at request time so Prerender doesn't fail
  await connection();

  const [
    { success: topQuestionsSuccess, data: topQuestions, error: topQuestionError },
    { success: topTagsSuccess, data: topTags, error: topTagsError },
  ] = await Promise.all([getTopQuestion(), getTopTags()]);

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-87.5 flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <DataRenderer
          success={topQuestionsSuccess}
          error={topQuestionError}
          data={topQuestions}
          empty={EMPTY_TOP_QUESTIONS}
          render={(topQuestions) => (
            <div className="mt-7 flex w-full flex-col gap-7.5">
              {topQuestions?.map(({ _id, title }) => (
                <Link href={ROUTES.QUESTION_DETAIL(_id)} key={_id} className="flex-between cursor-pointer">
                  <p className="body-medium text-dark500_light700 line-clamp-2">{title}</p>

                  <Image
                    src="/icons/chevron-right.svg"
                    alt="Chevron"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        />
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark300_light700">Popular Tags</h3>

        <DataRenderer
          success={topTagsSuccess}
          data={topTags}
          error={topTagsError}
          empty={EMPTY_TOP_TAGS}
          render={(topTags) => (
            <div className="mt-7 flex flex-col gap-4">
              {topTags?.map(({ _id, name, questions }) => (
                <TagCard
                  key={_id?.toString()}
                  _id={_id?.toString()}
                  name={name}
                  questions={questions}
                  showCount={true}
                  compact={true}
                />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};
export default RightSidebar;
