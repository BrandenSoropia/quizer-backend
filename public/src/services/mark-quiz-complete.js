import request from './request';

export default function markQuizComplete(params) {
  return request.post('/quizzes/mark-complete', params);
}
