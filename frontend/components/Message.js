import React from 'react'

export default function Message(props) {
  let message;
  if (props.isCorrect === true) {
    message = "Nice Job! That was the correct answer.";
  } else if (props.isCorrect === false) {
    message = "What a shame! That answer is incorrect.";
  } else {
    message = ""; // Default message or you can leave it empty
  }

  return <div id="message">{message}</div>;
}

