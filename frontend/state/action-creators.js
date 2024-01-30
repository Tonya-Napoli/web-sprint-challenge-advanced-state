import { MOVE_CLOCKWISE,
         MOVE_COUNTERCLOCKWISE,
         SET_QUIZ, 
         SET_QUIZ_INTO_STATE, 
         SET_SELECTED_ANSWER, 
         SET_MESSAGE, 
         INPUT_CHANGE, 
         RESET_FORM,
         SET_LOADING,
         UPDATE_FORM} from "./action-types"

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
  console.log("Dispatching message: message is logged", message);//is the message logged?
  return { type: SET_MESSAGE, payload: message };
 }

export function setQuiz(quiz_id) {
  return { type: SET_QUIZ, payload: quiz_id };
 }

export function inputChange(field, value) { 
  return { type: INPUT_CHANGE, field, value };
}
export function resetForm() {
  return { type: RESET_FORM };
 }

 export function fetchQuiz() {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true }); // Start loading

    try {
      const response = await fetch('http://localhost:9000/api/quiz/next');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const quizData = await response.json();
      
      const actionPayload = {
        type: "SET_QUIZ_INTO_STATE",
        quiz_id: quizData.quiz_id,
        question: quizData.question,
        answers: quizData.answers,
      };

      dispatch(actionPayload);
      dispatch({ type: 'SET_LOADING', payload: false }); // Stop loading

    } catch (error) {
      console.error('Console Error/Error fetching quiz:', error);
      dispatch(setMessage('Failed to fetch quiz'));
      dispatch({ type: 'SET_LOADING', payload: false }); // Stop loading even if there's an error
    }
  };
}

export const updateForm = (formData) => {
  return { type: 'UPDATE_FORM', payload: formData };
}

export function postAnswer(selectedAnswer) {
  return async (dispatch, getState) => {
    const { quiz } = getState(); //getting current quiz from state

    try {

  
      const response = await fetch('http://localhost:9000/api/quiz/answer', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quiz_id: quiz.quiz_id, answer_id: selectedAnswer }),   
      });
      
      const result = await response.json();
      console.log("Server Response:", result);//what is the server sending?

      if (response.ok) {
        dispatch(setMessage(result.message));
        dispatch(fetchQuiz());

      } else {
        throw new Error(result.message);
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

      const formattedData = {
        question_text: newQuizData.question_text,
        true_answer_text: newQuizData.true_answer_text,
        false_answer_text: newQuizData.false_answer_text,
      }
      const response = await fetch('http://localhost:9000/api/quiz/new', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuizData), //newQuizData
      });

      if (response.ok) {
        const message = await response.json();
        dispatch(setMessage(message.message));
        dispatch(resetForm());

      } else {
        const errorData = await response.json();
        dispatch(setMessage(errorData.message));
      }
    } catch (error) {
      console.error('Error posting quiz:', error);
      dispatch(setMessage('Failed to submit quiz.'));
    }
  };
}