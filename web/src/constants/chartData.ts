export const practiceData = {
    labels: ['02/01', '02/02', '02/03', '02/04', '02/05', '02/06'],
    datasets: [
        {
            label: 'Practice Duration (min)',
            data: [30, 45, 20, 60, 40, 55],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1,
        },
    ],
};

export const accuracyData = {
    labels: ['02/01', '02/02', '02/03', '02/04', '02/05', '02/06'],
    datasets: [
        {
            label: 'Accuracy Rate (%)',
            data: [32, 35, 36, 43, 45, 47],
            backgroundColor: 'rgb(75, 192, 192)',
        },
    ],
};

export const options = {
    scales: {
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            }
        },
        y: {
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            }
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context: any) {
                    const label = context.dataset.label;
                    const value = context.parsed.y;
                    const differences = calculateDifferences(context.dataset.data);
                    const difference = differences[context.dataIndex];
                    const sign = difference > 0 ? '+' : '';
                    return `${label}: ${value} (${sign}${difference} from previous)`;
                }
            }
        },
        legend: {
            labels: {
                color: 'white'
            }
        }
    }
};

function calculateDifferences(data: number[]) {
    return data.map((value, index, array) => index === 0 ? 0 : value - array[index - 1]);
}
