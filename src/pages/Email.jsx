import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';

function Email({ pontuacaoTotal }) {

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('ready');

    const enviarEmail = async () => {

        setStatus('loading')

        try {
            await axios.post("https://3.12.246.4:4000/save-results", {
                score: pontuacaoTotal,
                user_email: email
            });

        } catch (error) {
            setStatus('error1')
            console.error("Erro ao salvar os resultados:", error);
        }

        try {
            await axios.post("https://3.12.246.4:4000/send-email", {
                score: pontuacaoTotal,
                user_email: email
            });
            setStatus('send')

        } catch (error) {
            setStatus('error2')
            console.error("Erro ao enviar email:", error);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-full gap-2 mt-10'>
            <h1 className='font-semibold text-lg'>Digite seu email</h1>
            <div className='text-sm'>Necessário liberar o site do <a href="https://3.12.246.4:4000/" className='hover:underline text-blue-700'>backend</a> (certificado auto assinado)</div>
            <input type="text" className='bg-gray-200 border-gray-400 border rounded-xl py-1 px-2 m-3' onChange={(e) => setEmail(e.target.value)} />
            <button className='bg-jornadas-blue py-1 px-5 rounded-xl transition-all hover:scale-105 hover:bg-jornadas-blue-dark' onClick={enviarEmail}>Enviar email</button>

            {status === 'loading' && <div>Enviando email...</div>}
            {status === 'send' && <div>Email enviado e resultados salvos.</div>}
            {status === 'error1' && <div>Erro ao salvar os resultados!</div>}
            {status === 'error2' && <div>Erro ao enviar o email!</div>}

        </div>
    )
}

Email.propTypes = {
    pontuacaoTotal: PropTypes.array.isRequired,
};

export default Email;
