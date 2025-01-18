import PropTypes from 'prop-types';

function AlertModal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-[80%] lg:w-1/3">
                <h3 className="text-xl font-semibold text-center text-gray-800">Atenção!</h3>
                <p className="text-center text-gray-600 mt-4">{message}</p>
                <div className="flex justify-center mt-6">
                    <button
                        onClick={onClose}
                        className="bg-jornadas-blue text-white px-6 py-2 rounded-lg shadow-lg hover:bg-jornadas-blue-dark transition duration-200"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </div>
    );
};

AlertModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};

export default AlertModal; 