import { Button } from "@/components/Button";

interface IEndGame {
  retry: () => void;
  score: number;
}

const EndGame: React.FC<IEndGame> = ({ retry, score }) => {
  return (
    <div className="flex justify-center items-center text-center flex-col gap-16">
      <h1 className="text-6xl md:text-8xl bg-gradient-to-r from-red-500 via-pink-400 to-white text-transparent bg-clip-text py-2">
        Fim de Jogo!
      </h1>
      <div className="gap-5 flex flex-col p-2">
        <h2 className="text-3xl font-semibold">A sua pontuação foi:</h2>
        <span className="text-yellow-300 text-3xl">{score}</span>
      </div>
      <Button
        onClick={retry}
        className="animate-pulse ease-in-out duration-500 hover:scale-125"
      >
        Resetar Jogo
      </Button>
    </div>
  );
};

export default EndGame;
