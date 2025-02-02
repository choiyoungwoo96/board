"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    const getResult = async () => {
      try {
        const res = await axios.get(`/api/board/${id}`);
        console.log(res);
        setTitle(res.data.title);
        setContent(res.data.content);
        console.log(res);
        if (res.status === 404) {
          console.log("게시물이 존재하지 않습니다.");
        }
      } catch (error) {
        console.log("오류발생:", error);
        console.log("응답 상태 코드 : ", error.response?.status);
        console.log("응답 상태 코드 : ", error.response?.data);
      }
    };
    getResult();
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    try {
      const res = await axios.put(`/api/board/${id}`, { title, content });
      router.push("/");
    } catch (error) {
      console.error("error:", error);
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    try {
      const res = await axios.delete(`/api/board/${id}`);
      console.log(res);
    } catch (error) {
      console.error("error : ", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-blue-500 p-8">
      <div className="w-full h-full bg-white rounded-lg">
        <form className="w-full h-full text-black flex flex-col gap-4 p-4">
          <div className="flex gap-8">
            <label className="text-center min-w-[50px] flex items-center justify-center">
              제목
            </label>
            <input
              className="w-full border px-2 py-1 border-blue-500 rounded-lg"
              type="text"
              placeholder="제목"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="w-full h-full flex gap-8">
            <label className="flex flex-col items-center justify-center text-center min-w-[50px]">
              내용
            </label>
            <textarea
              className="w-full px-2 py-1 border border-blue-500 rounded-lg"
              placeholder="내용을 입력하세요"
              required
              name="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={updateHandler}
              className="p-4 w-full bg-blue-500 rounded-lg text-white"
            >
              글수정하기
            </button>
            <button
              onClick={deleteHandler}
              className="p-4 w-full bg-blue-500 rounded-lg text-white"
            >
              글 삭제하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
