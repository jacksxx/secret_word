"use client";
import { useCallback, useEffect, useReducer, useState } from "react";
import StartScreen from "./startscreen/StartScreen";
import { wordsList } from "@/data/word";
import InGame from "./ingame/InGame";
import EndGame from "./endgame/EndGame";
import BaseDiv from "@/components/BaseDiv";

function removeAccents(str: string): string {
  // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

interface WordData {
  [category: string]: string[];
}

type GameStage = "Start" | "inGame" | "End";

interface GameState {
  stage: GameStage;
  words: WordData;
  pickedWord: string;
  pickedCategory: string;
  letters: string[];
  guessedLetters: string[];
  wrongLetters: string[];
  guesses: number;
  score: number;
}

type GameAction =
  | { type: "START_GAME"; word: string; category: string }
  | { type: "END_GAME" }
  | { type: "GUESS_CORRECT"; letter: string }
  | { type: "GUESS_WRONG"; letter: string }
  | { type: "NEXT_STAGE" }
  | { type: "RETRY" };

const MAX_GUESSES = 3;
const SCORE_INCREMENT = 100;

const initialState: GameState = {
  stage: "Start",
  words: wordsList,
  pickedWord: "",
  pickedCategory: "",
  letters: [],
  guessedLetters: [],
  wrongLetters: [],
  guesses: MAX_GUESSES,
  score: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME": {
      const normalizedLetters = removeAccents(action.word.toLowerCase()).split(
        ""
      );

      return {
        ...state,
        stage: "inGame",
        pickedWord: action.word,
        pickedCategory: action.category,
        letters: normalizedLetters,
        guessedLetters: [],
        wrongLetters: [],
        guesses: MAX_GUESSES,
      };
    }
    case "END_GAME":
      return {
        ...state,
        stage: "End",
      };
    case "GUESS_CORRECT":
      return {
        ...state,
        guessedLetters: [...state.guessedLetters, action.letter],
      };
    case "GUESS_WRONG":
      return {
        ...state,
        wrongLetters: [...state.wrongLetters, action.letter],
        guesses: state.guesses - 1,
      };
    case "NEXT_STAGE":
      return {
        ...state,
        score: state.score + SCORE_INCREMENT,
      };
    case "RETRY":
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const pickRandomWordAndCategory = useCallback(() => {
    
    const categories = Object.keys(state.words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    const wordIndex = Math.floor(Math.random() * state.words[category].length);
    const word = state.words[category][wordIndex];

    return { word, category };
  }, [state.words]);

  const startGame = useCallback(() => {
    const { word, category } = pickRandomWordAndCategory();
    dispatch({ type: "START_GAME", word, category });
  }, [pickRandomWordAndCategory]);

  const verifyLetter = (letter: string) => {
    const normalizedLetter = removeAccents(letter.toLowerCase());
    if (
      state.guessedLetters.includes(normalizedLetter) ||
      state.wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (state.letters.includes(normalizedLetter)) {
      dispatch({ type: "GUESS_CORRECT", letter: normalizedLetter });
    } else {
      dispatch({ type: "GUESS_WRONG", letter: normalizedLetter });
    }
  };

  useEffect(() => {
    if (state.guesses <= 0 && state.stage === "inGame") {
      dispatch({ type: "END_GAME" });
    }
  }, [state.guesses, state.stage]);

  //checar condição de vitoria
  useEffect(() => {
    const uniqueLetters = [...new Set(state.letters)];
    const allGuessed = uniqueLetters.every((l) =>
      state.guessedLetters.includes(l)
    );

    if (allGuessed && state.stage === "inGame") {
      setTimeout(() => {
        dispatch({ type: "NEXT_STAGE" });
        startGame();
      }, 500);
    }
  }, [state.guessedLetters, state.letters, state.stage, startGame]);

  return (
    <BaseDiv>
      {state.stage === "Start" && <StartScreen startGame={startGame} />}
      {state.stage === "inGame" && (
        <InGame
          verifyLetter={verifyLetter}
          guessedLetters={state.guessedLetters}
          wrongLetters={state.wrongLetters}
          guesses={state.guesses}
          letters={state.letters}
          pickedCategory={state.pickedCategory}
          pickedWord={state.pickedWord}
          score={state.score}
        />
      )}
      {state.stage === "End" && (
        <EndGame
          retry={() => dispatch({ type: "RETRY" })}
          score={state.score}
        />
      )}
    </BaseDiv>
  );
}
