import { jwtDecode } from "jwt-decode";

const GetUserId = () => {
  const token = localStorage.getItem("access token");
  const decoded = jwtDecode(token);
  const userid = decoded.user_id;
  return userid;
};

const ArticleToServer = (articleDetails) => {
  return {
    title: articleDetails.title,
    content: articleDetails.content,
    author: GetUserId(),
    tag_ids: articleDetails.tags || [],
    published_at: articleDetails.published_at,
    views: articleDetails.views || 0,
    likes: articleDetails.likes || 0,
    word_count: articleDetails.word_count || 0,
    is_breaking_news: articleDetails.is_breaking_news || false,
  };
};

export default ArticleToServer;
