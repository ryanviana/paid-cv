import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

function LeadCaptureForm({ showLeadCapture, onSubmit }) {
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [vocationalHelp, setVocationalHelp] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [revealError, setRevealError] = useState(false);

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = loadVideoPlayer;
    } else {
      loadVideoPlayer();
    }
  }, []);

  const loadVideoPlayer = () => {
    if (videoRef.current) {
      playerRef.current = new window.YT.Player(videoRef.current, {
        height: "315",
        width: "560",
        videoId: "ski9FF5eWAo", // Replace with your YouTube video ID
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 0,
          modestbranding: 1,
          rel: 0,
          mute: 0,
          fs: 0,
        },
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    }
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      setVideoEnded(true);
    }
  };

  const handleHelpChoice = (choice) => {
    setVocationalHelp({ value: choice, label: choice });
    setRevealError(false); // clear error once an option is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    // Check required fields.
    if (!name || !cellphone) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
    if (!vocationalHelp) {
      setErrorMessage(
        "Por favor, selecione uma opção de orientação vocacional."
      );
      setRevealError(true);
      return;
    }
    try {
      const phoneNumber = phoneUtil.parse(cellphone, "BR");
      if (!phoneUtil.isValidNumber(phoneNumber)) {
        setErrorMessage(
          "Número de celular inválido. Verifique o formato e tente novamente."
        );
        return;
      }
    } catch (error) {
      setErrorMessage(
        "Número de celular inválido. Verifique o formato e tente novamente."
      );
      return;
    }
    onSubmit({ name, cellphone, vocationalHelp: vocationalHelp.value });
  };

  if (!showLeadCapture) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-extrabold mb-4 text-center text-jornadas-blue">
          Desbloqueie Seus Resultados
        </h2>
        <p className="mb-6 text-center text-gray-700">
          Assista ao vídeo abaixo antes de prosseguir.
        </p>

        {/* Video Embed */}
        <div className="mb-6">
          <div
            ref={videoRef}
            className="w-full mx-auto rounded-lg overflow-hidden"
          />
          {!videoEnded && (
            <p className="mt-2 text-center text-gray-600">
              Aguarde até o final do vídeo para escolher sua opção.
            </p>
          )}
        </div>

        {/* Option Buttons */}
        {videoEnded && (
          <div className="flex flex-col gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleHelpChoice("Eu realmente quero ajuda")}
              className={`w-full py-3 px-4 rounded-full border-2 transition-all duration-200 focus:outline-none ${
                vocationalHelp?.value === "Eu realmente quero ajuda"
                  ? "bg-green-700 border-green-900 text-white shadow-xl scale-105"
                  : "bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-700" +
                    (!vocationalHelp ? " opacity-70 animate-pulse" : "")
              }`}
            >
              Eu realmente quero ajuda
            </button>
            <button
              type="button"
              onClick={() => handleHelpChoice("Não preciso de ajuda")}
              className={`w-full py-3 px-4 rounded-full border-2 transition-all duration-200 focus:outline-none ${
                vocationalHelp?.value === "Não preciso de ajuda"
                  ? "bg-gray-700 border-gray-900 text-white shadow-xl scale-105"
                  : "bg-gray-500 border-gray-500 text-white hover:bg-gray-600 hover:border-gray-700" +
                    (!vocationalHelp ? " opacity-70 animate-pulse" : "")
              }`}
            >
              Não preciso de ajuda
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Seu nome"
            required
          />
          <input
            type="tel"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(XX) XXXXX-XXXX"
            required
          />
          <button
            type="submit"
            disabled={!vocationalHelp}
            className={`w-full py-3 rounded-full font-extrabold shadow-lg transition transform focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              revealError
                ? "bg-red-500 border-2 border-red-700 text-white animate-pulse"
                : vocationalHelp
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Revelar Agora
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

LeadCaptureForm.propTypes = {
  showLeadCapture: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LeadCaptureForm;
