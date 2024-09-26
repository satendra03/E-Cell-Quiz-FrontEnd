"use client";

import React, { useEffect, useState } from "react";
import { Box, Stack, ImageListItem } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

const Quiz = () => {
  const [quizdata, Setquizdata] = useState("");
  const [question, Setquestion] = useState("");
  const [option1, Setoption1] = useState("");
  const [option2, Setoption2] = useState("");
  const [option3, Setoption3] = useState("");
  const [option4, Setoption4] = useState("");
  const [answer, setAnswer] = useState();
  const [quizdatalength, Setquizdatalength] = useState(0);
  var [count, setCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  var [points, setPoints] = useState(0);

  const [clicked, setClicked] = useState(true);
  const { user, isSignedIn } = useUser();

  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const userEmail = user.primaryEmailAddress.emailAddress;

  useEffect(() => {
    fetch(`${url}/get-questions`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log("API Response:", responseData); // Log the entire response
        const questions = responseData.data;

        // Check if questions is an array
        if (Array.isArray(questions)) {
          Setquizdata(questions);
          Setquizdatalength(questions.length);
        } else {
          // console.error("Expected an array of questions, received:", questions);
          toast.error("Questions Error");
        }
      });
  }, []);

  // changing the count on clicking next button
  const handleNextQuestion = () => {
    console.log("next Question");

    setCount((prev) => prev + 1);
    if (count > quizdatalength) {
      const requestBody = {
        email: userEmail, // change karna hai
        marks: points,
      };

      // console.log(points);
      fetch(`${url}/save-marks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("On saving data", data);
          router.push("/quiz-completed");
        });
    }
  };

  // changing questions on count change
  useEffect(() => {
    // console.log(count)
    if (count >= 0 && count < quizdata.length) {
      Setquestion(quizdata[count].question);
      Setoption1(quizdata[count].option1);
      Setoption2(quizdata[count].option2);
      Setoption3(quizdata[count].option3);
      Setoption4(quizdata[count].option4);
      setAnswer(quizdata[count].answer);
    }
  }, [count, quizdata]);

  // updating points on count change if the previous count question answer was correct
  useEffect(() => {
    if (selectedValue == answer) {
      console.log("Thanks for making choice");
      setPoints((prevPoints) => {
        const newPoints = prevPoints + 10;
        return newPoints;
      });
    }
  }, [count]);

  // setting the value of selected option to a variable to compare it with the correct answer coming from the backend(database)
  const handleOptionClick1 = (option) => {
    setClicked(option.target.dataset.option);
    setSelectedValue("a");
  };
  const handleOptionClick2 = (option) => {
    setClicked(option.target.dataset.option);
    setSelectedValue("b");
  };
  const handleOptionClick3 = (option) => {
    setClicked(option.target.dataset.option);
    setSelectedValue("c");
  };
  const handleOptionClick4 = (option) => {
    setClicked(option.target.dataset.option);
    setSelectedValue("d");
  };

  var data = [
    { op: option1, func: handleOptionClick1 },
    { op: option2, func: handleOptionClick2 },
    { op: option3, func: handleOptionClick3 },
    { op: option4, func: handleOptionClick4 },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack className="rounded-lg flex-col flex gap-5 items-center justify-between lg:shadow-black lg:shadow-lg w-[80vw]">
          <Stack
            width="100%"
            height="10%"
            className="text-background bg-blue-900 flex items-center justify-center rounded-lg"
          >
            <h4 className="scroll-m-20 text-lg lg:text-xl font-semibold tracking-tight text-white text-center py-3 px-2">
              Q{count + 1}. {question}
            </h4>
          </Stack>
          <Stack
            width="100%"
            height="40%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          ></Stack>
          <div className="options grid grid-cols-1 gap-2 lg:gap-10 w-full lg:grid-cols-2 lg:w-[80%]">
            {data?.map((item, idx) => {
              return (
                <div
                  data-option={item.op}
                  key={idx}
                  onClick={item.func}
                  className={`box h-14 lg:h-20 w-full bg-white hover:cursor-pointer rounded-lg hover:scale-[1.05] transition-all active:scale-95 hover:shadow-md hover:shadow-black ${
                    clicked == item.op ? "bg-green-500" : "bg-white"
                  } flex items-center justify-center`}
                >
                  {item.op}
                </div>
              );
            })}
          </div>

          <Button
            disabled={clicked == true}
            className={`${
              clicked != true &&
              "bg-blue-900 hover:bg-blue-950 text-white hover:text-white/90"
            } mb-3`}
            startIcon={<NavigateNextIcon />}
            onClick={handleNextQuestion}
          >
            Next Question
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Quiz;
