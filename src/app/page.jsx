"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState({
    title: "",
    content: "",
  });
  const [board, setBoard] = useState([]);

  const onChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const getResult = async () => {
    try {
      const getResult = await axios.get("/api/board");
      setBoard((prev) => {
        console.log("최신업데이트 : ", getResult.data);
        return getResult.data;
      });
    } catch (error) {
      console.error(error);
    }
  };

  //글 생성
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const createResult = await axios.post("/api/board", inputValue, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(createResult);
    } catch (error) {
      console.error("error :", error);
    }
    getResult();
  };
  //글 목록 가지고오기
  useEffect(() => {
    getResult();
  }, []);

  return (
    <div className="w-screen h-full bg-blue-500 flex items-center justify-center p-8">
      <div className="flex flex-col gap-4 w-full max-w-screen-xl h-full bg-white m-auto p-8">
        <div className="flex items-center justify-end gap-4 text-white">
          <button className="bg-blue-500 px-4 py-1 rounded-lg">로그인</button>
          <button className="bg-blue-500 px-4 py-1 rounded-lg">내정보</button>
        </div>
        <div className="w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-4">
          <form
            onSubmit={onSubmit}
            className="w-full h-full text-black flex flex-col gap-4"
          >
            <div className="flex gap-8">
              <label className="text-center min-w-[50px] flex items-center justify-center">
                제목
              </label>
              <input
                className="w-full border px-2 py-1 border-blue-500 rounded-lg"
                type="text"
                placeholder="제목"
                name="title"
                onChange={onChange}
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
                onChange={onChange}
              ></textarea>
            </div>
            <button className="p-4 w-full bg-blue-500 rounded-lg text-white">
              글생성
            </button>
          </form>

          <div className="flex flex-col items-start justify-start">
            <table className="bg-blue-500 w-full rounded-lg text-center">
              <thead className="text-white">
                <tr>
                  <th className="px-4 py-2">번호</th>
                  <th className="px-4 py-2">제목</th>
                  <th className="px-4 py-2"> 내용</th>
                  <th className="px-4 py-2">작성일</th>
                  <th className="px-4 py-2">작성자</th>
                </tr>
              </thead>
              <tbody className="bg-white border">
                {board.map((boardItem, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <Link href={`/board/${boardItem.id}`}>
                        {boardItem.id}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/board/${boardItem.id}`}>
                        {boardItem.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/board/${boardItem.id}`}>
                        {boardItem.content}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/board/${boardItem.id}`}>
                        {boardItem.create_at.split("T")[0]}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/board/${boardItem.id}`}>
                        {boardItem.userid}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex items-center justify-center gap-4 m-4">
              <button>prev</button>
              <button className="w-[40px] h-[40px] rounded-full text-white bg-blue-500 flex items-center justify-center">
                1
              </button>
              <button>next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
