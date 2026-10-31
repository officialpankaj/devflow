import { IAnswer } from "@/types/global";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { cn, getTimeStamp } from "@/lib/utils";
import Preview from "@/components/editor/Preview";
import React, { Suspense } from "react";
import Votes from "@/components/votes/Votes";
import { hasVoted } from "@/lib/actions/vote.action";

interface Props extends IAnswer {
  containerClasses?: string;
  showReadMore?: boolean;
}

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
  question,
  containerClasses = "",
  showReadMore = false,
}: Props) => {
  const hasVotedPromise = hasVoted({ targetId: _id, targetType: "answer" });

  return (
    <article className={cn("light-border border-b py-10", containerClasses)}>
      <span id={`answer-${_id}`} className="hash-span" />

      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 items-start gap-1 sm:items-center">
          <UserAvatar
            id={author._id}
            name={author.name}
            imageUrl={author.image}
            className="size-5 rounded-full object-cover max-sm:mt-2"
          />

          <Link
            href={ROUTES.PROFILE_DETAIL(author._id)}
            className="flex flex-col max-sm:ml-1 sm:flex-row sm:items-center"
          >
            <p className="body-semibold text-dark300_light700">{author.name ?? "Anonymous"}</p>

            <p className="small-regular text-light400_light500 mt-0.5 ml-0.5 line-clamp-1">
              <span className="max-sm:hidden">•</span>
              answered {getTimeStamp(createdAt)}
            </p>
          </Link>
        </div>

        <div className="flex justify-end">
          <Suspense fallback={<div>Loading...</div>}>
            <Votes
              targetId={_id}
              targetType="answer"
              upvotes={upvotes}
              downvotes={downvotes}
              hasVotedPromise={hasVotedPromise}
            />
          </Suspense>
        </div>
      </div>

      <Preview content={content} />

      {showReadMore && (
        <Link
          href={`${ROUTES.QUESTION_DETAIL(question)}?#answer-${_id}`}
          className="body-semibold font-space-grotesk text-primary-500 relative z-10"
        >
          <p className="mt-1">Read more...</p>
        </Link>
      )}
    </article>
  );
};
export default AnswerCard;
