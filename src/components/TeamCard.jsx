import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './TeamCard.css';

export default function TeamCard({ team }) {
  return (
    <Link to={`/team/${team.id}`} className="team-card glass-card">
      <div className="team-card__glow" style={{ background: `linear-gradient(135deg, ${team.color}33, transparent)` }} />
      <div className="team-card__flag">{team.flag}</div>
      <h3 className="team-card__name">{team.name}</h3>
      <p className="team-card__country">{team.country}</p>
      <div className="team-card__stats">
        <div className="team-card__stat">
          <span className="team-card__stat-value">{team.matches}</span>
          <span className="team-card__stat-label">M</span>
        </div>
        <div className="team-card__stat">
          <span className="team-card__stat-value team-card__stat-value--win">{team.wins}</span>
          <span className="team-card__stat-label">W</span>
        </div>
        <div className="team-card__stat">
          <span className="team-card__stat-value team-card__stat-value--loss">{team.losses}</span>
          <span className="team-card__stat-label">L</span>
        </div>
        <div className="team-card__stat">
          <span className="team-card__stat-value">{team.points}</span>
          <span className="team-card__stat-label">PTS</span>
        </div>
      </div>
      <div className="team-card__form">
        {team.winRate.split(' ').map((r, i) => (
          <span key={i} className={`team-card__form-item team-card__form-item--${r.toLowerCase()}`}>{r}</span>
        ))}
      </div>
      <ChevronRight size={16} className="team-card__arrow" />
    </Link>
  );
}
