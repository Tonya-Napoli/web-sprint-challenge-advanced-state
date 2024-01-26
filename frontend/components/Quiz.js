import React from 'react'
import { connect } from'react-redux'
import { selectAnswer, setInfoMessage, setQuiz, inputChange, resetForm, fetchQuiz, postAnswer, postQuiz } from '../state/action-creators'
 

function Quiz(props) {
  //console.log("The quiz is: ", props);
  console.log("The selected answer is: ", props.selectedAnswer);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                A function
                <button onClick={() => props.selectAnswer('A function')}>
                 {props.selectedAnswer === 'A function' ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className="answer">
                An elephant
                <button onClick={() => props.selectAnswer('An elephant')}>  
                 {props.selectedAnswer === 'An elephant' ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={() => props.postAnswer(props.selectedAnswer)}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    infoMessage: state.infoMessage,
    form: state.form,
  }
};

const mapDispatchToProps = {
  selectAnswer,
  setInfoMessage,
  setQuiz,
  inputChange,
  resetForm,
  fetchQuiz,
  postAnswer,
  postQuiz,
};
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
