import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from "./action-types"
import { SET_QUIZ_INTO_STATE } from "./action-types"
import { SET_SELECTED_ANSWER } from "./action-types"


// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
 }

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, answer };
 }

export function setMessage(message) {
  return { type: SET_MESSAGE, message };
 }

export function setQuiz(quiz) {
  return { type: SET_QUIZ, quiz };
 }

 export function setQuizIntoState(quiz) {
  return { type: SET_QUIZ_INTO_STATE, quiz };
 }

export function inputChange(field, value) { 
  return { type: INPUT_CHANGE, field, value };
}

export function resetForm(reset) {
  return { type: RESET_FORM, reset };
 }

 export function resetQuiz() {
  return { type: RESET_QUIZ };
 }

 export function fetchQuiz() {
  return async (dispatch) => {
    dispatch(resetQuiz()); // Reset quiz state before fetching
    try {
      const response = await fetch('/api/quizzes/next'); // Assuming your API endpoint
      const quiz = await response.json();
      dispatch(setQuiz(quiz));
    } catch (error) {
      console.error('Error fetching quiz:', error);
      dispatch(setMessage('Failed to fetch quiz.')); // Set error message
    }
  };
}

export function postAnswer(answer) {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/answers', {
        method: 'POST',
        body: JSON.stringify({ answer }),
      });

      if (response.ok) {
        dispatch(resetSelectedAnswer());
        const message = await response.text();
        dispatch(setMessage(message));
        dispatch(fetchQuiz()); // Fetch next quiz on successful answer
      } else {
        const errorData = await response.json();
        dispatch(setMessage(errorData.error));
      }
    } catch (error) {
      console.error('Error posting answer:', error);
      dispatch(setMessage('Failed to submit answer.'));
    }
  };
}

export function postQuiz(newQuizData) {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        body: JSON.stringify(newQuizData),
      });

      if (response.ok) {
        const message = await response.text();
        dispatch(setMessage(message));
        dispatch(resetForm());
      } else {
        const errorData = await response.json();
        dispatch(setMessage(errorData.error));
      }
    } catch (error) {
      console.error('Error posting quiz:', error);
      dispatch(setMessage('Failed to submit quiz.'));
    }
  };
}