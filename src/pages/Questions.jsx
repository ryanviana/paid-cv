// src/pages/Questions.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import ImageQuestion from "../components/ImageQuestion";
import SelectQuestion from "../components/SelectQuestion";
import ExplicacaoImagem from "./ExplicacaoImagem";
import ExplicacaoSelect from "./ExplicacaoSelect";
import { usePersistedState } from "../hooks/usePersistedState";
import * as Defines from "../data/Defines";
import {
  statement_question_1,
  statement_question_2,
  statement_question_3,
  statement_question_4,
  statement_question_5,
  statement_question_6,
  statement_question_7,
  statement_question_8,
  statement_question_9,
  statement_question_10,
} from "../data/QuestionsStatements";
import {
  weight_question_1,
  weight_question_2,
  weight_question_3,
  weight_question_4,
  weight_question_5,
  weight_question_6,
  weight_question_7,
  weight_question_8,
  weight_question_9,
  weight_question_10,
} from "../data/QuestionsWeight";
import { ResultContext } from "../context/ResultContext";

function Questions() {
  const navigate = useNavigate();
  const totalQuestions = 10;

  // pontuacaoTotal: current accumulated score (one number per area)
  const [pontuacaoTotal, setPontuacaoTotal] = usePersistedState(
    "questions_pontuacaoTotal",
    Array(Defines.numAreas).fill(0)
  );

  // perguntaAtual: index of the current page in the "paginas" array
  const [perguntaAtual, setPerguntaAtual] = usePersistedState(
    "questions_perguntaAtual",
    0
  );

  // Use the ResultContext to store the final result
  const { setResult } = useContext(ResultContext);

  // Define our pages (paginas). Order is important.
  // Notice that we removed the embedded <Result /> pages.
  const paginas = [
    <ExplicacaoImagem key="ex1" updatePagina={updatePagina} />,
    <ImageQuestion
      key="q1"
      questionId="q1"
      weight_question={weight_question_1}
      statement_question={statement_question_1}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
    <ImageQuestion
      key="q2"
      questionId="q2"
      weight_question={weight_question_2}
      statement_question={statement_question_2}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
    <ImageQuestion
      key="q3"
      questionId="q3"
      weight_question={weight_question_3}
      statement_question={statement_question_3}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
    <ImageQuestion
      key="q4"
      questionId="q4"
      weight_question={weight_question_4}
      statement_question={statement_question_4}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
    <ExplicacaoSelect key="ex2" updatePagina={updatePagina} />,
    <SelectQuestion
      key="q5"
      questionId="q5"
      weight_question={weight_question_5}
      statement_question={statement_question_5}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
    <SelectQuestion
      key="q6"
      questionId="q6"
      weight_question={weight_question_6}
      statement_question={statement_question_6}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
    <SelectQuestion
      key="q7"
      questionId="q7"
      weight_question={weight_question_7}
      statement_question={statement_question_7}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
    <SelectQuestion
      key="q8"
      questionId="q8"
      weight_question={weight_question_8}
      statement_question={statement_question_8}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
    <SelectQuestion
      key="q9"
      questionId="q9"
      weight_question={weight_question_9}
      statement_question={statement_question_9}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
    <SelectQuestion
      key="q10"
      questionId="q10"
      weight_question={weight_question_10}
      statement_question={statement_question_10}
      updatePerguntaAtual={updatePerguntaAtual}
    />,
  ];

  // questionIndexes: pages that count as actual questions (for progress bar)
  const questionIndexes = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11];

  // Now that we know how many pages there are, initialize pontuacaoQuestao.
  const [pontuacaoQuestao, setPontuacaoQuestao] = usePersistedState(
    "questions_pontuacaoQuestao",
    Array(paginas.length).fill(Array(Defines.numAreas).fill(0))
  );

  // Function to update the accumulated score based on the current question’s score.
  function updatePontuacao(pontuacao) {
    // Compute the difference from what was already stored for this question.
    let updatedPontuacaoQuestaoAtual = [...pontuacaoQuestao[perguntaAtual]];
    updatedPontuacaoQuestaoAtual = updatedPontuacaoQuestaoAtual.map(
      (x, i) => pontuacao[i] - x
    );

    // Add the difference to the accumulated score.
    let updatedPontuacao = [...pontuacaoTotal];
    updatedPontuacao = updatedPontuacao.map(
      (x, i) => x + updatedPontuacaoQuestaoAtual[i]
    );
    setPontuacaoTotal(updatedPontuacao);

    // Update the stored score for the current question.
    let updatedPontuacaoQuestao = [...pontuacaoQuestao];
    updatedPontuacaoQuestao[perguntaAtual] = pontuacao;
    setPontuacaoQuestao(updatedPontuacaoQuestao);
  }

  // Function to update the current page.
  function updatePagina(dir) {
    setPerguntaAtual((prev) =>
      Math.max(0, Math.min(prev + dir, paginas.length - 1))
    );
  }

  // Function to update the current question's score and then change page.
  function updatePerguntaAtual(pontuacao, dir) {
    if (dir === 1) {
      updatePontuacao(pontuacao);
    }
    // When finishing question 4 (page index 4) and moving forward,
    // store the partial result in context and navigate to the preview route.
    if (perguntaAtual === 4 && dir === 1) {
      setResult(pontuacaoTotal);
      navigate("/results/preview");
      return;
    }
    // When finishing question 10 (last page, index 11) and moving forward,
    // store the final result in context and navigate to the final results route.
    if (perguntaAtual === paginas.length - 1 && dir === 1) {
      setResult(pontuacaoTotal);
      // Send completedTest event to dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "completedTest" });

      // Optionally, send to Facebook Pixel if available
      if (window.fbq) {
        window.fbq("trackCustom", "completedTest", {
          conversionKey: "completedTest",
        });
      }
      navigate("/payment");
      return;
    }
    updatePagina(dir);
  }

  // Also update final result when on the final page.
  useEffect(() => {
    if (perguntaAtual === paginas.length - 1) {
      setResult(pontuacaoTotal);
    }
  }, [perguntaAtual, pontuacaoTotal, setResult, paginas.length]);

  const currentProgress = questionIndexes.filter(
    (index) => index <= perguntaAtual
  ).length;

  return (
    <div className="flex flex-col w-full h-full items-center text-center">
      <ProgressBar
        currentQuestion={currentProgress}
        totalQuestions={totalQuestions}
      />
      {paginas[perguntaAtual]}
    </div>
  );
}

export default Questions;
