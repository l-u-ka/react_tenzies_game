import React from 'react'
import './index.css';
import Die from './Die'
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti'

function App() {

  function allNewDice() {
    let myArr = [];
    for (let i=0; i<10; i++) {
      myArr.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      });
    }
    return myArr;
  }
  
  
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {

    const result = dice.every(die => die.isHeld===true && die.value===dice[0].value);
        if (result) {
            setTenzies(true)
            console.log("You won!")
        }
  }, 
  [dice]);

  function holdDice(id) {
    setDice(prevDice => {
      const newDice = prevDice.map(die => {
          if (die.id === id) {
            return {...die, isHeld: !die.isHeld}
          } else {
            return die;
          }
      })
      return newDice;
    })
  }
  /* another way:
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : die
    }))
  }
  */



  const diceElements = dice.map(die => 
  <Die 
    key = {die.id} 
    value={die.value} 
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)}

    /* another way:
    id={die.id}
    holdDice = {holdDice}
    and in die component: onClick = {() => props.holdDice(props.id)}
    */
  />)

  function rollDice() {
    if (!tenzies) {
    setDice(prevDice => {
      const currentDice = prevDice.map(die => {
        return die.isHeld ? die : {value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()};
      })
      return currentDice;
      
    }) 
  } else {
    setTenzies(false);
    setDice(allNewDice());
  }
  }
  

  return (
      <main>
        {tenzies && <Confetti/>}
        <section>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </section>
        <div className="dice-container">
         {diceElements}
        </div>
        <button onClick = {rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
  );
}

export default App;
