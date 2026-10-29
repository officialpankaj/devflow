"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { use, useState } from "react";
import { toast } from "@/components/ui/toast";
import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { ActionResponse } from "@/types/global";

const SaveQuestion = ({
  questionId,
  hasSavedQuestionPromise,
}: {
  questionId: string;
  hasSavedQuestionPromise: Promise<ActionResponse<{ saved: boolean }>>;
}) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const { data } = use(hasSavedQuestionPromise);

  const { saved: hasSaved } = data || {};

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;

    if (!userId) {
      return toast.add({ title: "You need to be logged in to save a question", type: "destructive" });
    }

    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });

      if (!success) throw new Error(error?.message || "An error occurred");

      toast.add({ title: `Question ${data?.saved ? "saved" : "unsaved"} successfully` });
    } catch (error) {
      toast.add({
        title: "Error",
        description: error instanceof Error ? error?.message : "An unexpected error occurred",
        type: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Image
      src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      alt="save"
      width={18}
      height={18}
      className={cn("cursor-pointer", { "opacity-50": isLoading })}
      onClick={handleSave}
    />
  );
};
export default SaveQuestion;
