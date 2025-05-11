import type React from 'react';

export const Input = ({
  type = "text",
  ...props
}: React.ComponentProps<"input">) => {
  return <input type={type} {...props} />;
};
