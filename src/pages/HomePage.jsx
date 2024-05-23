import React, { useState, useEffect } from 'react';
import { Container, VStack, Text, Button, Box, Input, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await fetch('https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/questions', {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    });
    const data = await response.json();
    setQuestions(data);
  };

  const addQuestion = async () => {
    if (newQuestion.trim() === "") return;

    const response = await fetch('https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ question_text: newQuestion })
    });

    if (response.ok) {
      fetchQuestions();
      setNewQuestion("");
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading>Tropical Screening App</Heading>
        <Box width="100%">
          <Input
            placeholder="Enter a new question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Button mt={2} colorScheme="teal" onClick={addQuestion}>Add Question</Button>
        </Box>
        <VStack spacing={4} width="100%">
          {questions.map((question) => (
            <Box key={question.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text>{question.question_text}</Text>
              <Link to={`/grade/${question.id}`}>
                <Button mt={2} colorScheme="teal">Grade</Button>
              </Link>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default HomePage;