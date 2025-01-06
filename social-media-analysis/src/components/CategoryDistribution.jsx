import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CategoryDistribution({ data }) {
  const categoryMetrics = data.reduce((acc, post) => {
    const category = post.metadata.category;
    if (!acc[category]) {
      acc[category] = { likes: 0, reach: 0, count: 0 };
    }
    acc[category].likes += post.likes;
    acc[category].reach += post.metadata.reach;
    acc[category].count += 1;
    return acc;
  }, {});

  // Calculate averages
  Object.keys(categoryMetrics).forEach(category => {
    const count = categoryMetrics[category].count;
    categoryMetrics[category].avgLikes = Math.round(categoryMetrics[category].likes / count);
    categoryMetrics[category].avgReach = Math.round(categoryMetrics[category].reach / count);
  });

  const chartData = {
    labels: Object.keys(categoryMetrics),
    datasets: [
      {
        label: 'Average Likes',
        data: Object.values(categoryMetrics).map(m => m.avgLikes),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Average Reach',
        data: Object.values(categoryMetrics).map(m => m.avgReach),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
} 