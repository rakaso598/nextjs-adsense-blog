"use client";

import DeleteButton from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import React from "react";

export default function MutationButtons({ authorId, articleId }) {
  const { user } = useAuth();
  const currentUserId = user?.id;

  const isAuthor = currentUserId === authorId;

  if (!isAuthor) {
    return null;
  }

  return (
    <div className="flex space-x-2">
      <Link
        href={`/blogs/${articleId}/edit`}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        수정
      </Link>
      <DeleteButton id={articleId}>삭제</DeleteButton>
    </div>
  );
}
