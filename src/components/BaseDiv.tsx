const BaseDiv = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center text-center flex-col py-5 mx-1 text-white min-h-screen">
      {children}
    </div>
  );
};

export default BaseDiv;
