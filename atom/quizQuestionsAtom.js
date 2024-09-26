"use client"

import { atom, selector } from 'recoil';



// Define an atom to hold an empty array
export const quizQuestionState = atom({
  key: 'quizQuestionAtom', 
  default: [], 
});
