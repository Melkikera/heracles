import React, { useState } from 'react';
import './dashboard.css';
import { ROUTES } from '../../constants';
import {ProductStats} from '../../components/Stats/ProductStats';
import {BacklogStats} from '../../components/Stats/BacklogStats';
import { RoadmapStats } from '../../components/Stats/RoadmapStats';
import { RecentFeedbacks } from '../../components/Feedback/RecentFeedbacks';
import { RoadmapPreview } from '../../components/Roadmap/RoadmapPreview';
import { useProducts } from '../../services/useProducts';
import { useBacklog } from '../../services/useBacklog';
import { useRoadmap } from '../../services/useRoadmap';
import type { ProductFilters } from '../../types/product';

const Dashboard: React.FC = () => {
    
    React.useEffect(() => {
        // fetch counts for admin tables (if still useful)
        fetch(ROUTES.SUMMARY)
            .then(r => r.json())
            .catch(() => { });
    }, []);
    const [filters] = useState<ProductFilters>({
        search: '',
        category: '',
        isActive: '',
        page: 1,
        pageSize: 10,
      });
    const productsQuery = useProducts(filters);
  const backlogQuery = useBacklog();
  const roadmapQuery = useRoadmap();

  const products = productsQuery.data?.items ?? [];
  const backlogItems = backlogQuery.data ?? [];
  const roadmapItems = roadmapQuery.data ?? [];

    return (
        <div className="admin-dashboard">
            <h1>Dashboard</h1>
            {/* KPI Cards */}
      <div className="stats-grid">
        <ProductStats products={products} totalCount={products.length} />
        <BacklogStats items={backlogItems} />
        <RoadmapStats items={roadmapItems} /> 
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