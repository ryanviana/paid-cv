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
    maintainAspectRatio: true,
    scales: {
        r: {
            ticks: {
                display: true,
                font: {
                    size: (context) => {
                        const width = context.chart.width;
                        if (width < 400) return 8; // Fontes menores para telas pequenas
                        if (width < 600) return 10;
                        return 12;
                    },
                },
            },
            angleLines: {
                display: true,
            },
            pointLabels: {
                font: {
                    size: (context) => {
                        const width = context.chart.width;
                        if (width < 400) return 8; // Ajuste de rótulos em telas pequenas
                        if (width < 600) return 10;
                        return 12;
                    },
                    weight: 'bold',
                    family: 'Arial',
                },
            },
        },
    },
    plugins: {
        legend: {
            display: true,
            labels: {
                font: {
                    size: (context) => {
                        const width = context.chart.width;
                        if (width < 400) return 8; // Fonte da legenda em telas pequenas
                        if (width < 600) return 10;
                        return 12;
                    },
                },
            },
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
        <div className='flex w-full h-full justify-center'>
            <Radar data={data} options={options} />
        </div> 
    );
}

Grafico.propTypes = {
    pontuacaoTotal: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
};

export default Grafico;