import { dbQuery } from "../../../lib/db";
function bigIntReplacer(key, value) {
  console.log("key : ", key, "value : ", value);
  return typeof value === "bigint" ? value.toString() : value;
}
export async function GET() {
  try {
    const result = await dbQuery("SELECT * FROM board", []);
    return new Response(JSON.stringify(result, bigIntReplacer), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request) {
  const body = await request.json();
  const { title, content } = body;
  try {
    const createResult = await dbQuery(
      "INSERT INTO board (title,content,userid) values(?,?,?)",
      [title, content, "choi"]
    );

    return new Response(JSON.stringify(createResult, bigIntReplacer), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("❌ POST 요청 오류:", error);
    return new Response(JSON.stringify({ message: "서버 오류 발생" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
