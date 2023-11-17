'use client';

import BaseDiv from '@/components/BaseDiv';
import BoxLetters from '@/components/BoxLetters';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface IonGame {
  verifyLetter: (letter: string) => void,
  pickedWord: string,
  pickedCategory: string,
  letters: string[],
  guessedLetters: string[],
  wrongLetters: string[],
  guesses: number,
  score: number
}

interface Letr {
  letter: string
}

const InGame: React.FC<IonGame> = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Letr>();


  const onSubmit: SubmitHandler<Letr> = (data, event) => {
    event?.preventDefault();
    setFocus('letter');
    verifyLetter(data.letter);
    reset();
    setFocus('letter');
  }


  return (
    <>
      <BaseDiv>
        <h1 className='py-2 text-[20px] font-semibold'>
          Pontuação: {score}
        </h1>
        <h2 className='py-2 text-[30px]'>
          Adivinhe a Palavra:
        </h2>
        <h3 className='py-2 text-[25px] flex gap-2'>
          Dica sobre a palavra:
          <p className='text-yellow-300'>{pickedCategory}</p>
        </h3>
        <p className='py-3'>{guesses} Tentativa(s).</p>
        {/*wordContainer */}
        <div className='container border-8 border-solid border-yellow-500 py-5 text-[40px] flex justify-center gap-1 max-w-4xl px-4'>
          {
            letters.map((letters, i) => (
              guessedLetters.includes(letters) ? (
                <BoxLetters key={i}>{letters}</BoxLetters>
              ) : (
                <BoxLetters key={i}>{ }</BoxLetters>
              )
            ))
          }
        </div>
        {/*letterContainer */}
        <div className='container'>
          <h1 className='py-2 text-[20px]'>
            Tente adivinhar uma letra da palavra:
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className='flex items-center py-2 justify-center gap-2'>
            <Input
              maxLength={1}
              required
              className='py-2 rounded-sm border-2
              border-yellow-300 focus:border-yellow-500
              text-4xl text-black text-center
              outline-none w-[60px]'
              {...register('letter')}
              autoFocus={true}

            />
            <Button name='Jogar' />
          </form>
          <div className='py-2 text-[20px]'>
            Letras já utilizadas:
            {
              wrongLetters.map((letters, i) => (
                <span key={i} className='px-1'>
                  {letters},
                </span>
              ))
            }
          </div>
        </div>
      </BaseDiv>


    </>
  )
}

export default InGame