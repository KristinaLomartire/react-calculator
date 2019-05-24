import React from 'react';


const CalculatorInput = props => (

  <input type="text" className="CalculatorInput" placeholder="Start calculating" value={props.value}
          onChange={e => props.liftValue(e.target.value)}/>
)

export default CalculatorInput;
