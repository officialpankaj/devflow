"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AskQuestionSchema } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useRef, useTransition } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";
import TagCard from "@/components/cards/TagCard";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { RotateCw } from "lucide-react";
import { IQuestion } from "@/types/global";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface Params {
  question?: IQuestion;
  isEdit?: boolean;
}

const QuestionForm = ({ question, isEdit = false }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags?.map((d) => d?.name) || [],
    },
  });

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: { value: string[] }) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value?.trim();
      if (tagInput.length < 15 && !field.value.includes(tagInput)) {
        const newTags = [...field.value, tagInput];
        form.setValue("tags", newTags);
        e.currentTarget.value = "";
        if (newTags.length <= 3) {
          form.clearErrors("tags");
        }
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue("tags", newTags);

    if (newTags?.length === 0) {
      form.setError("tags", { type: "manual", message: "Tags are required" });
    }
  };

  const handleCreateQuestion = async (data: z.infer<typeof AskQuestionSchema>) => {
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({ ...data, questionId: question?._id });

        if (result.success) {
          toast.add({
            title: "Success",
            description: "Question updated successfully",
          });
          if (result?.data) router.push(ROUTES.QUESTION_DETAIL(result?.data?._id?.toString()));
        } else {
          toast.add({
            title: `Error ${result.status}`,
            description: result.error?.message || "Something went wrong",
            type: "destructive",
          });
        }

        return;
      }

      const result = await createQuestion(data);

      if (result.success) {
        toast.add({
          title: "Success",
          description: "Question created successfully",
        });
        if (result?.data) router.push(ROUTES.QUESTION_DETAIL(result?.data?._id?.toString()));
      } else {
        toast.add({
          title: `Error ${result.status}`,
          description: result.error?.message || "Something went wrong",
          type: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(handleCreateQuestion)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Be specific and image you are asking a question to another person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Details explanation for your problem <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor value={field.value} fieldChange={field.onChange} editorRef={editorRef} />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Introduce the problem and expand on what you've put in the title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Input
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field?.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {field?.value?.map((tag, index) => (
                        <TagCard
                          _id={tag}
                          name={tag}
                          key={`${tag}${index}`}
                          remove
                          isButton={true}
                          compact={true}
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="primary-gradient text-light-900! min-h-fit w-fit px-4 py-2"
          >
            {isPending ? (
              <>
                <RotateCw className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? "Edit" : "Ask A Question"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default QuestionForm;
