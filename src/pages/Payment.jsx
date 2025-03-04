// src/pages/Payment.jsx
import React from "react";
import { motion } from "framer-motion";
import Grafico from "../assets/grafico.png";
import Bernal from "../assets/Bernal.png";
import Beluce from "../assets/beluce.png";
import Ryan from "../assets/Ryan.png";
import Guga from "../assets/Guga.png";
import Pedro from "../assets/Pedro.png";
import CheckoutForm from "../components/CheckoutForm";

function Payment() {
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Original "anchor" prices
  const originalPrice = 38.9;
  const discountedPrice = 9.9;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HERO SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariant}
        transition={{ duration: 0.8 }}
        className="bg-blue-600 text-white py-20 px-4 text-center"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:space-x-10">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              PARABÉNS, VOCÊ CONCLUIU O TESTE!
            </h1>
            <p className="text-lg md:text-xl">
              Você respondeu 10 perguntas e está a um passo de descobrir um
              mapeamento completo das suas aptidões e interesses.
            </p>
            <button
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
              className="mt-6 bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              Ver Oferta
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src={Grafico}
              alt="Career Test"
              className="rounded-lg shadow-lg w-full max-w-md blur-sm"
            />
          </div>
        </div>
      </motion.section>

      {/* OFFER SECTION: Left info & CheckoutForm (right column) */}
      <motion.section
        id="payment-offer"
        initial="hidden"
        animate="visible"
        variants={sectionVariant}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-16 px-4 bg-gray-50 text-center"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          {/* LEFT COLUMN: Offer Info & Coupon Notice */}
          <div className="flex-1 flex flex-col justify-center space-y-6 text-left py-6 pr-8">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              🔓 Desbloqueie Seu Resultado Agora
            </h2>
            <div className="inline-block bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-md">
              OFERTA EXCLUSIVA, SÓ ESSA SEMANA!
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Aproveite antes que acabe!
              </p>
              <div className="flex items-baseline mt-2 space-x-3">
                <span className="text-lg line-through text-red-500 font-bold">
                  R$ {originalPrice.toFixed(2)}
                </span>
                <span className="text-5xl font-extrabold text-green-600">
                  R$ {discountedPrice.toFixed(2)}
                </span>
              </div>
              <p className="mt-4 text-lg text-gray-700">
                Use o cupom <strong>CALCULO9</strong> para pagar apenas R$9,90!
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: CheckoutForm (unchanged) */}
          <div className="md:w-1/2 bg-white rounded-lg p-6 shadow space-y-6 text-center md:text-left">
            <CheckoutForm />
          </div>
        </div>
      </motion.section>

      {/* TESTIMONIALS SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariant}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="py-16 px-4 bg-blue-50 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">
            O que os outros dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <img
                src={Bernal}
                alt="João"
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="font-bold text-gray-900 mb-2">João</h3>
              <p className="italic text-gray-700 text-center">
                Sempre quis trabalhar com carros e curtia computação, mas não
                sabia como conciliar isso. Achava que minhas dificuldades em
                matemática me atrapalhariam. Quando estava prestes a desistir, o
                Decisão Exata me mostrou o caminho.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <img
                src={Beluce}
                alt="Beluce"
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="font-bold text-gray-900 mb-2">Beluce</h3>
              <p className="italic text-gray-700 text-center">
                Sempre gostei de Fórmula 1 e pensei: “Óbvio, vou fazer
                Engenharia Mecânica.” Mas, quando comecei, percebi que minha
                verdadeira afinidade era com Engenharia de Produção. Só que para
                entender isso precisei voltar ao cursinho.
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              document.getElementById("payment-offer").scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-20 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-200"
          >
            Quero Meu Acesso
          </button>
        </div>
      </motion.section>

      {/* ABOUT US SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="py-16 px-4 bg-white text-center"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Quem está por trás do Decisão Exata?
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Somos três universitários da USP (e empreendedores) que começaram
            exatamente como você: cheios de dúvidas sobre qual curso escolher e
            preocupações com o futuro. Hoje, unimos nossa experiência e paixão
            pela educação para criar o DE e ajudar jovens a descobrirem seu
            caminho de forma segura e consistente.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center">
              <img
                src={Guga}
                alt="Guga Sanchez"
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Guga Sanchez
              </h3>
              <p className="italic text-gray-700 text-center">
                Entrou em Engenharia Mecânica, mas percebeu que seu verdadeiro
                interesse estava em Computação. Teve a coragem de mudar no meio
                do caminho e se apaixonou por tecnologia e inovação. Agora quer
                mostrar a você que “recomeçar” não é fracasso — é oportunidade
                de encontrar o que realmente faz seus olhos brilharem.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center">
              <img
                src={Pedro}
                alt="Pedro Peres"
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Pedro Peres
              </h3>
              <p className="italic text-gray-700 text-center">
                Está na reta final de Engenharia Aeronáutica, mas decidiu
                empreender em vez de seguir na aviação. Sempre foi movido a
                desafios e percebeu, ao longo do curso, que seu talento estava
                em criar negócios e impactar pessoas.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center">
              <img
                src={Ryan}
                alt="Ryan Tintore"
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Ryan Tintore
              </h3>
              <p className="italic text-gray-700 text-center">
                Começou em Engenharia Elétrica, mas acabou migrando para
                Computação em busca de algo que alinhasse teoria e prática.
                Percebeu que faltavam orientações práticas para quem está no
                colégio e, por isso, juntou forças com o Gustavo e o Pedro para
                criar um método que vai muito além de testes vocacionais.
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              document.getElementById("payment-offer").scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-20 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-200"
          >
            Quero Meu Acesso
          </button>
        </div>
      </motion.section>

      {/* FOOTER SECTION */}
      <motion.footer
        className="w-full bg-gray-900 text-gray-200 py-8 px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariant}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Entre em Contato</h3>
          <p className="mb-2">
            <strong>Email:</strong> ryan@decisaoexata.com
          </p>
          <p className="mb-2">
            <strong>Telefone:</strong> +55 35 99145-9394
          </p>
          <p className="mb-4">
            <strong>Site:</strong>{" "}
            <a
              href="https://decisaoexata.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline"
            >
              decisaoexata.com
            </a>
          </p>
          <div>
            <a
              href="https://wa.me/5535991459394?text=Oi%2C%20preciso%20de%20ajuda%20para%20decidir%20meu%20curso!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Fale Conosco no WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm">
            © {new Date().getFullYear()} Decisão Exata. Todos os direitos
            reservados.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default Payment;
