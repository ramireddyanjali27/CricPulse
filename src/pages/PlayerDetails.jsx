import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Award, Target, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { players } from '../data/players';
import './PlayerDetails.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function PlayerDetails() {
  const { id } = useParams();
  const player = players.find(p => p.id === parseInt(id)) || players[0];
  const initials = player.name.split(' ').map(n => n[0]).join('');

  const monthlyData = player.monthlyRuns.map((runs, i) => ({
    month: months[i],
    runs,
    strikeRate: player.monthlyStrikeRate[i],
  }));

  const statCards = [
    { label: 'Matches', value: player.matches, icon: Target, color: 'var(--blue-light)' },
    { label: 'Runs', value: player.runs, icon: TrendingUp, color: 'var(--green-light)' },
    { label: 'Average', value: player.average, icon: Award, color: 'var(--gold-light)' },
    { label: 'Strike Rate', value: player.strikeRate, icon: Zap, color: 'var(--blue-electric)' },
    { label: '100s', value: player.hundreds, icon: Award, color: 'var(--gold-primary)' },
    { label: '50s', value: player.fifties, icon: Award, color: 'var(--green-primary)' },
    { label: 'Best Score', value: player.bestScore, icon: TrendingUp, color: 'var(--red-live)' },
    { label: 'Wickets', value: player.wickets, icon: Target, color: 'var(--blue-primary)' },
  ];

  return (
    <div className="page-wrapper">
      <div className="container">
        <Link to="/players" className="back-link">
          <ArrowLeft size={18} /> Back to Players
        </Link>

        <motion.div
          className="player-profile glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="player-profile__header">
            <div className="player-profile__avatar">
              <span>{initials}</span>
            </div>
            <div className="player-profile__info">
              <h1 className="player-profile__name">{player.name}</h1>
              <p className="player-profile__role">{player.role} • {player.team}</p>
              <div className="player-profile__meta">
                <span>{player.battingStyle}</span>
                {player.bowlingStyle !== 'N/A' && <span>{player.bowlingStyle}</span>}
                <span>Age: {player.age}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="player-stats-grid">
          {statCards.map((s, i) => (
            <motion.div
              key={i}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="player-stat-icon" style={{ color: s.color }}>
                <s.icon size={20} />
              </div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="player-form glass-card" style={{ marginBottom: 24 }}>
          <h3>Recent Form</h3>
          <div className="player-form__scores">
            {player.recentForm.map((score, i) => (
              <span key={i} className={`player-form__score ${score >= 50 ? 'player-form__score--high' : score < 20 ? 'player-form__score--low' : ''}`}>
                {score}
              </span>
            ))}
          </div>
        </div>

        <div className="player-charts">
          <div className="chart-card glass-card">
            <h3>Monthly Runs</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid var(--border-glass)', borderRadius: 8, color: 'var(--text-primary)' }}
                />
                <Bar dataKey="runs" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card glass-card">
            <h3>Strike Rate Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid var(--border-glass)', borderRadius: 8, color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="strikeRate" stroke="#818cf8" strokeWidth={2} dot={{ fill: '#818cf8', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
