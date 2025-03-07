// src/mappings/ebookMapping.js

import CAPA_ENGENHARIA_DE_COMPUTACAO from "../assets/ebooks_gd/CAPA_ENGENHARIA_DE_COMPUTACAO.png";
import GD_ENGENHARIA_DE_COMPUTACAO from "../assets/ebooks_gd/GD_ENGENHARIA_DE_COMPUTACAO.pdf";

import CAPA_CIENCIA_DA_COMPUTACAO from "../assets/ebooks_gd/CAPA_CIENCIA_DA_COMPUTACAO.png";
import GD_CIENCIA_DA_COMPUITACAO from "../assets/ebooks_gd/GD_CIENCIA_DA_COMPUITACAO.pdf";

import CAPA_CIENCIAS_DE_DADOS from "../assets/ebooks_gd/CAPA_CIENCIAS_DE_DADOS.png";
import GD_CIENCIA_DE_DADOS from "../assets/ebooks_gd/GD_CIENCIA_DE_DADOS.pdf";

import CAPA_SISTEMAS_DE_INFORMACAO from "../assets/ebooks_gd/CAPA_SISTEMAS_DE_INFORMACAO.png";
import GD_SISTEMAS_DE_INFORMACAO from "../assets/ebooks_gd/GD_SISTEMAS_DE_INFORMACAO.pdf";

import CAPA_ADS from "../assets/ebooks_gd/CAPA_1.png"; // for ADS (Análise de Desenvolvimento de Sistemas)
import GD_ADS from "../assets/ebooks_gd/GD_ADS.pdf";

import CAPA_ENGENHARIA_ELETRICA from "../assets/ebooks_gd/CAPA_ENGENHARIA_ELETRICA.png";
import GD_ENGENHARIA_ELETRICA from "../assets/ebooks_gd/GD_ENGENHARIA_ELETRICA.pdf";

import CAPA_ENGENHARIA_MECATRONICA from "../assets/ebooks_gd/CAPA_ENGENHARIA_MECATRONICA.png";
import GD_MECATRONICA from "../assets/ebooks_gd/GD_MECATRONICA.pdf";

import CAPA_ENGENHARIA_MECANICA from "../assets/ebooks_gd/CAPA_ENGENHARIA_MECANICA.png";
import GD_ENGENHARIA_MECANICA from "../assets/ebooks_gd/GD_ENGENHARIA_MECANICA.pdf";

import CAPA_ENGENHARIA_AERONAUTICA from "../assets/ebooks_gd/CAPA_ENGENHARIA_AERONAUTICA.png";
import GD_ENGENHARIA_AERONAUTICA from "../assets/ebooks_gd/GD_ENGENHARIA_AERONAUTICA.pdf";

import CAPA_MATEMATICA from "../assets/ebooks_gd/CAPA_MATEMATICA.png";
import GD_MATEMATICA from "../assets/ebooks_gd/GD_MATEMATICA.pdf";

import CAPA_FISICA from "../assets/ebooks_gd/CAPA_FISICA.png";
import GD_FISICA from "../assets/ebooks_gd/GD_FISICA.pdf";

import CAPA_QUIMICA from "../assets/ebooks_gd/CAPA_QUIMICA.png";
import GD_QUIMICA from "../assets/ebooks_gd/GD_QUIMICA.pdf";

import CAPA_ENGENHARIA_DE_PRODUCAO from "../assets/ebooks_gd/CAPA_ENGENHARIA_DE_PRODUCAO.png";
import GD_ENGENHARIA_DE_PRODUCAO from "../assets/ebooks_gd/GD_ENGENHARIA_DE_PRODUCAO.pdf";

import CAPA_ENGENHARIA_CIVIL from "../assets/ebooks_gd/CAPA_ENGENHARIA_CIVIL.png";
import GD_ENGENHARIA_CIVIL from "../assets/ebooks_gd/GD_ENGENHARIA_CIVIL.pdf";

import CAPA_ENGENHARIA_AMBIENTAL from "../assets/ebooks_gd/CAPA_ENGENHARIA_AMBIENTAL.png";
import GD_ENGENHARIA_AMBIENTAL from "../assets/ebooks_gd/GD_ENGENHARIA_AMBIENTAL.pdf";

