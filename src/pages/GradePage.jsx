import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, VStack, Text, Button, Box, Heading } from "@chakra-ui/react";

const emojis = ["😡", "😕", "😐", "😊", "😍"];

const GradePage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [grade, setGrade] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    const response = await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/questions?id=eq.${id}`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    });
    const data = await response.json();
    setQuestion(data[0]);
  };

  const submitGrade = async (selectedGrade) => {
    const response = await fetch('https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/grades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ question_id: id, grade: selectedGrade })
    });

    if (response.ok) {
      setGrade(selectedGrade);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        {question && (
          <>
            <Heading>{question.question_text}</Heading>
            <Box>
              {emojis.map((emoji, index) => (
                <Button
                  key={index}
                  onClick={() => submitGrade(index + 1)}
                  colorScheme={grade === index + 1 ? "teal" : "gray"}
                  size="lg"
                  m={1}
                >
                  {emoji}
                </Button>
              ))}
            </Box>
            {grade && <Text mt={4}>You rated this question: {emojis[grade - 1]}</Text>}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default GradePage;