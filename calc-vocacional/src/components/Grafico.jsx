import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Registrar as escalas e elementos necessários
ChartJS.register(
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    scales: {
        r: {
            ticks: {
                display: true,
            },
            angleLines: {
                display: true,
            },
            pointLabels: {
                font: {
                    size: 15,
                    weight: 'bold',
                    family: 'Arial',
                },
            },
        },
    },
    plugins: {
        legend: {
            display: false
        },
    },
    animation: {
        duration: 500,
        easing: 'easeOutCubic',
    },
};

function Grafico({ pontuacaoTotal, type }) {

    let labels = ["Computacao", "Eletrica", "Mecatronica", "Aeronautica", "Licenciatura", "Producao", "Materiais", "Civil", "Ambiental"]
    if (type === 'parcial') labels = ["???", "???", "???", "???", "???", "???", "???", "???", "???"]

    const data = {
        labels: labels,
        datasets: [{
            label: "Score",
            data: pontuacaoTotal,
            backgroundColor: 'rgba(6, 253, 253, 0.5)',
            borderColor: '#04caca',
            borderWidth: 3
        }]
    };

    return (
        <div className="w-[90%] h-[90%] flex items-center justify-center">
            <Radar data={data} options={options} className='w-full h-full'/>
        </div>
    );
}

export default Grafico;