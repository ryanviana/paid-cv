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
    title: "Guia Definitivo de Engenharia de Computação",
    description:
      "Aprenda os segredos para se destacar em Engenharia de Computação com este guia completo.",
    cover: CAPA_ENGENHARIA_DE_COMPUTACAO,
    pdf: GD_ENGENHARIA_DE_COMPUTACAO,
    price: 5.9,
  },
  "Ciência da Computação": {
    title: "Guia Definitivo de Ciência da Computação",
    description:
      "Descubra estratégias e dicas essenciais para se destacar no mercado de Ciência da Computação.",
    cover: CAPA_CIENCIA_DA_COMPUTACAO,
    pdf: GD_CIENCIA_DA_COMPUITACAO,
    price: 5.9,
  },
  "Ciência de Dados": {
    title: "Guia Definitivo de Ciência de Dados",
    description:
      "Transforme dados em insights valiosos com este guia completo.",
    cover: CAPA_CIENCIAS_DE_DADOS,
    pdf: GD_CIENCIA_DE_DADOS,
    price: 5.9,
  },
  "Sistemas de Informação": {
    title: "Guia Definitivo de Sistemas de Informação",
    description:
      "Tudo que você precisa saber para dominar Sistemas de Informação.",
    cover: CAPA_SISTEMAS_DE_INFORMACAO,
    pdf: GD_SISTEMAS_DE_INFORMACAO,
    price: 5.9,
  },
  "Análise de Desenvolvimento de Sistemas": {
    title: "Guia Definitivo de Análise de Desenvolvimento de Sistemas",
    description: "Dicas e estratégias para se destacar no mercado de ADS.",
    cover: CAPA_ADS,
    pdf: GD_ADS,
    price: 5.9,
  },
  "Engenharia Elétrica": {
    title: "Guia Definitivo de Engenharia Elétrica",
    description:
      "Conheça as melhores práticas e inovações em Engenharia Elétrica.",
    cover: CAPA_ENGENHARIA_ELETRICA,
    pdf: GD_ENGENHARIA_ELETRICA,
    price: 5.9,
  },
  "Engenharia Mecatrônica": {
    title: "Guia Definitivo de Engenharia Mecatrônica",
    description:
      "Descubra como integrar mecânica, eletrônica e computação para impulsionar sua carreira.",
    cover: CAPA_ENGENHARIA_MECATRONICA,
    pdf: GD_MECATRONICA,
    price: 5.9,
  },
  "Engenharia Mecânica": {
    title: "Guia Definitivo de Engenharia Mecânica",
    description:
      "Aprenda os fundamentos e técnicas avançadas da Engenharia Mecânica.",
    cover: CAPA_ENGENHARIA_MECANICA,
    pdf: GD_ENGENHARIA_MECANICA,
    price: 5.9,
  },
  "Engenharia Aeronáutica": {
    title: "Guia Definitivo de Engenharia Aeronáutica",
    description:
      "Domine o design e a manutenção de aeronaves com este guia completo.",
    cover: CAPA_ENGENHARIA_AERONAUTICA,
    pdf: GD_ENGENHARIA_AERONAUTICA,
    price: 5.9,
  },
  "Licenciatura em Matemática": {
    title: "Guia Definitivo de Licenciatura em Matemática",
    description:
      "Tudo que você precisa para transformar seu ensino de Matemática.",
    cover: CAPA_MATEMATICA,
    pdf: GD_MATEMATICA,
    price: 5.9,
  },
  "Licenciatura em Física": {
    title: "Guia Definitivo de Licenciatura em Física",
    description:
      "Domine os conceitos e estratégias para um ensino eficaz de Física.",
    cover: CAPA_FISICA,
    pdf: GD_FISICA,
    price: 5.9,
  },
  "Licenciatura em Química": {
    title: "Guia Definitivo de Licenciatura em Química",
    description:
      "Aprenda as melhores técnicas para ensinar Química de forma envolvente.",
    cover: CAPA_QUIMICA,
    pdf: GD_QUIMICA,
    price: 5.9,
  },
  "Engenharia de Produção": {
    title: "Guia Definitivo de Engenharia de Produção",
    description:
      "Otimize processos e aumente a eficiência com as melhores práticas em Engenharia de Produção.",
    cover: CAPA_ENGENHARIA_DE_PRODUCAO,
    pdf: GD_ENGENHARIA_DE_PRODUCAO,
    price: 5.9,
  },
  "Engenharia Civil": {
    title: "Guia Definitivo de Engenharia Civil",
    description:
      "Descubra os segredos para projetar e construir obras com excelência.",
    cover: CAPA_ENGENHARIA_CIVIL,
    pdf: GD_ENGENHARIA_CIVIL,
    price: 5.9,
  },
  "Engenharia Ambiental": {
    title: "Guia Definitivo de Engenharia Ambiental",
    description:
      "Aprenda a desenvolver soluções sustentáveis e inovadoras para o meio ambiente.",
    cover: CAPA_ENGENHARIA_AMBIENTAL,
    pdf: GD_ENGENHARIA_AMBIENTAL,
    price: 5.9,
  },
};

export default ebookMapping;
