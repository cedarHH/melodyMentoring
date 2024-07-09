import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
    data: any;
    options: any;
}

const AccuracyRateChart: React.FC<ChartProps> = ({ data, options }) => {
    const chartWrapperStyles = {
        backgroundColor: '#2c2c2c',
        padding: '20px',
        borderRadius: '10px',
        flex: 1,
        maxHeight: '400px',
        cursor: 'pointer',
        opacity: 0.8,
        transition: 'opacity 0.3s',
    };

    return (
        <div style={chartWrapperStyles}>
            <h3>Daily Practice Accuracy Rate</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default AccuracyRateChart;
