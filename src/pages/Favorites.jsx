import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { teams } from '../data/teams';
import { players } from '../data/players';
import { matches } from '../data/matches';
import './Favorites.css';

function getFavorites(type) {
  try {
    return JSON.parse(localStorage.getItem(`cricpulse_fav_${type}`)) || [];
  } catch { return []; }
}

export default function Favorites() {
  const [favTeams, setFavTeams] = useState(() => getFavorites('teams'));
  const [favPlayers, setFavPlayers] = useState(() => getFavorites('players'));
  const [favMatches, setFavMatches] = useState(() => getFavorites('matches'));

  const favTeamData = teams.filter(t => favTeams.includes(t.id));
  const favPlayerData = players.filter(p => favPlayers.includes(p.id));
  const favMatchData = matches.filter(m => favMatches.includes(m.id));

  const removeFav = (type, id) => {
    if (type === 'teams') {
      setFavTeams(prev => { const next = prev.filter(x => x !== id); localStorage.setItem('cricpulse_fav_teams', JSON.stringify(next)); return next; });
    } else if (type === 'players') {
      setFavPlayers(prev => { const next = prev.filter(x => x !== id); localStorage.setItem('cricpulse_fav_players', JSON.stringify(next)); return next; });
    } else {
      setFavMatches(prev => { const next = prev.filter(x => x !== id); localStorage.setItem('cricpulse_fav_matches', JSON.stringify(next)); return next; });
    }
  };

  const isEmpty = favTeamData.length === 0 && favPlayerData.length === 0 && favMatchData.length === 0;

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title" style={{ paddingTop: 40 }}>Favorites</h1>
          <p className="section-subtitle">Your saved teams, players, and matches.</p>
        </motion.div>

        {isEmpty && (
          <div className="empty-state glass-card">
            <Heart size={48} />
            <h3>No favorites yet</h3>
            <p>Start exploring and add your favorites!</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link to="/teams" className="btn btn-primary">Browse Teams</Link>
              <Link to="/players" className="btn btn-secondary">Browse Players</Link>
            </div>
          </div>
        )}

        {favTeamData.length > 0 && (
          <div className="fav-section">
            <h3><Heart size={18} /> My Favorite Teams</h3>
            <div className="fav-grid">
              {favTeamData.map(team => (
                <div key={team.id} className="fav-item glass-card">
                  <Link to={`/team/${team.id}`} className="fav-item__link">
                    <span className="fav-item__flag">{team.flag}</span>
                    <strong>{team.name}</strong>
                  </Link>
                  <button className="fav-remove" onClick={() => removeFav('teams', team.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {favPlayerData.length > 0 && (
          <div className="fav-section">
            <h3><Heart size={18} /> My Favorite Players</h3>
            <div className="fav-grid">
              {favPlayerData.map(player => (
                <div key={player.id} className="fav-item glass-card">
                  <Link to={`/player/${player.id}`} className="fav-item__link">
                    <span className="fav-item__icon">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    <div>
                      <strong>{player.name}</strong>
                      <span>{player.role} • {player.team}</span>
                    </div>
                  </Link>
                  <button className="fav-remove" onClick={() => removeFav('players', player.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {favMatchData.length > 0 && (
          <div className="fav-section">
            <h3><Heart size={18} /> My Favorite Matches</h3>
            <div className="fav-grid">
              {favMatchData.map(match => (
                <div key={match.id} className="fav-item glass-card">
                  <Link to={`/match/${match.id}`} className="fav-item__link">
                    <span className="fav-item__match">
                      {match.team1.flag} {match.team1.shortName} vs {match.team2.shortName}
                    </span>
                    <div>
                      <strong>{match.tournament}</strong>
                      <span>{match.date}</span>
                    </div>
                  </Link>
                  <button className="fav-remove" onClick={() => removeFav('matches', match.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
