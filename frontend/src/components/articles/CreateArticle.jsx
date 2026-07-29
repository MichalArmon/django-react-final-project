import initialDataArticle from "../../initialData/initialDataArticle";
import { useArticle } from "../../providers/ArticleProvider";

import ArticleForm from "./ArticleForm";

function CreateArticle() {
  const { handleSubmitCreateArticle } = useArticle();

  return (
    <>
      <ArticleForm
        handleSubmitArticle={handleSubmitCreateArticle}
        initialDataArticle={initialDataArticle}
        title="Publish Your Story"
      />
    </>
  );
}

export default CreateArticle;
