import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
    data: any;
    options: any;
}

const ChartWrapper = styled.div`
    background-color: #2c2c2c;
    padding: 20px;
    border-radius: 10px;
    flex: 1;
    max-height: 400px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    h3 {
        margin-top: 0;
        margin-bottom: 15px;
    }
`;

const MusicPracticeChart: React.FC<ChartProps> = ({ data, options }) => {
    return (
        <ChartWrapper>
            <h3>Daily Music Practice Duration</h3>
            <Line data={data} options={options} />
        </ChartWrapper>
    );
};

export default MusicPracticeChart;
