import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, TrendingUp, Trophy, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { teams } from '../data/teams';
import { players } from '../data/players';
import PlayerCard from '../components/PlayerCard';
import './TeamDetails.css';

const teamPerformance = [
  { month: 'Jan', wins: 3, losses: 1 },
  { month: 'Feb', wins: 2, losses: 2 },
  { month: 'Mar', wins: 4, losses: 0 },
  { month: 'Apr', wins: 3, losses: 1 },
  { month: 'May', wins: 1, losses: 3 },
  { month: 'Jun', wins: 3, losses: 1 },
];

export default function TeamDetails() {
  const { id } = useParams();
  const team = teams.find(t => t.id === parseInt(id)) || teams[0];
  const teamPlayers = players.filter(p => p.teamId === team.id);

  return (
    <div className="page-wrapper">
      <div className="container">
        <Link to="/teams" className="back-link">
          <ArrowLeft size={18} /> Back to Teams
        </Link>

        <motion.div
          className="team-detail-header glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ '--team-color': team.color }}
        >
          <div className="team-detail-header__glow" style={{ background: `linear-gradient(135deg, ${team.color}33, transparent)` }} />
          <div className="team-detail-header__content">
            <span className="team-detail-header__flag">{team.flag}</span>
            <h1 className="team-detail-header__name">{team.name}</h1>
            <p className="team-detail-header__country">{team.country}</p>
          </div>
        </motion.div>

        <div className="team-stats-grid">
          {[
            { label: 'Matches', value: team.matches, icon: Target, color: 'var(--blue-light)' },
            { label: 'Wins', value: team.wins, icon: Trophy, color: 'var(--green-light)' },
            { label: 'Losses', value: team.losses, icon: TrendingUp, color: 'var(--red-live)' },
            { label: 'Win %', value: `${team.winPercentage}%`, icon: Users, color: 'var(--gold-light)' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{ color: s.color }}><s.icon size={20} /></div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="team-detail-section glass-card">
          <h3>Recent Form</h3>
          <div className="team-form">
            {team.winRate.split(' ').map((r, i) => (
              <span key={i} className={`team-form__item team-form__item--${r.toLowerCase()}`}>{r}</span>
            ))}
          </div>
        </div>

        <div className="team-detail-section glass-card">
          <h3>Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={teamPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid var(--border-glass)', borderRadius: 8 }} />
              <Bar dataKey="wins" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="losses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {teamPlayers.length > 0 && (
          <>
            <h2 className="section-title" style={{ marginTop: 32 }}>Squad</h2>
            <p className="section-subtitle">Team players</p>
            <div className="team-players-grid">
              {teamPlayers.map((player, i) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <PlayerCard player={player} />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {team.recentMatches.length > 0 && (
          <div className="team-detail-section glass-card" style={{ marginBottom: 60 }}>
            <h3>Recent Matches</h3>
            {team.recentMatches.map((m, i) => (
              <div key={i} className="team-recent-match">
                <span className="team-recent-match__opponent">vs {m.opponent}</span>
                <span className={`team-recent-match__result ${m.result.startsWith('Won') ? 'team-recent-match__result--win' : 'team-recent-match__result--loss'}`}>
                  {m.result}
                </span>
                <span className="team-recent-match__date">{m.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
