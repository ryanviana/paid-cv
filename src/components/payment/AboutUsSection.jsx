import React from "react";
import { motion } from "framer-motion";
import Guga from "../../assets/Guga.png";
import Pedro from "../../assets/Pedro.png";
import Ryan from "../../assets/Ryan.png";

const AboutUsSection = () => (
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
        preocupações com o futuro. Hoje, unimos nossa experiência e paixão pela
        educação para criar o DE e ajudar jovens a descobrirem seu caminho de
        forma segura e consistente.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center">
          <img
            src={Guga}
            alt="Guga Sanchez"
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Guga Sanchez</h3>
          <p className="italic text-gray-700 text-center">
            Entrou em Engenharia Mecânica, mas percebeu que seu verdadeiro
            interesse estava em Computação. Teve a coragem de mudar no meio do
            caminho e se apaixonou por tecnologia e inovação. Agora quer mostrar
            a você que “recomeçar” não é fracasso — é oportunidade de encontrar
            o que realmente faz seus olhos brilharem.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center">
          <img
            src={Pedro}
            alt="Pedro Peres"
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Pedro Peres</h3>
          <p className="italic text-gray-700 text-center">
            Está na reta final de Engenharia Aeronáutica, mas decidiu empreender
            em vez de seguir na aviação. Sempre foi movido a desafios e
            percebeu, ao longo do curso, que seu talento estava em criar
            negócios e impactar pessoas.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center">
          <img
            src={Ryan}
            alt="Ryan Tintore"
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ryan Tintore</h3>
          <p className="italic text-gray-700 text-center">
            Começou em Engenharia Elétrica, mas acabou migrando para Computação
            em busca de algo que alinhasse teoria e prática. Percebeu que
            faltavam orientações práticas para quem está no colégio e, por isso,
            juntou forças com o Gustavo e o Pedro para criar um método que vai
            muito além de testes vocacionais.
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
);

export default AboutUsSection;
