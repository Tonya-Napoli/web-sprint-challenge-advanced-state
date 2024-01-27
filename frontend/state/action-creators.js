import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from "./action-types"
import { SET_QUIZ, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SELECT_ANSWER,SET_MESSAGE } from "./action-types"
import { INPUT_CHANGE, RESET_FORM} from "./action-types"


// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
 }

 export function selectAnswer (answer_id) {
  return { type: SET_SELECTED_ANSWER, payload: answer_id };
 }

export function setMessage(message) {
  return { type: SET_MESSAGE, payload: message };
 }

export function setQuiz(quiz_id) {
  return { type: SET_QUIZ, payload: quiz_id };
 }

export function inputChange(field, value) { 
  return { type: INPUT_CHANGE, field, value };
}

export function resetForm(reset) {
  return { type: RESET_FORM, reset };
 }

 export function resetQuiz() {
  return { type: RESET_QUIZ };//do i need this?
 }

 export function fetchQuiz() {
  return async (dispatch) => {
    //dispatch(resetQuiz()); // Reset quiz state before fetching
    try {
      const response = await fetch('/api/quiz/next');
      const quiz = await response.json();
      dispatch(setQuiz(quiz));
    } catch (error) {
      console.error('Error fetching quiz:', error);
      dispatch(setMessage('Failed to fetch quiz.')); // Set error message
    }
  };
}

export function postAnswer(selectedAnswer) {
  return async (dispatch) => {
    dispatch({ type: SET_SELECTED_ANSWER, payload: selectedAnswer }); // Set selected answer state

    try {
      const response = await fetch('/api/quiz/answer', { //api/answers
        method: 'POST',
        body: JSON.stringify({ answer: selectAnswer }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const message = await response.text();
        dispatch(setMessage(message));
        dispatch(fetchQuiz()); // Fetch next quiz on successful answer
        dispatch(resetForm());
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
      const response = await fetch('/api/quiz/answer', {  //api/quizzes
        method: 'POST',
        body: JSON.stringify(newQuizData),
      });

      if (response.ok) {
        const message = await response.json();
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