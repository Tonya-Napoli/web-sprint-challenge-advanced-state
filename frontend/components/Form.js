import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';


  export function Form(props) {
    useEffect(() => {
      const savedData = localStorage.getItem('formData');
      if (savedData) {
        const formData = JSON.parse(savedData);
        Object.entries(formData).forEach(([field, value]) => {
          props.inputChange(field, value);
        });
      }
    }, [props.inputChange]); 


  const handleChange = ( event ) => {
    const { id, value } = event.target;
    props.inputChange(id, value);
  };

  const isFormValid = props.formData.newQuestion.trim().length > 0 &&
                    props.formData.newTrueAnswer.trim().length > 0 &&
                    props.formData.newFalseAnswer.trim().length > 0;

   
  const onSubmit = (evt) => {
    evt.preventDefault();

    
    props.postQuiz(props.formData);
    props.resetForm();
  };

  console.log("Form:props.formData is logged", props.formData);

  //const isFormValid = Object.values(props.formData).every(value => value.trim().length > 0);

  console.log("IsFormValid Results:", isFormValid);

  Object.entries(props.formData).forEach(([key, value]) => {
    console.log(`${key}: '${value}' (trimmed length: ${value.trim().length})`);
  });
  

  return (
    <form onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>

      <input
        maxLength={50}
        value={props.formData.newQuestion || ''}
        onChange={handleChange}
        id="newQuestion"
        placeholder="Enter question"
      />

      <input
        maxLength={50}
        value={props.formData.newTrueAnswer || ''}
        onChange={handleChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />

      <input
        maxLength={50}
        value={props.formData.newFalseAnswer || ''}
        onChange={handleChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />

      <button type="submit"
        disabled={!isFormValid}
      >
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  formData: state.form, // Assuming the form data is stored in state.form
});
const mapDispatchToProps = actionCreators;

export default connect(mapStateToProps, actionCreators)(Form);
  


