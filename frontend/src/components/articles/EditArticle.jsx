import { useEffect, useState } from "react";
import { initialEditDataArticle } from "../../initialData/initialDataArticle";
import { useArticle } from "../../providers/ArticleProvider";

import ArticleForm from "./ArticleForm";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

function EditArticle() {
  const { articleId } = useParams();
  const { handleSubmitCreateArticle, handleGetOneArticle } = useArticle();
  const [initial, setInitial] = useState(null);
  const getInitialData = async () => {
    const article = await handleGetOneArticle(articleId);
    const initialEditDataNew = initialEditDataArticle(article);
    setInitial(initialEditDataNew);
  };

  useEffect(() => {
    getInitialData();
  }, [articleId]);

  if (!initial) {
    return <Box> wait</Box>;
  }

  return (
    <>
      <ArticleForm
        handleSubmitArticle={handleSubmitCreateArticle}
        initialDataArticle={initial}
        title="Edit Article"
      />
    </>
  );
}

export default EditArticle;
