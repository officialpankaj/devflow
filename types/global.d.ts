import { NextResponse } from "next/server";

export interface ITag {
  _id: string;
  name: string;
}

export interface IAuthor {
  _id: string;
  name: string;
  image: string;
}

export interface IQuestion {
  _id: string;
  title: string;
  content: string;
  tags: ITag[];
  author: IAuthor;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface PaginateSearchParams {
  page: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface IncrementViewsParams {
  questionId: string;
}

interface IAnswer {
  _id: string;
  author: IAuthor;
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
}
