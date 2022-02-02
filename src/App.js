import { useState } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Dictionary from "./Dictionary";

const localDictionary = []

function loadDictionary() {
  Dictionary.split('\n').forEach(el => localDictionary.push(el.toUpperCase()))
}

function isWord(testWord) {
  return localDictionary.includes(testWord)
}

function genWord() {
  if (localDictionary.length === 0) {
    loadDictionary()
  }
  return localDictionary[Math.floor(Math.random() * localDictionary.length)]
}

function registerClick(text, word, guess, guesses, setGuess, setGuesses, setNoWord) {
  const cGuess = guesses[guess].split("")
  const cIndex = cGuess.indexOf(' ')
  if (text === "Enter") {
    if (cIndex === -1) {
      if (isWord(guesses[guess])) {
        setGuess(guess + 1)
        return guesses[guess] === word || guess === 5
      } else {
        setNoWord(true)
      }
    }
  } else if (text === "<=") {
    if (cIndex === 0) {
      return
    } else if (cIndex === -1) {
      cGuess[4] = ' '
    } else if (cIndex !== -1) {
      cGuess[cIndex - 1] = ' '
    }
  } else {
    cGuess[cIndex] = text
  }
  const newGuess = cGuess.join("")
  setGuesses(Array.from(guesses, (word, index) => index === guess ? newGuess : word))
  return false
}

export default function App() {
  const color_dict = {
    'bang': 'bg-green-500',
    'miss': 'bg-yellow-300',
    'wrong': 'bg-gray-400',
    'empty': 'bg-white',
    'keyboard': 'bg-gray-200'
  }

  genWord()

  const emptyGuesses = ["     ", "     ", "     ", "     ", "     ", "     "]
  const [word, setWord] = useState(genWord())
  const [noWord, setNoWord] = useState(false)

  const [guess, setGuess] = useState(0);
  const [guesses, setGuesses] = useState(emptyGuesses)
  const [gameOver, setGameOver] = useState(false)

  const keyboardClick = (text) => {
    setGameOver(registerClick(text, word, guess, guesses, setGuess, setGuesses, setNoWord))
  }

  const resetGame = () => {
    setGuess(0)
    setGuesses(emptyGuesses)
    setGameOver(false)
    setWord(genWord())
  }

  return (<div onClick={() => noWord ? setNoWord(false) : ""}>
    <div className={`${gameOver | noWord ? "pointer-events-none opacity-40  transition-opacity ease-in duration-500 delay-500" : "opacity-100"} flex flex-col items-center`}>
      <h1 className="text-xl">Mordle</h1>
      <Board guess={guess} guesses={guesses} word={word} color_dict={color_dict} />
      <Keyboard word={word} guesses={guesses} color_dict={color_dict} guess={guess} onClick={(text) => keyboardClick(text)} />
    </div>
    <div className={`${gameOver ? "opacity-100  transition-opacity ease-in duration-500 delay-1000" : "pointer-events-none opacity-0"} p-4 flex flex-col items-center absolute w-56 h-40 bg-white border-[1px] border-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
      <h2 className="font-bold text-lg underline">{guesses[guess - 1] === word ? "You win!" : "Oh no... Game Over!"}</h2>
      <p> {gameOver ? `The word was ${word}` : ""}</p>
      {
        guesses[guess - 1] === word ? <p>You won in {guess} guess{guess === 1 ? "" : "es"}</p> : <p className="text-white select-none">sadge</p>
      }
      <button onClick={resetGame} className="m-2 border-[2px] border-gray-500 rounded-lg p-1 hover:scale-110 transition duration-300">Play Again?</button>
    </div>
    <div className={`${noWord ? "opacity-100" : "opacity-0"} pointer-events-none p-4 flex flex-col items-center absolute w-56 h-20 bg-white border-[1px] border-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
      <h2 className="font-bold text-lg">Try Again</h2>
      <p> {guesses[guess]} is not a word</p>
    </div>
  </div >);
}