import { ActionResponse, IAnswer } from "@/types/global";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_ANSWERS } from "@/constants/states";
import AnswerCard from "@/components/cards/AnswerCard";
import CommonFilter from "@/components/filters/CommonFilter";
import { AnswerFilters } from "@/constants/filter";

interface Props extends ActionResponse<IAnswer[]> {
  totalAnswers: number;
  page: number;
  isNext: boolean;
}

const AllAnswers = ({ data, success, error, totalAnswers, page, isNext }: Props) => {
  return (
    <div className="mt-11">
      <div className="flex-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>
        <CommonFilter filters={AnswerFilters} otherClasses="sm:min-w-[32px]" containerClasses="max-xs:w-full" />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={data}
        showPagination={true}
        page={page}
        isNext={isNext}
        empty={EMPTY_ANSWERS}
        render={(answers) => answers.map((answer) => <AnswerCard key={answer._id} {...answer} />)}
      />
    </div>
  );
};
export default AllAnswers;
