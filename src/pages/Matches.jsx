import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import { matches } from '../data/matches';
import { tournaments } from '../data/tournaments';
import './Matches.css';

const tabs = ['Live', 'Upcoming', 'Completed'];

export default function Matches() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [matchType, setMatchType] = useState('All');
  const [selectedTournament, setSelectedTournament] = useState('All');

  const filtered = matches.filter(m => {
    if (m.status !== activeTab.toLowerCase()) return false;
    if (matchType !== 'All' && m.type !== matchType) return false;
    if (selectedTournament !== 'All' && m.tournament !== selectedTournament) return false;
    return true;
  });

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title" style={{ paddingTop: 40 }}>Matches</h1>
          <p className="section-subtitle">Browse all cricket matches.</p>
        </motion.div>

        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab === 'Live' && <span className="tab__live" />}
            </button>
          ))}
        </div>

        <div className="matches-filters">
          <div className="matches-filters__icon"><Filter size={16} /></div>
          <select
            className="matches-filters__select"
            value={matchType}
            onChange={(e) => setMatchType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="T20">T20</option>
            <option value="ODI">ODI</option>
            <option value="Test">Test</option>
          </select>
          <select
            className="matches-filters__select"
            value={selectedTournament}
            onChange={(e) => setSelectedTournament(e.target.value)}
          >
            <option value="All">All Tournaments</option>
            {tournaments.map(t => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="matches-grid">
          {filtered.length === 0 ? (
            <div className="empty-state glass-card">
              <Filter size={48} />
              <h3>No matches found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            filtered.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
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
