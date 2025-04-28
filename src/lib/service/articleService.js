import { defaultFetch, tokenFetch } from "@/lib/fetchClient";

export const articleService = {
  // 사용자 정보 요청
  getArticles: () => tokenFetch("/articles", { cache: "no-store" }),
  getArticleById: (id) =>
    defaultFetch(`/articles/${id}`, { cache: "no-store" }),
  createArticle: ({
    image = "https://picsum.photos/200/300",
    content,
    title,
  }) =>
    tokenFetch("/articles", {
      method: "POST",
      body: JSON.stringify({ image, content, title }),
      cache: "no-store",
    }),
  updateArticle: ({ image, content, title, articleId }) =>
    tokenFetch(`/articles/${articleId}`, {
      method: "PATCH",
      body: JSON.stringify({ image, content, title }),
      cache: "no-store",
    }),
  deleteArticle: (id) =>
    tokenFetch(`/articles/${id}`, { method: "DELETE", cache: "no-store" }),
};
