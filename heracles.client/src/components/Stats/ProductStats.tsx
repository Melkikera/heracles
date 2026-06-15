import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

type KeywordItem = { keyword: string; count: number };
type PriceStats = {
    threshold: number;
    total: number;
    belowCount: number;
    aboveOrEqualCount: number;
    belowAverage: number;
    aboveAverage: number;
};

export default function ProductStats() {
    const [keywords, setKeywords] = useState<KeywordItem[]>([]);
    const [priceStats, setPriceStats] = useState<PriceStats | null>(null);
    const threshold = 500;

    useEffect(() => {
        fetch('/api/products/stats/keywords')
            .then(r => r.json())
            .then((data: { keyword: string; count: number }[]) => {
                setKeywords(data.map(d => ({ keyword: d.keyword, count: d.count })));
            });

        fetch(`/api/products/stats/prices?threshold=${threshold}`)
            .then(r => r.json())
            .then((d: PriceStats) => setPriceStats(d));
    }, []);

    const pieData = priceStats ? [
        { name: ` < ${threshold}€`, value: priceStats.belowCount },
        { name: `≥ ${threshold}€`, value: priceStats.aboveOrEqualCount }
    ] : [];

    const COLORS = ['#8884d8', '#82ca9d'];

    return (
        <div style= {{ padding: 16 }
}>
    <h3>Fréquence mots - clés(Top) </h3>
        < div style = {{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
            <BarChart data={ keywords }>
                <XAxis dataKey="keyword" />
                    <YAxis />
                    < Tooltip />
                    <Bar dataKey="count" fill = "#667eea" />
                        </BarChart>
                        </ResponsiveContainer>
                        </div>

                        < h3 > Répartition des prix </h3>
                            < div style = {{ width: '100%', height: 250 }}>
                                <ResponsiveContainer>
                                <PieChart>
                                <Pie data={ pieData } dataKey = "value" nameKey = "name" outerRadius = { 80} label >
                                    { pieData.map((entry, index) => <Cell key={ index } fill = { COLORS[index % COLORS.length]} />) }
                                    </Pie>
                                    < Legend />
                                    <Tooltip />
                                    </PieChart>
                                    </ResponsiveContainer>
                                    </div>
                                    </div>
  );
}