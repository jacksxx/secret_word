const BoxLetters = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="uppercase font-bold border-[3px] border-black border-solid flex bg-white text-black justify-center items-center justify-items-center w-[60px] h-[80px]">
      {children}
    </div>
  );
};

export default BoxLetters;
