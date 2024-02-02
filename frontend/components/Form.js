import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setMessage, 
  setQuiz,
  fetchQuiz,
  postAnswer,
  inputChange,
  postQuiz 
} from '../state/action-creators';


export function Form(props) {
  useEffect(() => {
    console.log("Form useEffect called", props);
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const formData = JSON.parse(savedData);
      Object.entries(formData).forEach(([field, value]) => {
        props.inputChange(field, value);
      });
    }
  }, [props.inputChange]); 

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(`handleChange called: id=${id}, value=${value}`);
   // props.inputChange(id, value);

   const fieldMap = { 
    newQuestion: 'question_text',
    newTrueAnswer: 'true_answer_text',
    newFalseAnswer: 'false_answer_text',
   }

   const fieldName = fieldMap[id] || id;

   props.inputChange(fieldName, value);
  };

  const isFormValid = props.form.question_text.trim().length >= 1 &&
                      props.form.true_answer_text.trim().length >= 1 &&
                      props.form.false_answer_text.trim().length >= 1 ;

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log("what is the props question_text", props.form);
    if (isFormValid) {
      await props.postQuiz({
        question_text: props.form.question_text,
        true_answer_text: props.form.true_answer_text ,
        false_answer_text: props.form.false_answer_text
      });

      console.log("what is the props question_text", props.form.question_text);
      console.log("what is the props trueAnswer", props.form.true_answer_text);
      console.log("what is the props falseAnswer", props.form.false_answer_text);

    } else {
      console.log('Form is invalid.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Quiz</h2>
      <input
  id="newQuestion"
  maxLength={50}
  value={props.form.question_text || ''}
  onChange={handleChange}
  placeholder="Enter question"
/>
<input
  id="newTrueAnswer"
  maxLength={50}
  value={props.form.true_answer_text || ''}
  onChange={handleChange}
  placeholder="Enter true answer"
/>
<input
  id="newFalseAnswer"
  maxLength={50}
  value={props.form.false_answer_text || ''}
  onChange={handleChange}
  placeholder="Enter false answer"
/>

<button type="submit" disabled={!isFormValid} id="submitNewQuizBtn">
  Submit new quiz
</button>



    </form>
  );
}

const mapStateToProps = (state) => ({
  form: state.form, 
  infoMessage: state.infoMessage,
});

const mapDispatchToProps = {
  inputChange, 
  postQuiz, 
  setMessage,
  setQuiz,
  fetchQuiz,
  postAnswer,
  inputChange
};


export default connect(mapStateToProps, mapDispatchToProps)(Form);

  


