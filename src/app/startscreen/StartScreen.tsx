"use client";
import { Button } from "@/components/Button";

const StartScreen: React.FC<{ startGame: () => void }> = ({ startGame }) => {
  return (
    <>
      <div className="flex justify-center items-center text-center flex-col gap-28">
        <h1 className="text-6xl md:text-8xl bg-gradient-to-r from-yellow-400 via-pink-300 to-white text-transparent bg-clip-text">
          Secret Word
        </h1>
        <p className="text-yellow-300 font-mono text-2xl ">
          Aperte o botão para começar a jogar
        </p>
        <Button
          onClick={startGame}
          className="animate-pulse ease-in-out duration-500 hover:scale-125"
        >
          Start
        </Button>
      </div>
    </>
  );
};

export default StartScreen;
