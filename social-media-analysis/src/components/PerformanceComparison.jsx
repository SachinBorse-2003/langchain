import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PerformanceComparison({ data }) {
  const postTypeMetrics = data.reduce((acc, post) => {
    const type = post.post_type;
    if (!acc[type]) {
      acc[type] = { likes: 0, reach: 0, engagement: 0, count: 0 };
    }
    acc[type].likes += post.likes;
    acc[type].reach += post.metadata.reach;
    acc[type].engagement += (post.likes + post.shares + post.comments);
    acc[type].count += 1;
    return acc;
  }, {});

  // Calculate averages
  Object.keys(postTypeMetrics).forEach(type => {
    const count = postTypeMetrics[type].count;
    postTypeMetrics[type].avgLikes = Math.round(postTypeMetrics[type].likes / count);
    postTypeMetrics[type].avgReach = Math.round(postTypeMetrics[type].reach / count);
    postTypeMetrics[type].avgEngagement = Math.round(postTypeMetrics[type].engagement / count);
  });

  const chartData = {
    labels: Object.keys(postTypeMetrics),
    datasets: [
      {
        label: 'Average Likes',
        data: Object.values(postTypeMetrics).map(m => m.avgLikes),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
      {
        label: 'Average Reach',
        data: Object.values(postTypeMetrics).map(m => m.avgReach),
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
      },
      {
        label: 'Average Engagement',
        data: Object.values(postTypeMetrics).map(m => m.avgEngagement),
        backgroundColor: 'rgba(139, 92, 246, 0.6)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 2,
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
          maxTicksLimit: 5,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
} 