const ebookMapping = {
  "Engenharia de Computação": {
    title: "GUIA DEFINITIVO: Engenharia de Computação",
    description:
      "Entenda tudo sobre Engenharia de Computação antes de decidir sua carreira. Saiba se esse curso é realmente para você!",
    cover: CAPA_ENGENHARIA_DE_COMPUTACAO,
    pdf: GD_ENGENHARIA_DE_COMPUTACAO,
    price: 5.9,
  },
  "Ciência da Computação": {
    title: "GUIA DEFINITIVO: Ciência da Computação",
    description:
      "Descubra exatamente o que você estudará em Ciência da Computação e veja se essa área combina com você.",
    cover: CAPA_CIENCIA_DA_COMPUTACAO,
    pdf: GD_CIENCIA_DA_COMPUITACAO,
    price: 5.9,
  },
  "Ciência de Dados": {
    title: "GUIA DEFINITIVO: Ciência de Dados",
    description:
      "Veja claramente como funciona o curso de Ciência de Dados e decida com segurança se é a carreira certa para você.",
    cover: CAPA_CIENCIAS_DE_DADOS,
    pdf: GD_CIENCIA_DE_DADOS,
    price: 5.9,
  },
  "Sistemas de Informação": {
    title: "GUIA DEFINITIVO: Sistemas de Informação",
    description:
      "Entenda exatamente o que você vai estudar em Sistemas de Informação antes de tomar sua decisão.",
    cover: CAPA_SISTEMAS_DE_INFORMACAO,
    pdf: GD_SISTEMAS_DE_INFORMACAO,
    price: 5.9,
  },
  "Análise de Desenvolvimento de Sistemas": {
    title: "GUIA DEFINITIVO: Análise e Desenvolvimento de Sistemas",
    description:
      "Tenha certeza absoluta se o curso de ADS é a escolha certa para você. Conheça todos os detalhes importantes aqui!",
    cover: CAPA_ADS,
    pdf: GD_ADS,
    price: 5.9,
  },
  "Engenharia Elétrica": {
    title: "GUIA DEFINITIVO: Engenharia Elétrica",
    description:
      "Saiba exatamente o que esperar do curso de Engenharia Elétrica antes de tomar sua decisão final.",
    cover: CAPA_ENGENHARIA_ELETRICA,
    pdf: GD_ENGENHARIA_ELETRICA,
    price: 5.9,
  },
  "Engenharia Mecatrônica": {
    title: "GUIA DEFINITIVO: Engenharia Mecatrônica",
    description:
      "Entenda o curso de Engenharia Mecatrônica por completo antes de se comprometer com essa carreira interdisciplinar.",
    cover: CAPA_ENGENHARIA_MECATRONICA,
    pdf: GD_MECATRONICA,
    price: 5.9,
  },
  "Engenharia Mecânica": {
    title: "GUIA DEFINITIVO: Engenharia Mecânica",
    description:
      "Confira tudo que você precisa saber sobre Engenharia Mecânica e descubra se este curso combina com você.",
    cover: CAPA_ENGENHARIA_MECANICA,
    pdf: GD_ENGENHARIA_MECANICA,
    price: 5.9,
  },
  "Engenharia Aeronáutica": {
    title: "GUIA DEFINITIVO: Engenharia Aeronáutica",
    description:
      "Descubra como é estudar Engenharia Aeronáutica antes de se decidir pela carreira dos seus sonhos.",
    cover: CAPA_ENGENHARIA_AERONAUTICA,
    pdf: GD_ENGENHARIA_AERONAUTICA,
    price: 5.9,
  },
  "Licenciatura em Matemática": {
    title: "Guia Definitivo da Licenciatura em Matemática",
    description:
      "Saiba se Licenciatura em Matemática é a escolha certa para você com este guia claro e objetivo.",
    cover: CAPA_MATEMATICA,
    pdf: GD_MATEMATICA,
    price: 5.9,
  },
  "Licenciatura em Física": {
    title: "Guia Definitivo da Licenciatura em Física",
    description:
      "Entenda exatamente o que é estudado em Licenciatura em Física e decida com segurança sua carreira.",
    cover: CAPA_FISICA,
    pdf: GD_FISICA,
    price: 5.9,
  },
  "Licenciatura em Química": {
    title: "Guia Definitivo da Licenciatura em Química",
    description:
      "Descubra se a Licenciatura em Química realmente combina com você antes de começar o curso.",
    cover: CAPA_QUIMICA,
    pdf: GD_QUIMICA,
    price: 5.9,
  },
  "Engenharia de Produção": {
    title: "GUIA DEFINITIVO: Engenharia de Produção",
    description:
      "Conheça a fundo o curso de Engenharia de Produção e saiba se esta carreira é ideal para você.",
    cover: CAPA_ENGENHARIA_DE_PRODUCAO,
    pdf: GD_ENGENHARIA_DE_PRODUCAO,
    price: 5.9,
  },
  "Engenharia Civil": {
    title: "GUIA DEFINITIVO: Engenharia Civil",
    description:
      "Entenda claramente como é o curso de Engenharia Civil antes de decidir seu futuro profissional.",
    cover: CAPA_ENGENHARIA_CIVIL,
    pdf: GD_ENGENHARIA_CIVIL,
    price: 5.9,
  },
  "Engenharia Ambiental": {
    title: "GUIA DEFINITIVO: Engenharia Ambiental",
    description:
      "Tenha certeza se Engenharia Ambiental é para você com este guia completo e objetivo sobre o curso.",
    cover: CAPA_ENGENHARIA_AMBIENTAL,
    pdf: GD_ENGENHARIA_AMBIENTAL,
    price: 5.9,
  },
};

export default ebookMapping;
