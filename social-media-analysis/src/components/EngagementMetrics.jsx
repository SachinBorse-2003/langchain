import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EngagementMetrics({ data }) {
  const averageEngagement = data.reduce(
    (acc, post) => {
      acc.likes += post.likes;
      acc.shares += post.shares;
      acc.comments += post.comments;
      return acc;
    },
    { likes: 0, shares: 0, comments: 0 }
  );

  const totalPosts = data.length;
  Object.keys(averageEngagement).forEach(key => {
    averageEngagement[key] = Math.round(averageEngagement[key] / totalPosts);
  });

  const chartData = {
    labels: ['Average Engagement per Post'],
    datasets: [
      {
        label: 'Likes',
        data: [averageEngagement.likes],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Shares',
        data: [averageEngagement.shares],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Comments',
        data: [averageEngagement.comments],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        ticks: {
          maxTicksLimit: 3,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
} 