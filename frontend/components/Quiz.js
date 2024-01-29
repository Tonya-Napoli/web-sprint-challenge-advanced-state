import React, { useEffect } from 'react'
import { connect } from'react-redux'
import { selectAnswer, 
          setMessage, 
          setQuiz, 
          inputChange, 
          resetForm, 
          fetchQuiz, 
          postAnswer, 
         } from '../state/action-creators'

          function Quiz(props) {
           
            useEffect(() => {
              props.fetchQuiz()
            }, []);

            const quizData = props.quiz;

            if (!quizData) {
              return <div>Loading next quiz...</div>
            }
  
            return (
              <div id="wrapper">
               {/* {props.infoMessage && <div id="message">{props.infoMessage}</div>} */}

                <h2>{quizData.question}</h2>
                <div id="quizAnswers">
                  {quizData.answers.map((answer) => (
                    <div className="answer" key={answer.answer_id}>
                      {answer.text}
                      <button onClick={() => props.selectAnswer(answer.answer_id)}>
                        {props.selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                      </button>
                    </div>
                  ))}
                </div>
                <button id="submitAnswerBtn" onClick={() => props.postAnswer(props.selectedAnswer)}
                                              disabled={!props.selectedAnswer}>Submit answer</button>
              </div>
            );
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
            setMessage,
            setQuiz,
            inputChange,
            resetForm,
            fetchQuiz,
            postAnswer,
            
          };

          export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

            
           