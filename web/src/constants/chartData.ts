export const practiceData = {
    labels: ['01/31', '02/01', '02/02', '02/03', '02/04', '02/05', '02/06'],
    datasets: [
        {
            label: 'Daniel (min)',
            data: [30, 45, 20, 52, 40, 55, 36],
            tension: 0.1,
        },
    ],
};

export const accuracyData = {
    labels: ['01/31', '02/01', '02/02', '02/03', '02/04', '02/05', '02/06'],
    datasets: [
        {
            label: 'Daniel (%)',
            data: [32, 35, 38, 42, 45, 47, 49],
        },
    ],
};

export const practiceData1 = {
    labels: ['01/31', '02/01', '02/02', '02/03', '02/04', '02/05', '02/06'],
    datasets: [
        {
            label: 'Amy (min)',
            data: [57, 45, 59, 41, 52, 37, 55],
            tension: 0.1,
        },
    ],
};

export const accuracyData1 = {
    labels: ['01/31', '02/01', '02/02', '02/03', '02/04', '02/05', '02/06'],
    datasets: [
        {
            label: 'Amy (%)',
            data: [57, 59, 60, 61, 62, 62, 63],
        },
    ],
};

export const practiceData2 = {
    labels: ['01/31', '02/01', '02/02', '02/03', '02/04', '02/05', '02/06'],
    datasets: [
        {
            label: 'Amy (min)',
            data: [69, 62, 71, 55, 56, 49, 68],
            tension: 0.1,
        },
    ],
};

export const accuracyData2 = {
    labels: ['01/31', '02/01', '02/02', '02/03', '02/04', '02/05', '02/06'],
    datasets: [
        {
            label: 'Amy (%)',
            data: [81, 81, 82, 82, 82, 83, 83],
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
