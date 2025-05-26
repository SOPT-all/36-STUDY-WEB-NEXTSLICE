import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// 요청 카운터
let requestCounter = 0;

export async function GET(request) {
  try {
    requestCounter++;
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || "default";

    return NextResponse.json({
      id,
      timestamp: new Date().toISOString(),
      requestId: uuidv4(),
      counter: requestCounter,
      message: `이 데이터는 ${requestCounter}번째 요청에서 생성되었습니다.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
