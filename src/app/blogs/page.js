"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { articleService } from "@/lib/service/articleService";
import BlogCard from "@/components/blogs/BlogCard";
export default function BlogsPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const articlesData = await articleService.getArticles();
        const { list, totalCount } = articlesData;

        setArticles(list || []);
      } catch (err) {
        setError(err.message || JSON.parse(err).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

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

  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-6">
        <h1 className="text-2xl font-bold">블로그 글 목록</h1>
        <Link
          href="/blogs/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          새 글 작성
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">작성된 블로그 글이 없습니다.</p>
          <p className="mt-2">새 글을 작성해보세요!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
