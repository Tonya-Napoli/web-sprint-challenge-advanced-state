import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const [formData, setFormData] = useState({
    question_text: '',
    true_answer_text: '',
    false_answer_text: '',
  });

 
  useEffect (() => {
    // load saved data from local storage on mount
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);
  // Save data to local storage on change
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);


  const handleChange = ( event ) => {
    setFormData({
     ...formData,
      [event.target.id]: event.target.value
    });
  };

  const onSubmit = evt => {
    evt.preventDefault();
    props.postQuiz(formData);
    setFormData({
      question_text: '',
      true_answer_text: '',
      false_answer_text: '',
    });
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>

      <input 
        maxLength={50}
        value={formData.question_text}
        onChange={handleChange} 
        id="question_text" 
        placeholder="Enter question" 
      />

      <input 
        maxLength={50} 
        value={formData.true_answer_text}
        onChange={handleChange} 
        id="true_answer_text" 
        placeholder="Enter true answer" 
      />

      <input 
        maxLength={50} 
        value={formData.false_answer_text}
        onChange={handleChange} 
        id="false_answer_text" 
        placeholder="Enter false answer" 
      />

      <button type="submit" id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  );
}

export default connect(st => st, actionCreators)(Form);
