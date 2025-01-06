import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PostTypeChart({ data }) {
  const postTypeCounts = data.reduce((acc, post) => {
    acc[post.post_type] = (acc[post.post_type] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(postTypeCounts),
    datasets: [
      {
        data: Object.values(postTypeCounts),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(59, 130, 246)',
          'rgb(147, 51, 234)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: '#1e293b',
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
} 