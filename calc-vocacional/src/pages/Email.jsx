import { useState } from 'react'
import axios from 'axios'

function Email({ pontuacaoTotal }) {

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const enviarEmail = async () => {
        try {
            setStatus('loading')
            const _ = await axios.post("http://3.12.246.4:4000/send-email", {
                score: pontuacaoTotal,
                user_email: email
            });
            setStatus('send')
            
        } catch (error) {
            setStatus('error')
            console.error("Erro ao enviar email:", error);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-full gap-5'>
            <h1 className='font-bold text-2xl'>Digite seu email</h1>
            <input type="text" className='bg-gray-200 border-gray-400 border rounded-xl p-2' onChange={(e) => setEmail(e.target.value)}/>
            <button className='bg-gray-300 p-2 rounded-xl w-48 transition-all hover:scale-105 hover:bg-gray-400' onClick={enviarEmail}>Enviar email</button>
 
            {status === 'loading' && <div>Enviando email...</div>}
            {status === 'send' && <div>Email enviado.</div>}
            {status === 'error' && <div>Erro ao enviar o email!</div>}

        </div>
    )
}

export default Email;
