import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import { matches } from '../data/matches';
import './LiveMatches.css';

export default function LiveMatches() {
  const live = matches.filter(m => m.status === 'live');

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="live-header"
        >
          <div className="live-header__icon">
            <Radio size={24} />
            <span className="live-dot" />
          </div>
          <h1 className="section-title">Live Matches</h1>
          <p className="section-subtitle">Experience the action as it happens.</p>
        </motion.div>

        <div className="live-grid">
          {live.length === 0 ? (
            <div className="empty-state glass-card">
              <Radio size={48} />
              <h3>No Live Matches</h3>
              <p>Check back soon for live action!</p>
            </div>
          ) : (
            live.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <MatchCard match={match} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
