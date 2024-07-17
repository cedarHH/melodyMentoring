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
    top: 20px;
    right: 20px;
    background-color: #292A2C;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    font-weight: bold;
    font-style: italic;
    font-size: 18px;
    font-family: 'Cambria', serif;
    &:hover {
        background-color: #777;
    }
`;

const RemoveButton = styled.button`
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 2px 6px;
    margin-left: 5px;
    font-size: 12px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
`;

const MusicPracticeChart: React.FC<ChartProps> = ({ data, options, chartType, openModal, markedPoints, setMarkedPoints, isModalOpen }) => {
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
        backgroundColor: '#1B1C1E',
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
        border: '2px solid #4B4B4B'
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

    const removeMarkedPoint = (index: number) => {
        setMarkedPoints((prev) => prev.filter((pointIndex) => pointIndex !== index));
    };

    const newData = {
        ...data,
        datasets: [
            {
                ...data.datasets[0],
                borderColor: 'rgba(255, 120, 120, 0.6)',
                backgroundColor: 'rgba(255, 120, 120, 0.6)',
                hoverBackgroundColor: 'rgba(255, 120, 120)'
            },
            {
                label: 'Average',
                data: Array(data.datasets[0].data.length).fill(calculateAverage(data.datasets[0].data)),
                borderColor: 'rgba(255, 148, 86, 0.2)',
                backgroundColor: 'rgba(255, 148, 86, 0.2)',
                hoverBackgroundColor: 'rgba(255, 148, 86)',
                borderDash: [10, 5],
                pointRadius: 0,
            },
            {
                label: 'Marked Points',
                data: data.datasets[0].data.map((value: number, index: number) => markedPoints.includes(index) ? value : null),
                borderColor: 'rgba(255, 206, 86, 0.2)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                hoverBackgroundColor: 'rgba(255, 206, 86)',
                pointRadius: 8,
                pointBackgroundColor: 'rgba(255, 206, 86, 1)',
                pointBorderColor: 'rgba(255, 206, 86, 1)',
                showLine: false,
            }
        ]
    };

    return (
        <div style={chartWrapperStyles}>
            <div style={titleStyles}>Music Practice Duration</div>
            {!isModalOpen && <ChartButton onClick={openModal}>Toggle Chart</ChartButton>}
            <div style={chartContainerStyles}>
                {chartType === 'line' ? (
                    <Line
                        data={newData}
                        options={{
                            ...options,
                            onClick: (event, elems) => handlePointClick(elems),
                        }}
                    />
                ) : (
                    <Bar
                        data={newData}
                        options={{
                            ...options,
                            onClick: (event, elems) => handlePointClick(elems),
                        }}
                    />
                )}
            </div>
            {!isModalOpen && markedPoints.map(index => {
                const currentValue = newData.datasets[0].data[index];
                const previousValue = index > 0 ? newData.datasets[0].data[index - 1] : null;
                const averageValue = calculateAverage(newData.datasets[0].data);
                const differenceFromPrevious = previousValue !== null ? (currentValue - previousValue).toFixed(2) : 'N/A';
                const differenceFromAverage = (currentValue - averageValue).toFixed(2);
                const top = (100 - currentValue) + '%'; // Adjust according to your data range
                return (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top,
                            left: `calc(${index * 100 / data.datasets[0].data.length}% - 10px)`,
                            backgroundColor: 'rgba(255, 206, 86, 0.8)',
                            padding: '5px',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <div>Diff from prev: {differenceFromPrevious}</div>
                            <div>Diff from avg: {differenceFromAverage}</div>
                        </div>
                        <RemoveButton onClick={() => removeMarkedPoint(index)}>x</RemoveButton>
                    </div>
                );
            })}
        </div>
    );
};

export default MusicPracticeChart;
