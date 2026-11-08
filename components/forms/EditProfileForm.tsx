"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useRef, useTransition } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";
import { IUser } from "@/types/global";
import { editProfile } from "@/lib/actions/user.action";
import { toast } from "@/components/ui/toast";
import ROUTES from "@/constants/routes";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface Params {
  user?: IUser;
}

const EditProfileForm = ({ user }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      portfolio: user?.portfolio || "",
      location: user?.location || "",
      bio: user?.bio || "",
    },
  });

  const handleCreateQuestion = async (data: z.infer<typeof EditProfileSchema>) => {
    startTransition(async () => {
      const result = await editProfile({ ...data, userId: user?._id! });

      if (result.success) {
        toast.add({
          title: "Success",
          description: "Profile updated successfully",
        });
        if (result?.data) router.push(ROUTES.PROFILE_DETAIL(user?._id!));
      } else {
        toast.add({
          title: `Error ${result.status}`,
          description: result.error?.message || "Something went wrong",
          type: "destructive",
        });
      }

      return;
    });
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(handleCreateQuestion)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Full Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Enter your full legal name (first name and last name) as you would like it to appear on your profile or
                application.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Choose a unique username to identify your account and create your personalized profile URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">Portfolio URL</FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Enter the URL of your personal portfolio website showcasing your projects, skills, and professional
                experience.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">Location</FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Enter your current city and country of residence.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-medium text-dark400_light700">Details brief about you</FormLabel>
              <FormControl>
                <Editor value={field.value || ""} fieldChange={field.onChange} editorRef={editorRef} />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Write a short introduction about yourself, highlighting your skills, experience, interests, and
                professional background.
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
              "Update Profile"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default EditProfileForm;
