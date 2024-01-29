import React from 'react'
import {connect } from 'react-redux';

function Message(props) {
  return(
    <div>
      {props.infoMessage && <div id="message">{props.infoMessage}</div>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    infoMessage: state.infoMessage
  }
}

export default connect(mapStateToProps)(Message);


