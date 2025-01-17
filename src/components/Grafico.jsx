import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

import * as Defines from '../data/Defines';

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

    let labels = Defines.listaAreas
    if (type === 'parcial') labels = Array(Defines.numAreas).fill("?")

    const data = {
        labels: labels,
        datasets: [{
            label: "Score",
            data: pontuacaoTotal,
            backgroundColor: 'rgba(36, 228, 204, 0.5)',
            borderColor: '#04caca',
            borderWidth: 3
        }]
    };

    return (
        <Radar data={data} options={options}/>
    );
}

export default Grafico;