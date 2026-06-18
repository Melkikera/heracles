import React from 'react';
import './dashboard.css';
import { ROUTES } from '../../constants';
import ProductStats from '../../components/Stats/ProductStats';
import BacklogStats from '../../components/Stats/BacklogStats';
import { RoadmapStats } from '../../components/Stats/RoadmapStats';
import { RecentFeedbacks } from '../../components/Feedback/RecentFeedbacks';
import { RoadmapPreview } from '../../components/Roadmap/RoadmapPreview';

const Dashboard: React.FC = () => {
    
    React.useEffect(() => {
        // fetch counts for admin tables (if still useful)
        fetch(ROUTES.SUMMARY)
            .then(r => r.json())
            .catch(() => { });
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Dashboard</h1>
            {/* KPI Cards */}
      <div className="stats-grid">
        <ProductStats />
        <BacklogStats />
        <RoadmapStats /> 
      </div>

      {/* Widgets */}
      <div className="widgets-grid">
        <RecentFeedbacks limit={5} />
        <RoadmapPreview quarters={['Q2 2026', 'Q3 2026']} />
      </div> 
        </div>
    );
};

export default Dashboard;