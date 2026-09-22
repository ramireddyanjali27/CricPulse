import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import PlayerCard from '../components/PlayerCard';
import { players } from '../data/players';
import './Players.css';

const roles = ['All', 'Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'];
const countries = ['All', 'India', 'Australia', 'England', 'Pakistan', 'South Africa', 'New Zealand'];

export default function Players() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [country, setCountry] = useState('All');

  const filtered = useMemo(() => {
    return players.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (role !== 'All' && p.role !== role) return false;
      if (country !== 'All' && p.country !== country) return false;
      return true;
    });
  }, [search, role, country]);

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title" style={{ paddingTop: 40 }}>Players</h1>
          <p className="section-subtitle">Discover cricket's finest players.</p>
        </motion.div>

        <div className="players-filters">
          <div className="players-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search players..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="players-filter-group">
            <Filter size={16} />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="matches-filters__select">
              {roles.map(r => <option key={r} value={r}>{r === 'All' ? 'All Roles' : r}</option>)}
            </select>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="matches-filters__select">
              {countries.map(c => <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>)}
            </select>
          </div>
        </div>

        <div className="players-grid">
          {filtered.length === 0 ? (
            <div className="empty-state glass-card">
              <Search size={48} />
              <h3>No players found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            filtered.map((player, i) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <PlayerCard player={player} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
