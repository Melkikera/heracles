import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { RoadmapTimelineItem } from '../../types/roadmap';

type RoadmapTimelineProps = {
  items?: RoadmapTimelineItem[];
};

export function RoadmapTimeline({ items }: RoadmapTimelineProps) {
  const quarters = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'];

  const data = quarters.map((quarter) => {
    const quarterItems = items?.filter((item) => item.quarter === quarter) || [];
    return {
      quarter,
      items: quarterItems.length,
      features: quarterItems.filter((i) => i.backlogItemType === 'feature').length,
      bugs: quarterItems.filter((i) => i.backlogItemType === 'bug').length,
      initiatives: quarterItems.filter((i) => i.backlogItemType === 'initiative').length,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quarter" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="features" name="Features" fill="#4f46e5" stackId="a" />
        <Bar dataKey="bugs" name="Bugs" fill="#ef4444" stackId="a" />
        <Bar dataKey="initiatives" name="Initiatives" fill="#10b981" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
}