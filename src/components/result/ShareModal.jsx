// /componetes/result/ShareModal.jsx
import { FaWhatsapp } from "react-icons/fa";

const ShareModal = ({ sharePreviewImage, handleShare, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm sm:max-w-md md:max-w-xl">
        <h2 className="text-3xl font-bold mb-5 text-center text-green-600">
          Compartilhe Seu Resultado!
        </h2>
        {sharePreviewImage && (
          <img
            src={sharePreviewImage}
            alt="Preview do Resultado"
            className="w-full max-h-96 object-contain rounded-lg mb-5"
            loading="lazy"
          />
        )}
        <p className="mb-5 text-center text-gray-700 leading-relaxed">
          Mostre aos seus amigos o seu potencial e convide-os a descobrir o
          próprio caminho de sucesso!
        </p>
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-full font-bold text-xl hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaWhatsapp className="text-2xl" /> Compartilhe no WhatsApp!
        </button>
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 border rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
