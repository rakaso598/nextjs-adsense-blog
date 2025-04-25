"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { articleService } from "@/lib/service/articleService";
export default function NewBlogPage() {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.target);
      const articleData = {
        title: formData.get("title"),
        content: formData.get("content"),
        imageUrl: formData.get("imageUrl") || null,
      };

      const data = await articleService.createArticle(articleData);
      router.push(`/blogs/${data.id}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/blogs" className="text-blue-500 hover:text-blue-700">
          ← 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">새 글 작성하기</h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              이미지 URL (선택)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              내용
            </label>
            <textarea
              id="content"
              name="content"
              rows="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "저장 중..." : "저장하기"}
            </button>
            <Link
              href="/blogs"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
