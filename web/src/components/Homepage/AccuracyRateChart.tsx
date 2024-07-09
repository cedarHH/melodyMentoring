import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
    data: any;
    options: any;
}

const AccuracyRateChart: React.FC<ChartProps> = ({ data, options }) => {
    const [chartHeight, setChartHeight] = useState('400px');

    useEffect(() => {
        const updateSize = () => {
            const newHeight = window.innerHeight * 0.4 + 'px'; // 占窗口高度的40%
            setChartHeight(newHeight);
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const chartWrapperStyles = {
        backgroundColor: '#2c2c2c',
        padding: '20px',
        borderRadius: '10px',
        flex: 1,
        maxHeight: chartHeight, // 使用状态来动态调整高度
        cursor: 'pointer',
        opacity: 0.8,
        transition: 'opacity 0.3s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={chartWrapperStyles}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default AccuracyRateChart;
