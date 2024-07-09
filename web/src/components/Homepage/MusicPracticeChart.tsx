import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
    data: any;
    options: any;
}

const MusicPracticeChart: React.FC<ChartProps> = ({ data, options }) => {
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
            <h3>Daily Music Practice Duration</h3>
            <Line data={data} options={options} />
        </div>
    );
};

export default MusicPracticeChart;
