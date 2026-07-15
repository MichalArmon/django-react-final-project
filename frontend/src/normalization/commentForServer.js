const commentForServer = (comment) => {
  return {
    article: comment.article,
    content: comment.content,
  };
};

export default commentForServer;
