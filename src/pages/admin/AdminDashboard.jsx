import { motion } from 'framer-motion';
import { Users, User, Shield, Radio, Trophy, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Admin.css';

const adminStats = [
  { label: 'Total Users', value: 250, icon: Users, color: 'var(--blue-light)' },
  { label: 'Total Players', value: 120, icon: User, color: 'var(--green-light)' },
  { label: 'Total Teams', value: 12, icon: Shield, color: 'var(--gold-light)' },
  { label: 'Total Matches', value: 85, icon: Trophy, color: 'var(--blue-electric)' },
  { label: 'Live Matches', value: 4, icon: Radio, color: 'var(--red-live)' },
  { label: 'Tournaments', value: 8, icon: TrendingUp, color: 'var(--green-primary)' },
];

const monthlyData = [
  { month: 'Jan', users: 80, matches: 12 },
  { month: 'Feb', users: 95, matches: 15 },
  { month: 'Mar', users: 120, matches: 18 },
  { month: 'Apr', users: 150, matches: 22 },
  { month: 'May', users: 180, matches: 14 },
  { month: 'Jun', users: 210, matches: 20 },
  { month: 'Jul', users: 230, matches: 16 },
  { month: 'Aug', users: 245, matches: 24 },
  { month: 'Sep', users: 250, matches: 18 },
];

export default function AdminDashboard() {
  return (
    <div className="admin-content">
      <h2 className="admin-title">Dashboard</h2>
      <div className="admin-stats-grid">
        {adminStats.map((s, i) => (
          <motion.div
            key={i}
            className="admin-stat-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="admin-stat-card__icon" style={{ background: `color-mix(in srgb, ${s.color} 15%, transparent)`, color: s.color }}>
              <s.icon size={20} />
            </div>
            <div className="admin-stat-card__value" style={{ color: s.color }}>{s.value}</div>
            <div className="admin-stat-card__label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="admin-charts">
        <div className="chart-card glass-card">
          <h3>User & Match Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid var(--border-glass)', borderRadius: 8, color: 'var(--text-primary)' }} />
              <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Users" />
              <Bar dataKey="matches" fill="#10b981" radius={[4, 4, 0, 0]} name="Matches" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
