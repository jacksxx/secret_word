import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  type = "submit",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} text-center bg-blue-500 text-white border-2 border-yellow-300 rounded-full py-3 min-w-[200px] hover:bg-blue-600 hover:border-yellow-500`}
      {...props}
    />
  );
};

//text-center bg-blue-500 text-white border-2 border-yellow-300 rounded-full py-3 w-[200px] hover:bg-blue-400 hover:border-yellow-500
