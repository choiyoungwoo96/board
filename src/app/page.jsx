"use client";

import axios from "axios";
import { headers } from "next/headers";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState([
    {
      title: "",
      content: "",
    },
  ]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("/api/board", inputValue, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const onChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
    console.log(inputValue);
  };
  return (
    <div className="w-screen h-screen bg-blue-500 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-screen-xl h-[700px] bg-white m-auto p-8">
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
                onChange={onChange}
                name="content"
              ></textarea>
            </div>
            <button className="p-4 w-full bg-blue-500 rounded-lg text-white">
              글생성
            </button>
          </form>

          <div className="flex items-start justify-start">
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
                <tr>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">제목</td>
                  <td className="px-4 py-2">오늘의 글은?</td>
                  <td className="px-4 py-2"> 2024.03.24</td>
                  <td className="px-4 py-2">최영우</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
