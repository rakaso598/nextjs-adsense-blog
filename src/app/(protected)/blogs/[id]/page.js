import Link from "next/link";
import { articleService } from "@/lib/service/articleService";
import MutationButtons from "@/components/blogs/MutationButtons";

export default async function BlogDetailPage({ params }) {
  const { id } = await params;

  const article = await articleService.getArticleById(id);

  if (!article) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-600">글을 찾을 수 없습니다.</p>
        <Link href="/blogs" className="mt-4 text-blue-500 hover:text-blue-700">
          블로그 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/blogs" className="text-blue-500 hover:text-blue-700">
          ← 목록으로 돌아가기
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <MutationButtons
            authorId={article.writer.id}
            articleId={article.id}
          />
        </div>

        <div className="text-gray-500 mb-4">
          <p>작성일: {new Date(article.createdAt).toLocaleDateString()}</p>
          {article.updatedAt && article.updatedAt !== article.createdAt && (
            <p>수정일: {new Date(article.updatedAt).toLocaleDateString()}</p>
          )}
        </div>

        {article.imageUrl && (
          <div className="mb-6">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto max-h-96 object-cover rounded"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{article.content}</p>
        </div>
      </article>
    </div>
  );
}
