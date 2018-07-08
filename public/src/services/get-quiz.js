import request from "./request";
import camelize from "camelize";

export default function getCurrentActiveQuiz(params) {
  return request.post("/quizzes/current-quiz", params).then(quiz => {
    if (!quiz) {
      // Currently backend sends null if no matching quiz
      return {};
    }
    return camelize(quiz);
  });
}
