"use client";

import { articleService } from "@/lib/service/articleService";
import { useRouter } from "next/navigation";

export default function DeleteButton({ children, id }) {
  const router = useRouter();
  const handleDelete = async () => {
    await articleService.deleteArticle(id);
    router.replace("/blogs");
  };
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={handleDelete}
    >
      {children}
    </button>
  );
}
