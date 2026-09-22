import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Zap, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { statistics } from '../data/statistics';
import './Statistics.css';

const categories = [
  { key: 'topRunScorers', label: 'Top Run Scorers', icon: TrendingUp, color: 'var(--green-light)', valueKey: 'runs' },
  { key: 'topWicketTakers', label: 'Top Wicket Takers', icon: Target, color: 'var(--blue-light)', valueKey: 'wickets' },
  { key: 'bestStrikeRate', label: 'Best Strike Rate', icon: Zap, color: 'var(--blue-electric)', valueKey: 'strikeRate' },
  { key: 'bestBowling', label: 'Best Bowling', icon: Target, color: 'var(--gold-primary)', valueKey: 'wickets' },
  { key: 'bestEconomy', label: 'Best Economy', icon: TrendingUp, color: 'var(--green-primary)', valueKey: 'economy' },
  { key: 'highestScores', label: 'Highest Scores', icon: Trophy, color: 'var(--gold-light)', valueKey: 'score' },
  { key: 'mostSixes', label: 'Most Sixes', icon: Zap, color: 'var(--red-live)', valueKey: 'sixes' },
  { key: 'mostFours', label: 'Most Fours', icon: TrendingUp, color: 'var(--green-light)', valueKey: 'fours' },
];

export default function Statistics() {
  const [activeCategory, setActiveCategory] = useState('topRunScorers');
  const data = statistics[activeCategory] || [];
  const cat = categories.find(c => c.key === activeCategory);

  const chartData = data.slice(0, 8).map(d => ({
    name: d.name,
    value: d[cat.valueKey] || 0,
  }));

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title" style={{ paddingTop: 40 }}>Statistics</h1>
          <p className="section-subtitle">Cricket statistics and leaderboards.</p>
        </motion.div>

        <div className="stats-categories">
          {categories.map(c => (
            <button
              key={c.key}
              className={`stats-cat-btn ${activeCategory === c.key ? 'stats-cat-btn--active' : ''}`}
              onClick={() => setActiveCategory(c.key)}
            >
              <c.icon size={14} />
              {c.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          className="stats-leaderboard glass-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>
            <cat.icon size={18} style={{ color: cat.color }} />
            {cat.label}
          </h3>
          <div className="leaderboard-list">
            {data.map((item, i) => (
              <motion.div
                key={i}
                className="leaderboard-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className={`leaderboard-rank ${i < 3 ? 'leaderboard-rank--top' : ''}`}>
                  {i + 1}
                </span>
                <span className="leaderboard-flag">{item.flag}</span>
                <div className="leaderboard-info">
                  <span className="leaderboard-name">{item.name}</span>
                  <span className="leaderboard-team">{item.team}</span>
                </div>
                <span className="leaderboard-value" style={{ color: cat.color }}>
                  {item[cat.valueKey]?.toLocaleString?.() || item[cat.valueKey]}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="chart-card glass-card" style={{ marginTop: 24, marginBottom: 60 }}>
          <h3>{cat.label} — Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} angle={-30} textAnchor="end" height={60} />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip
                contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid var(--border-glass)', borderRadius: 8, color: 'var(--text-primary)' }}
              />
              <Bar dataKey="value" fill={cat.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
