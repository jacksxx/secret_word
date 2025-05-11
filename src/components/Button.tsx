import type React from 'react';

export const Button = ({
  type = "submit",
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      type={type}
      className={`${className} text-center bg-blue-500 text-white border-2 border-yellow-300 rounded-full py-3 min-w-[200px] hover:bg-blue-600 hover:border-yellow-500`}
      {...props}
    />
  );
};
