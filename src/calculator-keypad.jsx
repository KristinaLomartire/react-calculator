  import React from 'react';
  import CalculatorInput from './calculator-input';


  class CalculatorKeypad extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        value: null,
        inputValue: '0',
        waitingForAction: false,
        operator: null,
        memory: null,
        savedActions: [],
        selectedButton: ''

      }
    }

    setInputValue = newValue => {
      this.setState({inputValue: newValue});
    }

    inputDigit(digit){
      let {inputValue, waitingForAction} = this.state;

      if(waitingForAction){
        this.setState({
          inputValue: String(digit),
          waitingForAction: false
        })
      }
      else {
        this.setState({
          inputValue: inputValue === '0' ?
          String(digit) : inputValue + digit
        })
      }
    }
    //inputDigit ends here


    saveValueToList(){
      this.setState(state => {
        const savedActions = [...state.savedActions, state.value];

        return {
          savedActions,
          value: '',
        }
      })
    }
    //saveResult to list ends.

    memoryAdd() {
      let { inputValue} = this.state;
      this.setState({
        memory: inputValue,
        selectedButton: 'memoryAdd',
      })
    }
    //memoryAdd ends here.

    memoryMin() {
      let {memory, inputValue} = this.state;

        this.setState({
          inputValue: memory,
          memory: -inputValue,
          selectedButton: 'memoryMin',

        })
    }
    //memoryMin ends here.

    clearInput(){
      this.setState({
        inputValue: '0',
        selectedButton: 'clear'
      })
    }
    // clearInput ends here.

    executeOperation (nextOperator)  {
      let {inputValue, operator, value} =
      this.state;

      let nextValue =
      parseFloat(inputValue);

      const operations = {
        "+": (preValue, nextValue) => preValue + nextValue,
        "-": (preValue, nextValue) => preValue - nextValue,
        "=": (preValue, nextValue) => nextValue,
      }

      if(value == null){
        this.setState({
          value:nextValue
        })
      }
      else {
        const currentValue = value || 0;

        const computedValue = operations[operator] (currentValue, nextValue);

            this.setState({
              value: computedValue,
              inputValue: String(computedValue)
            })
      }

      let sb='';

      if(nextOperator === '+') {
        sb = 'keyAdd';
      }
      else if (nextOperator === '-') {
        sb = 'keySubtract';
      }
      else if (nextOperator === '='){
        sb = 'keyEqals';
      }


      this.setState({
        waitingForAction: true,
        operator: nextOperator,
        selectedButton: sb
      })


    }
    //executeOperation ends here.

    render() {
      //const {inputValue} = this.state;

      let calculations;

      if(this.state.savedActions){
        calculations = this.state.savedActions.map(
          (e, index) => <li key={index}> {e} </li>
        )
      }
      const selectionStyle = {backgroundColor:'#B41AB4'};
      return(


        <div className="calculator">
        <div>
        <h1>The Amazing Calculator</h1>
        <CalculatorInput value={this.state.inputValue}
                          liftValue={this.setInputValue} />

        </div>

        <div>
        <button className="keyAdd" onClick={() => this.executeOperation('+')}
          style={this.state.selectedButton === 'keyAdd' ? selectionStyle : null }
          >+</button>

        <button className="keySubtract" onClick={() => this.executeOperation('-')}
          style={this.state.selectedButton === 'keySubtract' ? selectionStyle : null }
          >-</button>

        <button className="keyEqals" onClick={() => {this.executeOperation('=');
          this.saveValueToList()}}
          style={this.state.selectedButton === 'keyEqals' ? selectionStyle : null }
          >=</button>

        <button className="memoryMin" onClick={() => this.memoryMin()}
          style={this.state.selectedButton === 'memoryMin' ? selectionStyle : null }
          >M-</button>

        <button className="memoryAdd" onClick={() => this.memoryAdd()}
          style={this.state.selectedButton === 'memoryAdd' ? selectionStyle : null }
          >M+</button>

        <button className="clear" onClick={() => this.clearInput()}
          style={this.state.selectedButton === 'clear' ? selectionStyle : null }
          >AC</button>

        <p className="savedResults">Saved value: { this.state.memory }</p>

        <ul>Calculations: { calculations }</ul>
        </div>
        </div>

    )

    };

  };


  export default CalculatorKeypad;
