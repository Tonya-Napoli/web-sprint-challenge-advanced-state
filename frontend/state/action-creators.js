import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from "./action-types"
import { SET_QUIZ_INTO_STATE } from "./action-types"
import { SET_SELECTED_ANSWER, SET_INFO_MESSAGE } from "./action-types"


// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
 }

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer };
 }

export function setInfoMessage(message) {
  return { type: SET_INFO_MESSAGE, message };
 }

export function setQuiz(quiz) {
  return { type: SET_QUIZ, payload: quiz };
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
      const response = await fetch('/api/quiz/next'); // Assuming your API endpointv - quizzes
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
    dispatch({ type: SET_SELECTED_ANSWER, answer: selectedAnswer }); // Set selected answer state

    try {
      const response = await fetch('/api/quiz/answer', { //api/answers
        method: 'POST',
        body: JSON.stringify({ answer: selectedAnswer }),
      });

      if (response.ok) {
        //dispatch(resetSelectedAnswer());
        const message = await response.text();
        dispatch(setMessage(message));
        dispatch(fetchQuiz()); // Fetch next quiz on successful answer
        dispatch(resetSelectedAnswer());
      } else {
        const errorData = await response.json();
        dispatch(setInfoMessage(errorData.error));
      }
    } catch (error) {
      console.error('Error posting answer:', error);
      dispatch(setInfoMessage('Failed to submit answer.'));
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
        const message = await response.text();
        dispatch(setInfoMessage(message));
        dispatch(resetForm());
      } else {
        const errorData = await response.json();
        dispatch(setInfoMessage(errorData.error));
      }
    } catch (error) {
      console.error('Error posting quiz:', error);
      dispatch(setInfoMessage('Failed to submit quiz.'));
    }
  };
}