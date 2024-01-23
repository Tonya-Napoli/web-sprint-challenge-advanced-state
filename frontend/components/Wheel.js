import React from 'react';
import { connect } from'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';



function Wheel(props) {
  const { activeIndex } = props;

  console.log("The active index is: ", activeIndex);

  return (
    <div id="wrapper">
      <div id="wheel">
      {[...Array(6)].map((_, index) => ( // This creates an array of 6 elements
          <div className={`cog ${index === activeIndex ? 'active' : ''}`} style={{ "--i": index }} key={index}>
            {index === activeIndex ? 'B' : ''}
          </div>
        ))}
      
    
    </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={props.moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={props.moveClockwise}>Clockwise</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    activeIndex: state.wheel
  }
};

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
