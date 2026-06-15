import React from 'react';
import './dashboard.css';
import { ROUTES } from '../../constants';
import ProductStats from '../../components/Stats/ProductStats';

const Dashboard: React.FC = () => {
    const [counts, setCounts] = React.useState<{ [key: string]: number }>({});

    React.useEffect(() => {
        // fetch counts for admin tables (if still useful)
        fetch(ROUTES.SUMMARY)
            .then(r => r.json())
            .then(setCounts)
            .catch(() => { });
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Dashboard</h1>
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

            <div style={{ marginTop: 20 }}>
                <ProductStats />
            </div>
        </div>
    );
};

export default Dashboard;