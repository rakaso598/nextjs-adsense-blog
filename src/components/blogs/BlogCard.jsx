import Link from "next/link";
import React from "react";

export default function BlogCard({ article }) {
  return (
    <div
      key={article.id}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {article.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{article.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
          <Link
            href={`/blogs/${article.id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
