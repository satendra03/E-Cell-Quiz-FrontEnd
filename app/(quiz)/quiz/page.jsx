"use client"

import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Stack, ImageListItem } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Quiz = () => {

  const [quizdata, Setquizdata] = useState('');
  const [question, Setquestion] = useState('');
  const [option1, Setoption1] = useState('');
  const [option2, Setoption2] = useState('');
  const [option3, Setoption3] = useState('');
  const [option4, Setoption4] = useState('');
  const [answer, setAnswer] = useState();
  const [quizdatalength, Setquizdatalength] = useState(0);
  var [count, setCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');
  var [points, setPoints] = useState(0);

  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    fetch(`${url}/get-questions`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then((responseData) => {
        console.log('API Response:', responseData); // Log the entire response
        const questions = responseData.data;

        // Check if questions is an array
        if (Array.isArray(questions)) {
          Setquizdata(questions)
          Setquizdatalength(questions.length)
        } else {
          console.error("Expected an array of questions, received:", questions);
        }
        // setIsLoading(false);
      })
  }, [])

  // changing the count on clicking next button
  const handleNextQuestion = () => {
    setCount(count++);
    if (count > quizdatalength) {

      const requestBody = {
        email: "developerakshatsingh@gmail.com",
        marks: points
      }

      console.log(points)
      fetch(`${url}/save-marks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          router.push("/quiz-completed")
        })

    }
  }

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
      console.log("Correct Answer!");
      setPoints((prevPoints) => {
        const newPoints = prevPoints + 10;
        return newPoints;
      });
    } else {
      console.log("Wrong Answer!")
    }
  }, [count])

  // setting the value of selected option to a variable to compare it with the correct answer coming from the backend(database)
  const handleOptionClick1 = () => {
    setSelectedValue("a");
  }
  const handleOptionClick2 = () => {
    setSelectedValue("b");
  }
  const handleOptionClick3 = () => {
    setSelectedValue("c");
  }
  const handleOptionClick4 = () => {
    setSelectedValue("d");
  }
  return (
    // <Button variant="contained" color='warning' >Time = {" "}<div id='timer-display'></div></Button>
    <>
      <Box sx={{ width: "100vw", height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }} >
        <Stack width="90vw" height="auto" direction='column' alignItems="center" justifyContent="space-between" sx={{ boxShadow: "2px 2px 12px black", borderRadius: "8px", borderRadiua: '4px', gap: "20px" }} >
          <Stack width="100%" height="10%" direction="row" alignItems="center" justifyContent="space-between" sx={{ backgroundColor: "rgb(0, 115, 192)", borderRadius: "8px 8px 0px 0px" }} >
            <Typography variant="h6" color="white" sx={{ padding: "20px 10px 20px 20px", textAlign: "center" }} >Q{count + 1}. {question}</Typography>
          </Stack>
          <Stack width="100%" height='40%' direction="row" alignItems="center" justifyContent="flex-start">
          </Stack>
          {/* <Stack direction="column" alignItems="start" justifyContent="space-evenly" width="99%" height="40%" sx={{ backgroundColor: "", marginLeft: "20px", gap: "20px" }} >
            <Button variant="contained" color="primary" sx={{ width: "300px" }} onClick={handleOptionClick1} >{option1}</Button>
            <Button variant="contained" color="primary" sx={{ width: "300px" }} onClick={handleOptionClick2} >{option2}</Button>
            <Button variant="contained" color="primary" sx={{ width: "300px" }} onClick={handleOptionClick3} >{option3}</Button>
            <Button variant="contained" color="primary" sx={{ width: "300px" }} onClick={handleOptionClick4} >{option4}</Button>
          </Stack> */}
          <div className='options grid grid-cols-1 gap-3 w-full lg:grid-cols-2 lg:w-[80%]'>
            <Button className="box border h-20 w-full bg-white">{option1}</Button>
            <Button className="box border h-20 w-full bg-white">{option2}</Button>
            <Button className="box border h-20 w-full bg-white">{option3}</Button>
            <Button className="box border h-20 w-full bg-white">{option3}</Button>
          </div>
          <Stack direction="row" width="98%" height="10%" alignItems="center" justifyContent="flex-end" sx={{ marginRight: "20px", backgroundColor: "whitesmoke", marginBottom: "20px" }} >
            <Button variant="contained" color="success" startIcon={<NavigateNextIcon />} onClick={handleNextQuestion} >Next Question</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default Quiz;

