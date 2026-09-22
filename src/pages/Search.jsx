import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Users, User, Trophy } from 'lucide-react';
import { teams } from '../data/teams';
import { players } from '../data/players';
import { matches } from '../data/matches';
import './Search.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('q') || '';
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => {
    if (!query.trim()) return { teams: [], players: [], matches: [] };
    const q = query.toLowerCase();
    return {
      teams: teams.filter(t => t.name.toLowerCase().includes(q) || t.country.toLowerCase().includes(q)),
      players: players.filter(p => p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q)),
      matches: matches.filter(m =>
        m.team1.name.toLowerCase().includes(q) ||
        m.team2.name.toLowerCase().includes(q) ||
        m.tournament.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  const total = results.teams.length + results.players.length + results.matches.length;

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title" style={{ paddingTop: 40 }}>Search</h1>
          <p className="section-subtitle">Find players, teams, and matches.</p>
        </motion.div>

        <div className="search-box glass-card">
          <SearchIcon size={20} />
          <input
            type="text"
            placeholder="Search players, teams, matches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {query.trim() && (
          <p className="search-count">{total} result{total !== 1 ? 's' : ''} found</p>
        )}

        {results.teams.length > 0 && (
          <div className="search-section">
            <h3><Users size={18} /> Teams</h3>
            <div className="search-results">
              {results.teams.map(team => (
                <Link key={team.id} to={`/team/${team.id}`} className="search-result glass-card">
                  <span className="search-result__flag">{team.flag}</span>
                  <div>
                    <strong>{team.name}</strong>
                    <span>{team.country}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.players.length > 0 && (
          <div className="search-section">
            <h3><User size={18} /> Players</h3>
            <div className="search-results">
              {results.players.map(player => (
                <Link key={player.id} to={`/player/${player.id}`} className="search-result glass-card">
                  <span className="search-result__icon">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  <div>
                    <strong>{player.name}</strong>
                    <span>{player.role} • {player.team}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.matches.length > 0 && (
          <div className="search-section">
            <h3><Trophy size={18} /> Matches</h3>
            <div className="search-results">
              {results.matches.map(match => (
                <Link key={match.id} to={`/match/${match.id}`} className="search-result glass-card">
                  <span className="search-result__match">
                    {match.team1.flag} {match.team1.shortName} vs {match.team2.shortName} {match.team2.flag}
                  </span>
                  <div>
                    <strong>{match.tournament}</strong>
                    <span>{match.date} • {match.type}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {query.trim() && total === 0 && (
          <div className="empty-state glass-card">
            <SearchIcon size={48} />
            <h3>No results found</h3>
            <p>Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
