import { dbQuery } from "@/lib/db";
import { headers } from "next/headers";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const getResult = await dbQuery("SELECT * FROM board WHERE id=?", [id]);
    if (!getResult.length) {
      return new Response(
        JSON.stringify({ message: "게시물이 존재하지 않습니다." }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return new Response(JSON.stringify(getResult[0]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("db조회시에 에러가 발생되었습니다", error);
    return new Response(JSON.stringify({ message: "DB에 문제가 생겼습니다" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export async function PUT(req, { params }) {
  const { id } = await params;
  const { title, content } = await req.json();
  try {
    const res = await dbQuery(
      "UPDATE board SET title=? , content=? where id=?",
      [title, content, id]
    );
    return new Response(
      JSON.stringify({ message: "업데이트 성공하였습니다" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error }));
  }
}
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    const res = await dbQuery("delete from board where id=?", [id]);
    return new Response(JSON.stringify({ message: "삭제처리되었습니다" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("DB 조회 중 오류 발생 : ", error);
    return new Response(JSON.stringify({ message: "DB오류입니다" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
