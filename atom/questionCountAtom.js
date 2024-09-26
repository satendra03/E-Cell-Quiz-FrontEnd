import { atom } from 'recoil';

// Define the atom for quiz questions
export const questionCount = atom({
  key: 'questionCountsState', 
  default: 0, 
});
