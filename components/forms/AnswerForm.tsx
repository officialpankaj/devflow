"use client";

import React, { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "@/components/ui/toast";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface Props {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}

const AnswerForm = ({ questionId, questionTitle, questionContent }: Props) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState<boolean>(false);

  const session = useSession();

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({ content: values.content, questionId });

      if (result.success) {
        form.reset();

        toast.add({ title: "Success", description: "Your answer has been posted successfully" });

        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }
      } else {
        toast.add({ title: "Error", description: result?.error?.message, type: "destructive" });
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast.add({
        title: "Please log in",
        description: "You need to be logged in to use this feature",
      });
    }

    setIsAISubmitting(true);

    const userAnswer = editorRef.current?.getMarkdown();

    try {
      const { success, data, error } = await api.ai.getAnswer(questionTitle, questionContent, userAnswer);

      if (!success) {
        toast.add({
          title: "Error",
          description: error?.message,
          type: "destructive",
        });
      }

      const formattedAnswer = (data as string).replace(/<br>/g, " ").toString().trim();

      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer);
        form.setValue("content", formattedAnswer);
        await form.trigger("content");
      }

      toast.add({
        title: "Success",
        description: "AI Answer has been generated",
      });
    } catch (error) {
      toast.add({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem with your request",
        type: "destructive",
      });
    } finally {
      setIsAISubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>
        <Button
          className="btn light-border-2 text-primary-500 gap-1.5 rounded-md border px-4 py-2.5 shadow-none"
          disabled={isAISubmitting}
          onClick={generateAIAnswer}
        >
          {isAISubmitting ? (
            <>
              <RotateCw className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="Generate AI Answer"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 w-full flex-col gap-10">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="mt-3.5 flex w-full flex-col gap-3">
                <FormControl>
                  <Editor value={field.value} fieldChange={field.onChange} editorRef={editorRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="primary-gradient mt-3 w-fit">
              {isAnswering ? (
                <>
                  <RotateCw className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Answer"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default AnswerForm;
