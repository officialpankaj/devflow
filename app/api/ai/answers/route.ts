import handleError from "@/lib/handlers/error";
import { ErrorResponse } from "@/types/global";
import { AIAnswerSchema } from "@/lib/validations";
import { z } from "zod";
import { ValidationError } from "@/lib/http-errors";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { groq } from "@ai-sdk/groq";

export async function POST(request: Request) {
  const { question, content, userAnswer } = await request.json();

  try {
    const validatedData = AIAnswerSchema.safeParse({ question, content, userAnswer });

    if (!validatedData.success) {
      throw new ValidationError(z.flattenError(validatedData.error).fieldErrors);
    }

    const { text } = await generateText({
      // model: google("gemini-3.8-flash"),
      model: groq("openai/gpt-oss-120b"),
      prompt: `Generate a markdown-formatted response to the following question: "${question}".
       
       Consider the provided context:
       **Context:** ${content}
       
       Also, prioritize and incorporate the user's answer when formulating your response: **User's Answer:** ${userAnswer}
       
       Prioritize the user's answer only if it's correct. If it's incomplete or incorrect, improve or correct it while keeping the response concise and to the  point. 
       Provide the final answer in markdown format.`,
      instructions:
        "You are a helpful assistant that provides information responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasize where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for Typescript, 'html' for HTML, 'css' for CSS, etc.).",
    });

    return NextResponse.json({ success: true, data: text }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ErrorResponse;
  }
}
