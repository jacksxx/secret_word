import React from 'react'

/* eslint-disable react/display-name */
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (({ type = 'submit', className = '', name = '', ...props }: ButtonProps) => {
    return (
        <div>
            <button
                type={type}
                name={name}
                className='text-center bg-blue-500 text-white border-2 border-yellow-300 rounded-full py-3 w-[200px] hover:bg-blue-400 hover:border-yellow-500'
                {...props}
            >{name}
            </button>
        </div>

    )
}
);