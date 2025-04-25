import { defaultFetch, tokenFetch } from "@/lib/fetchClient";

export const articleService = {
  // 사용자 정보 요청
  getArticles: () => defaultFetch("/articles"),
  getArticleById: (id) => tokenFetch(`/articles/${id}`),
  createArticle: ({
    image = "https://picsum.photos/200/300",
    content,
    title,
  }) =>
    tokenFetch("/articles", {
      method: "POST",
      body: JSON.stringify({ image, content, title }),
    }),
  updateArticle: ({ image, content, title, id }) =>
    tokenFetch(`/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ image, content, title }),
    }),
  deleteArticle: (id) => tokenFetch(`/articles/${id}`, { method: "DELETE" }),
};
