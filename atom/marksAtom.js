import { atom } from 'recoil';

// Define the atom for quiz questions
export const marksAtom = atom({
  key: 'marksState', 
  default: 0, 
});
