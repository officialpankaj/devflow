"use client";

import Image from "next/image";
import { cn, formatNumber } from "@/lib/utils";
import { use, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/toast";
import { ActionResponse } from "@/types/global";
import { HasVotedResponse } from "@/types/action";
import { createVote } from "@/lib/actions/vote.action";

interface Props {
  upvotes: number;
  downvotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
  targetId: string;
  targetType: "question" | "answer";
}

const Votes = ({ upvotes, downvotes, hasVotedPromise, targetId, targetType }: Props) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);

  const { success, data } = use(hasVotedPromise);

  const { hasUpvoted, hasDownvoted } = data || {};

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) {
      return toast.add({
        title: "Please login to vote",
        description: "Only logged-in users can vote.",
        type: "destructive",
      });
    }

    try {
      setIsLoading(true);

      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });

      if (!result.success) {
        return toast.add({
          title: "Failed to vote",
          description: result?.error?.message || "An error occurred while voting. Please try again later.",
          type: "destructive",
        });
      }

      const successMessage =
        voteType === "upvote"
          ? `Upvote ${!hasUpvoted ? "added" : "removed"} successfully`
          : `Downvote ${!hasDownvoted ? "added" : "removed"} successfully`;

      return toast.add({
        title: successMessage,
        description: "Your vote has been recorded",
      });
    } catch (error) {
      console.log("error", error);

      return toast.add({
        title: "Failed to vote",
        description: "An error occurred while voting. Please try again later.",
        type: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
          width={18}
          height={18}
          alt="Upvote"
          className={cn("cursor-pointer", { "opacity-50": isLoading })}
          aria-label="Upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />

        <div className="flex-center background-light700_dark400 min-w-5 p-1">
          <p className="subtle-medium text-dark400_light900">{formatNumber(upvotes)}</p>
        </div>
      </div>
      <div className="flex-center gap-1.5">
        <Image
          src={success && hasDownvoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
          width={18}
          height={18}
          alt="Downvote"
          className={cn("cursor-pointer", { "opacity-50": isLoading })}
          aria-label="Downvote"
          onClick={() => !isLoading && handleVote("downvote")}
        />

        <div className="flex-center background-light700_dark400 min-w-5 p-1">
          <p className="subtle-medium text-dark400_light900">{formatNumber(downvotes)}</p>
        </div>
      </div>
    </div>
  );
};
export default Votes;
