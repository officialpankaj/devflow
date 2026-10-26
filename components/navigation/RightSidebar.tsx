import Link from "next/link";
import Image from "next/image";
import TagCard from "@/components/cards/TagCard";
import ROUTES from "@/constants/routes";

const hotQuestions = [
  { _id: "1", title: "How to create a custom hook in React?" },
  { _id: "2", title: "How to use React Query?" },
  { _id: "3", title: "How to use Redux?" },
  { _id: "4", title: "How to use React Router?" },
  { _id: "5", title: "How to use React Context?" },
];

const popularTags = [
  { _id: "1", name: "react", question: 100 },
  { _id: "2", name: "javascript", question: 200 },
  { _id: "3", name: "typescript", question: 150 },
  { _id: "4", name: "nextjs", question: 50 },
  { _id: "5", name: "react-query", question: 75 },
];

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-87.5 flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-7.5">
          {hotQuestions.map(({ _id, title }) => (
            <Link href={ROUTES.QUESTION_DETAIL(_id)} key={_id} className="flex-between cursor-pointer">
              <p className="body-medium text-dark500_light700">{title}</p>

              <Image src="/icons/chevron-right.svg" alt="Chevron" width={20} height={20} className="invert-colors" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark300_light700">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, question }) => (
            <TagCard key={_id} _id={_id} name={name} questions={question} showCount={true} compact={true} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default RightSidebar;
