"use client";

import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import { quizQuestionState } from "@/atom/quizQuestionsAtom";

export default function LoadQuizQuestion() {
  const [isLoading, setIsLoading] = useState(true);
  const setQuizQuestions = useSetRecoilState(quizQuestionState);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    fetch(`${url}/get-questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("API Response:", responseData); // Log the entire response
        const questions = responseData.data;

        // Check if questions is an array
        if (Array.isArray(questions)) {
          // setQuizQuestions(questions);
          setQuizQuestions([
            { data: "this is the data hardcoded in the atom" },
          ]);
        } else {
          console.error("Expected an array of questions, received:", questions);
        }
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <p>Ready for the Quiz</p>
        {isLoading ? (
          <div> Fetching Questions from the Database </div>
        ) : (
          <div>
            <button>Start Quiz</button>
          </div>
        )}
      </div>
    </>
  );
}
