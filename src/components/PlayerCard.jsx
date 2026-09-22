import { Link } from 'react-router-dom';
import { TrendingUp, Award, ChevronRight } from 'lucide-react';
import './PlayerCard.css';

export default function PlayerCard({ player }) {
  const initials = player.name.split(' ').map(n => n[0]).join('');
  const roleColor = player.role === 'Batsman' ? 'var(--green-primary)' :
    player.role === 'Bowler' ? 'var(--blue-primary)' : 'var(--gold-primary)';

  return (
    <Link to={`/player/${player.id}`} className="player-card glass-card">
      <div className="player-card__avatar" style={{ '--role-color': roleColor }}>
        <span>{initials}</span>
      </div>
      <div className="player-card__info">
        <h3 className="player-card__name">{player.name}</h3>
        <p className="player-card__role">{player.role} • {player.team}</p>
      </div>
      <div className="player-card__stats">
        <div className="player-card__stat">
          <span className="player-card__stat-value">{player.matches}</span>
          <span className="player-card__stat-label">Matches</span>
        </div>
        <div className="player-card__stat">
          <span className="player-card__stat-value">{player.runs}</span>
          <span className="player-card__stat-label">Runs</span>
        </div>
        {player.wickets > 0 && (
          <div className="player-card__stat">
            <span className="player-card__stat-value">{player.wickets}</span>
            <span className="player-card__stat-label">Wkts</span>
          </div>
        )}
      </div>
      <div className="player-card__footer">
        <div className="player-card__badge" style={{ color: roleColor }}>{player.role}</div>
        <ChevronRight size={16} />
      </div>
    </Link>
  );
}
