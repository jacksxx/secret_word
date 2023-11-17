/* eslint-disable react/display-name */
import React, { InputHTMLAttributes, forwardRef, useId } from "react";


type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type = "text", ...props }, ref) => {

  return (    
    <div>           
      <input        
        type={type}
        ref={ref}
        {...props}
      />      
    </div>
  );
}

);