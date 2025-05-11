import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ type = "text", ...props }, ref) => {
  return <input ref={ref} type={type} {...props} />;
});

Input.displayName = "Input";
