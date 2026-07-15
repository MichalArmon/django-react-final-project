import Joi from "joi";

const forbiddenWords = [
  // Hebrew
  "מטומטם",
  "מטומטמת",
  "דפוק",
  "דפוקה",
  "אידיוט",
  "אידיוטית",
  "זונה",
  "שרמוטה",

  // English
  "idiot",
  "stupid",
  "bitch",
  "fuck",
  "shit",
];

function normalizeComment(value) {
  return value
    .toLowerCase()
    .replace(/[.,!?'"():;_\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const commentSchema = Joi.object({
  article: Joi.number(),
  content: Joi.string()
    .trim()
    .min(2)
    .max(500)
    .required()
    .custom((value, helpers) => {
      const normalizedComment = normalizeComment(value);

      const containsForbiddenWord = forbiddenWords.some((word) => {
        const normalizedWord = normalizeComment(word);

        return normalizedComment.split(" ").includes(normalizedWord);
      });

      if (containsForbiddenWord) {
        return helpers.error("comment.profanity");
      }

      return value;
    })
    .messages({
      "string.empty": "Please write a comment",
      "string.min": "The comment must contain at least 2 characters",
      "string.max": "The comment cannot contain more than 500 characters",
      "any.required": "A comment is required",
      "comment.profanity":
        "Please write the comment without offensive language",
    }),
});
