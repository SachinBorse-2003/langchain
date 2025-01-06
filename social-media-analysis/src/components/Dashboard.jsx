import { useEffect } from 'react';
import PostTypeChart from './PostTypeChart';
import EngagementMetrics from './EngagementMetrics';
import CategoryDistribution from './CategoryDistribution';
import PerformanceComparison from './PerformanceComparison';
import './styles/Dashboard.css';

export default function Dashboard({ data }) {
  useEffect(() => {
    // Select all chart elements and apply padding-bottom
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chart => {
      chart.style.paddingBottom = '25px';
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="chart-row">
        <div className="chart">
        <h2 className='title'>Post Type Distribution</h2>
          <PostTypeChart data={data} />
        </div>
        <div className="chart">
        <h2 className='title'>Engagement Overview</h2>
          <EngagementMetrics data={data} />
        </div>
        <div className="chart">
        <h2 className='title'>Post Type Performance</h2>
          <PerformanceComparison data={data} />
        </div>
      </div>
      <div className="full-width-chart">
        <h2 className='title'>Category Performance</h2>
        <CategoryDistribution data={data} />
      </div>
    </div>
  );
}