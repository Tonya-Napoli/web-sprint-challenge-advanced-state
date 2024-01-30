import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  // Separate state variables for each input
  const [newQuestion, setNewQuestion] = useState('');
  const [newTrueAnswer, setNewTrueAnswer] = useState('');
  const [newFalseAnswer, setNewFalseAnswer] = useState('');

  const onChange = evt => {
    const { id, value } = evt.target;
    if (id === 'newQuestion') setNewQuestion(value);
    else if (id === 'newTrueAnswer') setNewTrueAnswer(value);
    else if (id === 'newFalseAnswer') setNewFalseAnswer(value);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    const formattedData = {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer,
    };
    props.postQuiz(formattedData);
    setNewQuestion('');
    setNewTrueAnswer('');
    setNewFalseAnswer('');
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>

      <input 
        maxLength={50}
        value={newQuestion}
        onChange={onChange} 
        id="newQuestion" 
        placeholder="Enter question" 
      />

      <input 
        maxLength={50} 
        value={newTrueAnswer}
        onChange={onChange} 
        id="newTrueAnswer" 
        placeholder="Enter true answer" 
      />

      <input 
        maxLength={50} 
        value={newFalseAnswer}
        onChange={onChange} 
        id="newFalseAnswer" 
        placeholder="Enter false answer" 
      />

      <button type="submit" id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  );
}

export default connect(st => st, actionCreators)(Form);
