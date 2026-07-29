export function initialDataArticle() {
  return {
    title: "New Government Plan Announced",
    content:
      "Researchers continue to examine the possible effects of this development. More information is expected to become available in the coming months.",

    tags: [],
  };
}

export function initialEditDataArticle(article) {
  return {
    title: article.title,
    content: article.content,

    tags: article.tags || [],
  };
}
