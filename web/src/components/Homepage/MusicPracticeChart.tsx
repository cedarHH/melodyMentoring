import React, { useState, useEffect, CSSProperties } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface ChartProps {
    data: any;
    options: any;
    chartType: 'line' | 'bar';
}

const MusicPracticeChart: React.FC<ChartProps> = ({ data, options, chartType }) => {
    const [chartHeight, setChartHeight] = useState('100%');

    useEffect(() => {
        const updateSize = () => {
            const newHeight = window.innerHeight * 0.32 + 'px';
            setChartHeight(newHeight);
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const chartWrapperStyles: CSSProperties = {
        backgroundColor: '#2c2c2c',
        padding: '20px',
        borderRadius: '10px',
        flex: 1,
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        opacity: 0.8,
        transition: 'opacity 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const titleStyles: CSSProperties = {
        alignSelf: 'center',
        color: '#fff',
        fontFamily: 'Cambria',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '-1px',
    };

    const chartContainerStyles: CSSProperties = {
        width: '100%',
        height: chartHeight,
    };

    return (
        <div style={chartWrapperStyles}>
            <div style={titleStyles}>Music Practice Duration</div>
            <div style={chartContainerStyles}>
                {chartType === 'line' ? (
                    <Line data={data} options={options} />
                ) : (
                    <Bar data={data} options={options} />
                )}
            </div>
        </div>
    );
};

export default MusicPracticeChart;
