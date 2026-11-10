import { NextRequest, NextResponse } from "next/server";
import handleError from "@/lib/handlers/error";
import { APIErrorResponse } from "@/types/global";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query") || "";
    const filter = searchParams.get("filter") || "";
    const page = searchParams.get("page");

    const pageSize = 20;

    const skip = (Number(page) - 1) * pageSize;
    const limit = Number(pageSize);

    const params = new URLSearchParams({
      q: query,
      page: String(page),
      employment_type: filter,
      limit: String(limit),
    });

    const response = await fetch(`${process.env.HIMALAYAS_JOB_API_URL as string}${query ? "/search" : ""}?${params}`, {
      method: "GET",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch jobs",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log("server Jobs API response", data.jobs);

    return NextResponse.json(
      { success: true, data: { jobs: data.jobs || [], isNext: data.totalCount > skip + data.jobs?.length } },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
