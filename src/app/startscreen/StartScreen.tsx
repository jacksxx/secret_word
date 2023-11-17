'use client';

import { Button } from '@/components/Button'
import React from 'react'

const StartScreen: React.FC<{ startGame: () => void }> = ({ startGame }) => {
    return (
        <>
            <div className="flex justify-center items-center text-center flex-col py-5">
                <h1 className='text-[60px] text-white py-5'>
                    Secret Word
                </h1>
                <p className='text-yellow-300 font-mono text-2xl py-5 mb-5'>
                    Aperte o botão para começar a jogar
                </p>
                <Button
                    name='Start'
                    onClick={startGame}
                />
            </div>


        </>
    )
}

export default StartScreen