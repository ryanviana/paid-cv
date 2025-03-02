// src/pages/Questions.jsx
import { useState, useEffect, useContext } from "react";
import ProgressBar from "../components/ProgressBar";
import ImageQuestion from "../components/ImageQuestion";
import SelectQuestion from "../components/SelectQuestion";
import Result from "./Result";
import ExplicacaoImagem from "./ExplicacaoImagem";
import ExplicacaoSelect from "./ExplicacaoSelect";
import { usePersistedState } from "../hooks/usePersistedState";

// defines das áreas
import * as Defines from "../data/Defines";

// enunciados das perguntas
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

// pesos de cada item das perguntas
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

// Import the ResultContext to store the final score when finished
import { ResultContext } from "../context/ResultContext";

function Questions() {
  // Total number of actual questions (for progress bar)
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

  // Define our pages (paginas). Order is important.
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
    <Result
      key="res1"
      pontuacaoTotal={pontuacaoTotal}
      type="parcial"
      updatePagina={updatePagina}
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
    <Result
      key="res2"
      pontuacaoTotal={pontuacaoTotal}
      type="total"
      updatePagina={updatePagina}
    />,
  ];

  // questionIndexes: pages that count as actual questions (for progress bar)
  const questionIndexes = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12];

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
    updatePagina(dir);
  }

  // Compute current progress (only count pages listed in questionIndexes)
  const currentProgress = questionIndexes.filter(
    (index) => index <= perguntaAtual
  ).length;

  // Use ResultContext to store the final result when the test is finished.
  const { setResult } = useContext(ResultContext);
  useEffect(() => {
    // If we are on the final page (last page in the paginas array), update the context.
    if (perguntaAtual === paginas.length - 1) {
      setResult(pontuacaoTotal);
    }
  }, [perguntaAtual, pontuacaoTotal, setResult, paginas.length]);

  return (
    <div className="flex flex-col w-full h-full items-center text-center">
      {/* PROGRESS BAR */}
      <ProgressBar
        currentQuestion={currentProgress}
        totalQuestions={totalQuestions}
      />
      {/* DISPLAY THE CURRENT PAGE */}
      {paginas[perguntaAtual]}
    </div>
  );
}

export default Questions;
