const commentForServer = (comment) => {
  return {
    article: comment.articleId,
    content: comment.content,
  };
};

export default commentForServer;
