"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL, fetchWithAuth } from "@/utils/index";

export default function EditBlogPage({ params }) {
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchArticle() {
      try {
        setIsLoading(true);
        const response = await fetchWithAuth(`${API_BASE_URL}/articles/${id}`);

        if (!response.ok) {
          throw new Error("블로그 글을 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchArticle();
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.target);
      const articleData = {
        title: formData.get("title"),
        content: formData.get("content"),
        imageUrl: formData.get("imageUrl") || article.imageUrl,
      };

      const response = await fetchWithAuth(`${API_BASE_URL}/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error("글 수정에 실패했습니다.");
      }

      router.push(`/protected/blogs/${id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        role="alert"
      >
        <p className="font-bold">오류 발생</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-600">글을 찾을 수 없습니다.</p>
        <Link
          href="/protected/blogs"
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          블로그 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/protected/blogs/${id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          ← 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">글 수정하기</h1>

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
              defaultValue={article.title}
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
              defaultValue={article.imageUrl}
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
              defaultValue={article.content}
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
              href={`/protected/blogs/${id}`}
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
