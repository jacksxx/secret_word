import BaseDiv from "@/components/BaseDiv";
import { Button } from "@/components/Button";

interface IEndGame {
  retry: () => void;
  score: number;
}

const EndGame: React.FC<IEndGame> = ({ retry, score }) => {
  return (
    <>
      <h1 className="py-2 text-[40px] font-semibold">Fim de Jogo!</h1>
      <h2 className="py-5 text-[30px] font-semibold flex gap-2">
        A sua pontuação foi:
        <span className="text-yellow-300">{score}</span>
      </h2>
      <Button onClick={retry}>Resetar Jogo</Button>
    </>
  );
};

export default EndGame;
