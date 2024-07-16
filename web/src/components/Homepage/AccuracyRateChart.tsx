import React, { useState, useEffect, CSSProperties } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface ChartProps {
    data: any;
    options: any;
    chartType: 'line' | 'bar';
    openModal: () => void;
    markedPoints: number[];
    setMarkedPoints: React.Dispatch<React.SetStateAction<number[]>>;
    isModalOpen: boolean;
}

const calculateAverage = (data: number[]) => {
    const total = data.reduce((sum, value) => sum + value, 0);
    return total / data.length;
};

const ChartButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #555;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    &:hover {
        background-color: #777;
    }
`;

const AccuracyRateChart: React.FC<ChartProps> = ({ data, options, chartType, openModal, markedPoints, setMarkedPoints, isModalOpen }) => {
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
        position: 'relative',
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

    const handlePointClick = (elems: any) => {
        if (elems.length > 0) {
            const datasetIndex = elems[0].datasetIndex;
            const index = elems[0].index;

            if (datasetIndex === 0) { // Only allow marking actual data points
                setMarkedPoints((prev) => {
                    const newMarkedPoints = [...prev];
                    const pointIndex = newMarkedPoints.indexOf(index);
                    if (pointIndex === -1) {
                        newMarkedPoints.push(index);
                    } else {
                        newMarkedPoints.splice(pointIndex, 1);
                    }
                    return newMarkedPoints;
                });
            }
        }
    };

    const newData = {
        ...data,
        datasets: [
            {
                ...data.datasets[0],
                borderColor: 'rgba(158, 134, 253, 0.6)',
                backgroundColor: 'rgba(158, 134, 253, 0.6)',
            },
            {
                label: 'Average',
                data: Array(data.datasets[0].data.length).fill(calculateAverage(data.datasets[0].data)),
                borderColor: 'rgba(87, 250, 255, 0.2)',
                backgroundColor: 'rgba(87, 250, 255, 0.2)',
                borderDash: [10, 5],
                pointRadius: 0,
            },
            {
                label: 'Marked Points',
                data: data.datasets[0].data.map((value: number, index: number) => markedPoints.includes(index) ? value : null),
                borderColor: 'rgba(92, 210, 78, 1)',
                backgroundColor: 'rgba(92, 210, 78, 1)',
                pointRadius: 8,
                pointBackgroundColor: 'rgba(92, 210, 78, 1)',
                pointBorderColor: 'rgba(92, 210, 78, 1)',
                showLine: false,
            }
        ]
    };

    return (
        <div style={chartWrapperStyles}>
            <div style={titleStyles}>Practice Accuracy Rate</div>
            {!isModalOpen && <ChartButton onClick={openModal}>Open Modal</ChartButton>}
            <div style={chartContainerStyles}>
                {chartType === 'line' ? (
                    <Line
                        data={newData}
                        options={{
                            ...options,
                            onClick: (event, elems) => handlePointClick(elems)
                        }}
                    />
                ) : (
                    <Bar
                        data={newData}
                        options={{
                            ...options,
                            onClick: (event, elems) => handlePointClick(elems)
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default AccuracyRateChart;
