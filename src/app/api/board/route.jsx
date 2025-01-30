import { headers } from "next/headers";

export async function GET() {
  return new Response(
    JSON.stringify({
      message: "api/board 경로입니다",
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
}
