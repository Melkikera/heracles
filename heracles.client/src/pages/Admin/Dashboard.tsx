import React from 'react';
import './dashboard.css';
import { ROUTES } from '../../constants';

const Dashboard: React.FC = () => {
  const [counts, setCounts] = React.useState<{ [key: string]: number }>({});

  React.useEffect(() => {
      // fetch counts for admin tables
      fetch(ROUTES.SUMMARY)
      .then(r => r.json())
      .then(setCounts)
      .catch(() => {});
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="cards">
        <div className="card">
          <h3>Products</h3>
          <p>{counts.products ?? '–'}</p>
        </div>
        <div className="card">
          <h3>Contacts</h3>
          <p>{counts.contacts ?? '–'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
