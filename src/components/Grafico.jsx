import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

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
    maintainAspectRatio: false,
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
                    size: (context) => {
                        const width = context.chart.width;
                        if (width < 400) return 7; // Tamanho pequeno para telas menores
                        if (width < 600) return 9; // Tamanho médio
                        return 12; // Tamanho padrão
                    },
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
        <div className='flex w-full min-h-[500px] h-full'>
            <Radar data={data} options={options} />
        </div> 
    );
}

Grafico.propTypes = {
    pontuacaoTotal: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
};

export default Grafico;