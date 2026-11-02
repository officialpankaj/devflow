"use client";

import Image from "next/image";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";
import { deleteUserQuestion } from "@/lib/actions/question.action";
import { deleteUserAnswer } from "@/lib/actions/answer.action";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const router = useRouter();

  const handleEdit = async () => {
    router.push(ROUTES.EDIT_QUESTION(itemId));
  };

  const handleDelete = async () => {
    if (type === "question") {
      const response = await deleteUserQuestion({ questionId: itemId });

      if (!response?.success) {
        toast.add({
          title: "Failed to delete",
          description: response?.error?.message || "An error occurred while deleting the question",
          type: "destructive",
        });
      }

      toast.add({ title: "Question deleted", description: "Your question has been deleted successfully." });
    } else if (type === "answer") {
      const response = await deleteUserAnswer({ answerId: itemId });

      if (!response?.success) {
        toast.add({
          title: "Failed to delete",
          description: response?.error?.message || "An error occurred while deleting the answer",
          type: "destructive",
        });
      }

      toast.add({ title: "Answer deleted", description: "Your answer has been deleted successfully." });
    }
  };

  return (
    <div className={cn("flex items-center justify-end gap-3", { "justify-center gap-0": type === "answer" })}>
      {type === "question" && (
        <Image
          src="/icons/edit.svg"
          alt="edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer">
          <Image src="/icons/trash.svg" alt="trash" width={14} height={14} />{" "}
        </AlertDialogTrigger>
        <AlertDialogContent className="background-light800_dark300">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This wil permanently delete your {type} and remove it from our servers.
              servers
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-none bg-transparent">
            <AlertDialogCancel className="btn">Cancel</AlertDialogCancel>
            <AlertDialogCancel className="bg-primary-500! text-light-800!" onClick={handleDelete}>
              Continue
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default EditDeleteAction;
