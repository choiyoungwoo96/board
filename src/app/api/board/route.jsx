import { dbQuery } from "@/lib/db";
import axios from "axios";
import { headers } from "next/headers";

export async function GET() {}
export async function POST(req) {
  const { title, content } = req.body;
  try {
    // const createResult = dbQuery(
    //   "insert into board (title,content,userid) values(?,?,?)",
    //   [title, content]
    // );
    return new Response(
      JSON.stringify({
        title,
        content,
        userid: "choi",
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  } catch (error) {
    console.error("error : ", error);
  }
}
