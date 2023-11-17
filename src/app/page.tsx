'use client'
import { useCallback, useEffect, useState } from "react";
import StartScreen from "./startscreen/StartScreen";
import { wordsList } from '@/data/word'
import InGame from "./ingame/InGame";
import EndGame from "./endgame/EndGame";


interface WordData {
  [category: string]: string[];
}

const stages = [
  { id: 1, name: "Start" },
  { id: 2, name: "inGame" },
  { id: 3, name: "End" },
]

export default function Home() {

  const [gameStage, setGameStage] = useState<string>(stages[0].name);
  const [words] = useState<WordData>(wordsList);
  const [pickedWord, setPickedWord] = useState<string>("");
  const [pickedCategory, setPickedCategory] = useState<string>("");
  const [letters, setLetters] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(3);
  const [score, setScore] = useState<number>(0);

  const pickWeC = useCallback(() => {
    //Pegando uma categoria aleatoria
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    //Pegando uma palavra aleatoria
    const wordIndex = Math.floor(Math.random() * words[category].length);
    const word = words[category][wordIndex];

    return { word, category };
  }, [words])

  const startGame = useCallback(() => {
    clearStates();
    //pick word and category
    const { word, category } = pickWeC();
    //split letters from the word
    let wordLetters = word.split("");
    //lower case from the letters
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    setGameStage(stages[1].name)
  }, [pickWeC])

  const verifyLetter = (letter: string) => {
    const normalizedLetter = letter.toLowerCase();
    //checando se a letra já foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    //chegando guessed letter ou guess remove
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }
  //clear letters and states
  const clearStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  //checar condição de derrota
  useEffect(() => {
    if (guesses <= 0) {
      clearStates();
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //checar condição de vitoria
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      setScore((actualScore) => actualScore += 100)
      startGame()
    }


  }, [guessedLetters, letters, startGame, gameStage])

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name)
  }

  return (
    <>
      {gameStage === "Start" &&
        <StartScreen
          startGame={startGame}
        />}
      {gameStage === "inGame" &&
        <InGame
          verifyLetter={verifyLetter}
          guessedLetters={guessedLetters}
          guesses={guesses}
          letters={letters}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          score={score}
          wrongLetters={wrongLetters}
        />
      }
      {gameStage === "End" &&
        <EndGame
          retry={retry}
          score={score}
        />
      }
    </>
  )
}
